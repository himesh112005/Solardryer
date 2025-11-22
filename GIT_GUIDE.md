# Git Update Guide - SolarDry Solutions

## Quick Git Commands

### Check Current Status
```bash
git status
```

Shows all modified, added, and deleted files.

### View Changes
```bash
git diff
```

Shows what changed in your files.

## Step 1: Stage Your Changes

### Stage All Changes
```bash
git add .
```

### Stage Specific File
```bash
git add filename.html
```

### Stage Specific Folder
```bash
git add folder/
```

## Step 2: Commit Changes

### Commit with Message
```bash
git commit -m "Your commit message"
```

**Good commit messages:**
- `git commit -m "Update admin dashboard"`
- `git commit -m "Add about section editor"`
- `git commit -m "Fix login issue"`
- `git commit -m "Deploy to Vercel"`

### Commit Multiple Files
```bash
git add .
git commit -m "Update multiple sections"
```

## Step 3: Push to GitHub

### Push to Main Branch
```bash
git push origin main
```

### Push and Set Upstream
```bash
git push -u origin main
```

### Force Push (Use Carefully!)
```bash
git push origin main --force
```

## Step 4: Update from GitHub

### Pull Latest Changes
```bash
git pull origin main
```

## Complete Update Workflow

### For Your Current Changes

```bash
# 1. Check status
git status

# 2. Stage all changes
git add .

# 3. Commit with message
git commit -m "Update SolarDry Solutions - Add features and improvements"

# 4. Push to GitHub
git push origin main
```

## Common Scenarios

### Scenario 1: Update Index.html Only

```bash
git add index.html
git commit -m "Update homepage with product loader"
git push origin main
```

### Scenario 2: Update Multiple Admin Pages

```bash
git add admin-*.html admin-*.js
git commit -m "Update admin panel pages"
git push origin main
```

### Scenario 3: Add New Deployment Files

```bash
git add DEPLOY_GUIDE.md WINDOWS_SETUP.md vercel.json
git commit -m "Add deployment documentation and Vercel config"
git push origin main
```

### Scenario 4: Update Entire Project

```bash
git add .
git commit -m "Major update: Add about editor, mentors, timeline, and deployment guides"
git push origin main
```

## View Commit History

### See Recent Commits
```bash
git log --oneline -10
```

### See Detailed History
```bash
git log
```

### See Specific File History
```bash
git log -- filename.html
```

## Undo Changes

### Undo Uncommitted Changes (Local File)
```bash
git checkout filename.html
```

### Undo All Uncommitted Changes
```bash
git reset --hard HEAD
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

## Branches

### View All Branches
```bash
git branch -a
```

### Create New Branch
```bash
git checkout -b feature/new-feature
```

### Switch Branch
```bash
git checkout main
```

### Delete Branch
```bash
git branch -d feature/old-feature
```

## Syncing with Remote

### Check Remote URL
```bash
git remote -v
```

### Update Remote
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/solar-dryer-solutions.git
```

### Fetch Without Merging
```bash
git fetch origin
```

## Stashing Changes

### Save Work Temporarily
```bash
git stash
```

### Apply Stashed Changes
```bash
git stash apply
```

### List Stashed Changes
```bash
git stash list
```

## Tag Versions

### Create Tag
```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
```

### Push Tag
```bash
git push origin v1.0.0
```

### List Tags
```bash
git tag -l
```

## Resolving Conflicts

If you get merge conflicts:

1. Open conflicted file
2. Look for conflict markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```
3. Edit file to resolve
4. Save file
5. Stage and commit:
   ```bash
   git add conflicted-file.html
   git commit -m "Resolve merge conflict"
   ```

## Complete Git Workflow for Your Project

### First Time Setup

```bash
cd c:\Users\user\Desktop\solar_dryer_app

# Initialize git (if not done)
git init

# Add remote (if not done)
git remote add origin https://github.com/YOUR_USERNAME/solar-dryer-solutions.git

