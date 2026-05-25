param(
  [string]$SourcePath,
  [string]$RepoPath,
  [int]$DebounceSeconds
)

$ErrorActionPreference = "Stop"

$ParamSourcePath = $SourcePath
$ParamRepoPath = $RepoPath
$ParamDebounceSeconds = $DebounceSeconds

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogPath = Join-Path $ScriptDir "french-sync.log"
try {
  Start-Transcript -Path $LogPath -Append | Out-Null
} catch {
  Write-Warning "Could not start transcript log: $($_.Exception.Message)"
}

$Mutex = New-Object System.Threading.Mutex($false, "KalaxFrenchNotesSyncWatcher")
$HasMutex = $Mutex.WaitOne(0)
if (-not $HasMutex) {
  Write-Host "French notes watcher is already running."
  try {
    Stop-Transcript | Out-Null
  } catch {
  }
  exit 0
}

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

if ($ParamDebounceSeconds) {
  $DebounceSeconds = $ParamDebounceSeconds
} elseif (-not $DebounceSeconds) {
  if ($script:DebounceSeconds) {
    $DebounceSeconds = $script:DebounceSeconds
  } else {
    $DebounceSeconds = 20
  }
}

if (-not $SourcePath) {
  throw "Missing SourcePath. Copy scripts\french-sync.config.example.ps1 to scripts\french-sync.config.ps1 and set `$ObsidianFrenchPath."
}

$SourcePath = (Resolve-Path -LiteralPath $SourcePath).Path
$RepoPath = (Resolve-Path -LiteralPath $RepoPath).Path
$SyncScript = Join-Path $ScriptDir "sync-french-notes.ps1"

$global:FrenchNotesSyncPending = $false
$global:FrenchNotesSyncLastEvent = Get-Date
$global:FrenchNotesSyncRunning = $false

$Watcher = New-Object System.IO.FileSystemWatcher
$Watcher.Path = $SourcePath
$Watcher.IncludeSubdirectories = $true
$Watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName, DirectoryName, LastWrite, Size'
$Watcher.EnableRaisingEvents = $true

$Action = {
  $global:FrenchNotesSyncPending = $true
  $global:FrenchNotesSyncLastEvent = Get-Date
}

$Subscriptions = @(
  Register-ObjectEvent -InputObject $Watcher -EventName Created -Action $Action
  Register-ObjectEvent -InputObject $Watcher -EventName Changed -Action $Action
  Register-ObjectEvent -InputObject $Watcher -EventName Deleted -Action $Action
  Register-ObjectEvent -InputObject $Watcher -EventName Renamed -Action $Action
)

try {
  Write-Host "Watching French notes: $SourcePath"
  Write-Host "Quartz repo: $RepoPath"
  Write-Host "Debounce: $DebounceSeconds seconds"
  Write-Host "Press Ctrl+C to stop."

  while ($true) {
    Start-Sleep -Seconds 2

    $IdleSeconds = ((Get-Date) - $global:FrenchNotesSyncLastEvent).TotalSeconds
    if ($global:FrenchNotesSyncPending -and -not $global:FrenchNotesSyncRunning -and $IdleSeconds -ge $DebounceSeconds) {
      $global:FrenchNotesSyncPending = $false
      $global:FrenchNotesSyncRunning = $true

      try {
        & $SyncScript -SourcePath $SourcePath -RepoPath $RepoPath
      } catch {
        Write-Error $_
      } finally {
        $global:FrenchNotesSyncRunning = $false
      }
    }
  }
} finally {
  foreach ($Subscription in $Subscriptions) {
    Unregister-Event -SubscriptionId $Subscription.Id -ErrorAction SilentlyContinue
  }
  $Watcher.Dispose()
  if ($HasMutex) {
    $Mutex.ReleaseMutex()
    $Mutex.Dispose()
  }
  try {
    Stop-Transcript | Out-Null
  } catch {
  }
}
