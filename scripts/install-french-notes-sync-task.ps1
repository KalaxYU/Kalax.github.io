param(
  [string]$TaskName = "Kalax French Notes Sync",
  [string]$RepoPath
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $RepoPath) {
  $RepoPath = (Resolve-Path (Join-Path $ScriptDir "..")).Path
}

$WatcherScript = Join-Path $RepoPath "scripts\watch-french-notes.ps1"
if (-not (Test-Path -LiteralPath $WatcherScript)) {
  throw "Cannot find watcher script: $WatcherScript"
}

$ConfigPath = Join-Path $RepoPath "scripts\french-sync.config.ps1"
if (-not (Test-Path -LiteralPath $ConfigPath)) {
  throw "Create $ConfigPath before installing the scheduled task."
}

$PowerShell = (Get-Command powershell.exe).Source
$Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$WatcherScript`""

$Action = New-ScheduledTaskAction -Execute $PowerShell -Argument $Arguments -WorkingDirectory $RepoPath
$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Days 30)

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Watch Obsidian French notes, sync them into Quartz, commit, and push to GitHub." -Force | Out-Null

Write-Host "Installed scheduled task: $TaskName"
Write-Host "It will start the French notes watcher when you log in."
