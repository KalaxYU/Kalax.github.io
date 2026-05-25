param(
  [string]$SourcePath,
  [string]$RepoPath,
  [string]$DestinationPath,
  [string]$CommitMessage,
  [string]$Remote,
  [string]$Branch,
  [switch]$NoPush,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$ParamSourcePath = $SourcePath
$ParamRepoPath = $RepoPath
$ParamDestinationPath = $DestinationPath
$ParamCommitMessage = $CommitMessage
$ParamRemote = $Remote
$ParamBranch = $Branch
$ParamNoPush = $NoPush.IsPresent

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $ScriptDir "french-sync.config.ps1"
if (Test-Path -LiteralPath $ConfigPath) {
  . $ConfigPath
}

if ($ParamSourcePath) {
  $SourcePath = $ParamSourcePath
} elseif (-not $SourcePath -and $ObsidianFrenchPath) {
  $SourcePath = $ObsidianFrenchPath
}

if ($ParamRepoPath) {
  $RepoPath = $ParamRepoPath
} elseif (-not $RepoPath -and $QuartzRepoPath) {
  $RepoPath = $QuartzRepoPath
}

if (-not $RepoPath) {
  $RepoPath = (Resolve-Path (Join-Path $ScriptDir "..")).Path
}

if ($ParamDestinationPath) {
  $DestinationPath = $ParamDestinationPath
} elseif (-not $DestinationPath -and $QuartzFrenchPath) {
  $DestinationPath = $QuartzFrenchPath
}

if (-not $DestinationPath) {
  $DestinationPath = Join-Path $RepoPath "content\French"
}

if ($ParamCommitMessage) {
  $CommitMessage = $ParamCommitMessage
} elseif (-not $CommitMessage) {
  $CommitMessage = "Sync French notes from Obsidian"
}

if ($ParamRemote) {
  $Remote = $ParamRemote
} elseif (-not $Remote) {
  $Remote = "origin"
}

if ($ParamBranch) {
  $Branch = $ParamBranch
} elseif (-not $Branch) {
  $Branch = "v4"
}

$NoPushRequested = $ParamNoPush -or ($DisablePush -eq $true)
if (-not $PreserveFiles) {
  $PreserveFiles = @("index.md")
}

if (-not $SourcePath) {
  throw "Missing SourcePath. Copy scripts\french-sync.config.example.ps1 to scripts\french-sync.config.ps1 and set `$ObsidianFrenchPath."
}

$SourcePath = (Resolve-Path -LiteralPath $SourcePath).Path
$RepoPath = (Resolve-Path -LiteralPath $RepoPath).Path

if (-not (Test-Path -LiteralPath $DestinationPath)) {
  New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null
}
$DestinationPath = (Resolve-Path -LiteralPath $DestinationPath).Path

$ExpectedDestination = (Join-Path $RepoPath "content\French")
if ($DestinationPath -ne (Resolve-Path -LiteralPath $ExpectedDestination).Path) {
  throw "DestinationPath must be the Quartz content\French directory: $ExpectedDestination"
}

$CurrentBranch = git -C $RepoPath rev-parse --abbrev-ref HEAD
if ($LASTEXITCODE -ne 0) {
  throw "RepoPath is not a git repository: $RepoPath"
}

if ($CurrentBranch.Trim() -ne $Branch) {
  throw "The Quartz repo is on '$($CurrentBranch.Trim())', expected '$Branch'. Switch branches before syncing."
}

Write-Host "Syncing French notes"
Write-Host "  from: $SourcePath"
Write-Host "  to:   $DestinationPath"

if ($DryRun) {
  $RoboArgs = @($SourcePath, $DestinationPath, "/L", "/MIR", "/XD", ".obsidian", ".git", ".trash", ".stfolder", "/XF", ".DS_Store", "desktop.ini") + @($PreserveFiles) + @("/R:2", "/W:1")
  & robocopy @RoboArgs
  exit 0
}

$RoboArgs = @($SourcePath, $DestinationPath, "/MIR", "/XD", ".obsidian", ".git", ".trash", ".stfolder", "/XF", ".DS_Store", "desktop.ini") + @($PreserveFiles) + @("/R:2", "/W:1", "/NFL", "/NDL", "/NP")
& robocopy @RoboArgs
$RoboExit = $LASTEXITCODE
if ($RoboExit -gt 7) {
  throw "robocopy failed with exit code $RoboExit"
}

$StudyPageGenerator = Join-Path $ScriptDir "generate-french-study-pages.mjs"
if (Test-Path -LiteralPath $StudyPageGenerator) {
  node $StudyPageGenerator --content $DestinationPath --source $SourcePath
  if ($LASTEXITCODE -ne 0) {
    throw "French study page generation failed"
  }
}

function Update-FrenchIndex {
  param(
    [string]$FrenchPath,
    [string]$IndexFileName = "index.md"
  )

  $IndexPath = Join-Path $FrenchPath $IndexFileName
  if (-not (Test-Path -LiteralPath $IndexPath)) {
    return
  }

  $Utf8NoBom = New-Object System.Text.UTF8Encoding $false
  $Text = [System.IO.File]::ReadAllText($IndexPath, $Utf8NoBom)
  $NewLine = if ($Text -match "`r`n") { "`r`n" } else { "`n" }
  $Lines = $Text -split "`r?`n", -1
  $IndexHeading = "$([char]0x76ee)$([char]0x5f55)"
  $IndexHeadingPattern = '^\s*##\s+' + [regex]::Escape($IndexHeading) + '\s*$'

  $HeadingIndex = -1
  for ($i = 0; $i -lt $Lines.Count; $i++) {
    if ($Lines[$i] -match $IndexHeadingPattern) {
      $HeadingIndex = $i
      break
    }
  }

  if ($HeadingIndex -lt 0) {
    return
  }

  $SectionEnd = $Lines.Count
  for ($i = $HeadingIndex + 1; $i -lt $Lines.Count; $i++) {
    if ($Lines[$i] -match '^\s*##\s+' -and $Lines[$i] -notmatch $IndexHeadingPattern) {
      $SectionEnd = $i
      break
    }
  }

  $Notes = Get-ChildItem -LiteralPath $FrenchPath -File -Filter "*.md" |
    Where-Object { $_.Name -ne $IndexFileName } |
    Sort-Object BaseName

  $NoteNames = @{}
  foreach ($Note in $Notes) {
    $NoteNames[$Note.BaseName] = $true
  }

  $ExistingLinks = New-Object System.Collections.Generic.List[string]
  $ExistingTargets = @{}
  for ($i = $HeadingIndex + 1; $i -lt $SectionEnd; $i++) {
    $Line = $Lines[$i]
    if ($Line -match '^\s*-\s*\[\[([^\]|#]+)') {
      $Target = $Matches[1].Trim()
      if ($NoteNames.ContainsKey($Target) -and -not $ExistingTargets.ContainsKey($Target)) {
        $ExistingLinks.Add($Line)
        $ExistingTargets[$Target] = $true
      }
    }
  }

  foreach ($Note in $Notes) {
    if (-not $ExistingTargets.ContainsKey($Note.BaseName)) {
      $ExistingLinks.Add("- [[$($Note.BaseName)|$($Note.BaseName)]]")
    }
  }

  $Replacement = New-Object System.Collections.Generic.List[string]
  for ($i = 0; $i -le $HeadingIndex; $i++) {
    $Replacement.Add($Lines[$i])
  }

  $Replacement.Add("")
  foreach ($Link in $ExistingLinks) {
    $Replacement.Add($Link)
  }

  for ($i = $SectionEnd; $i -lt $Lines.Count; $i++) {
    $Replacement.Add($Lines[$i])
  }

  $Updated = [string]::Join($NewLine, $Replacement)
  if ($Updated -ne $Text) {
    [System.IO.File]::WriteAllText($IndexPath, $Updated, $Utf8NoBom)
    Write-Host "Updated French index links."
  }
}

Update-FrenchIndex -FrenchPath $DestinationPath

$Changes = git -C $RepoPath status --porcelain -- "content/French"
if (-not $Changes) {
  Write-Host "No French note changes to commit."
  exit 0
}

git -C $RepoPath add -- "content/French"
if ($LASTEXITCODE -ne 0) {
  throw "git add failed"
}

git -C $RepoPath commit -m $CommitMessage
if ($LASTEXITCODE -ne 0) {
  throw "git commit failed"
}

if (-not $NoPushRequested) {
  git -C $RepoPath push $Remote $Branch
  if ($LASTEXITCODE -ne 0) {
    throw "git push failed"
  }
}

Write-Host "French notes synced successfully."
