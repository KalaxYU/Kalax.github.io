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

try {
  $Action = New-ScheduledTaskAction -Execute $PowerShell -Argument $Arguments -WorkingDirectory $RepoPath
  $Trigger = New-ScheduledTaskTrigger -AtLogOn
  $Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Days 30)

  Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Watch Obsidian French notes, sync them into Quartz, commit, and push to GitHub." -Force | Out-Null

  Write-Host "Installed scheduled task: $TaskName"
  Write-Host "It will start the French notes watcher when you log in."
} catch {
  $StartupDir = [Environment]::GetFolderPath("Startup")
  $ShortcutPath = Join-Path $StartupDir "$TaskName.lnk"
  $Shell = New-Object -ComObject WScript.Shell
  $Shortcut = $Shell.CreateShortcut($ShortcutPath)
  $Shortcut.TargetPath = $PowerShell
  $Shortcut.Arguments = $Arguments
  $Shortcut.WorkingDirectory = $RepoPath
  $Shortcut.WindowStyle = 7
  $Shortcut.Description = "Watch Obsidian French notes, sync them into Quartz, commit, and push to GitHub."
  $Shortcut.Save()

  Write-Host "Could not install a scheduled task: $($_.Exception.Message)"
  Write-Host "Installed Startup shortcut instead: $ShortcutPath"
  Write-Host "It will start the French notes watcher when you log in."
}
