# French Notes Sync

This local automation mirrors your Obsidian `French` folder into Quartz `content/French`, commits the change, and pushes it to `origin/v4`. GitHub Pages then rebuilds and publishes the site.

## Setup

1. Copy the example config:

   ```powershell
   Copy-Item .\scripts\french-sync.config.example.ps1 .\scripts\french-sync.config.ps1
   ```

2. Edit `scripts\french-sync.config.ps1` and set:

   ```powershell
   $ObsidianFrenchPath = "C:\Path\To\Your\Obsidian\Vault\French"
   ```

3. Test one sync:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\sync-french-notes.ps1
   ```

4. Start the watcher manually:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\watch-french-notes.ps1
   ```

5. Optional: install the watcher as a Windows logon task:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\install-french-notes-sync-task.ps1
   ```

## Notes

- The watcher waits for edits to settle before syncing, so one Obsidian save burst should create one commit.
- `scripts\french-sync.config.ps1` is ignored by git because it contains your private local path.
- The sync mirrors the source folder into `content/French`, including deleting files from Quartz if you delete them in Obsidian.
- `index.md` is preserved by default so the Quartz section landing page is not removed when it does not exist in Obsidian.