# Stage all files
git add .

# Initial commit
git commit -m "Initial commit: SolarDry Solutions"

# Push to GitHub
git branch -M main
git push -u origin main
```

### For Regular Updates

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit
git commit -m "Describe your changes"

# Push
git push origin main
```

### Before Deployment

```bash
# Make sure everything is committed
git status

# Should show: "On branch main, nothing to commit"

# If files are modified
git add .
git commit -m "Final update before deployment"
git push origin main

# Then deploy to Vercel
vercel --prod
```

## Git Configuration

### Set User Name
```bash
git config --global user.name "Your Name"
```

### Set User Email
```bash
git config --global user.email "your.email@gmail.com"
```

### View Configuration
```bash
git config --list
```

## GitHub Desktop (Alternative to Command Line)

If you prefer GUI:

1. Download GitHub Desktop from https://desktop.github.com
2. Clone your repository
3. Make changes
4. Click "Commit to main"
5. Click "Push origin"

## Useful Aliases

Create shortcuts for common commands:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

Then use:
```bash
git st        # instead of git status
git co main   # instead of git checkout main
git ci -m "msg"  # instead of git commit -m "msg"
```

## Troubleshooting

### Issue: "fatal: not a git repository"

**Solution:**
```bash
cd c:\Users\user\Desktop\solar_dryer_app
git init
git remote add origin https://github.com/YOUR_USERNAME/solar-dryer-solutions.git
```

### Issue: "Permission denied" on push

**Solution:**
```bash
# Check remote URL
git remote -v

# Update if needed
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/solar-dryer-solutions.git
```

### Issue: "Merge conflict"

**Solution:**
1. Open conflicted files
2. Resolve conflicts (keep desired code)
3. Remove conflict markers
4. Commit: `git commit -am "Resolve conflicts"`

### Issue: "Changes not showing"

**Solution:**
```bash
# Make sure you staged changes
git add .

# Verify
git status

# Then commit
git commit -m "Your message"
```

## Deployment Sync

### Update Git Before Deploying

```bash
# 1. Commit all changes
git add .
git commit -m "Pre-deployment update"

# 2. Push to GitHub
git push origin main

# 3. Deploy to Vercel
vercel --prod
```

### Verify Deployment Synced with GitHub

1. Go to https://github.com/YOUR_USERNAME/solar-dryer-solutions
2. Check "Latest commit" matches your local changes
3. Vercel auto-deploys from main branch

## Git Tips & Best Practices

✅ **DO:**
- Commit frequently with meaningful messages
- Push regularly to backup code
- Pull before starting work
- Create branches for new features
- Use .gitignore for sensitive files

❌ **DON'T:**
- Commit node_modules/
- Commit .env files
- Use force push without reason
- Commit large binary files
- Mix multiple features in one commit

## Quick Reference Sheet

```bash
# Daily workflow
git status                          # Check changes
git add .                          # Stage all
git commit -m "message"            # Commit
git push origin main               # Push

# Viewing history
git log --oneline -5               # Last 5 commits
git diff                           # See changes
git show commit-hash               # View commit

# Branches
git branch                         # List branches
git checkout -b new-branch         # Create branch
git checkout main                  # Switch branch

# Undo
git checkout -- file.html          # Undo file
git reset --hard HEAD~1            # Undo last commit

# Remote
git pull origin main               # Get latest
git push origin main               # Send changes
git remote -v                      # Show remotes
```

## Support Resources

- **Git Docs**: https://git-scm.com/doc
- **GitHub Docs**: https://docs.github.com
- **Git Cheat Sheet**: https://github.githubassets.com/shared/downloads/github-git-cheat-sheet.pdf
- **GitHub Desktop**: https://desktop.github.com

---

**Status**: ✅ Complete Git Guide Ready
**Version**: 1.0.0
**Last Updated**: 2025-01-15
