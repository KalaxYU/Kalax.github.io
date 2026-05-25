# Copy this file to scripts/french-sync.config.ps1 and edit the source path.
# french-sync.config.ps1 is ignored by git so your private vault path stays local.

$ObsidianFrenchPath = "C:\Path\To\Your\Obsidian\Vault\French"
$QuartzRepoPath = Join-Path $env:USERPROFILE "quartz"
$QuartzFrenchPath = Join-Path $QuartzRepoPath "content\French"

$CommitMessage = "Sync French notes from Obsidian"
$Remote = "origin"
$Branch = "v4"
$DebounceSeconds = 20
$PreserveFiles = @("index.md")
$DisablePush = $false
