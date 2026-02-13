# Quick Start Guide - Get Your Portfolio Online

## Step 1: Create a New Repo on GitHub (2 minutes)

1. Go to https://github.com/new
2. Repository name: `python-bida-portfolio` (or whatever you prefer)
3. Description: "Business Intelligence Data Analyst Portfolio - Python Projects"
4. Make it **Public**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

---

## Step 2: Update index.html with Your GitHub Info (30 seconds)

Open `index.html` and find these lines at the top of the `<script>` section (around line 618):

```javascript
const GITHUB_USERNAME = 'YOUR_USERNAME';  // Replace with your GitHub username
const GITHUB_REPO = 'YOUR_REPO_NAME';     // Replace with your repo name
```

Change to your actual values. For example:
```javascript
const GITHUB_USERNAME = 'jsmith';
const GITHUB_REPO = 'python-bida-portfolio';
```

Save the file.

---

## Step 3: Push to GitHub (1 minute)

GitHub will give you commands after creating the repo. They'll look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git add .
git commit -m "Initial commit: BIDA portfolio with interactive HTML"
git branch -M main
git push -u origin main
```

Or run these commands in your terminal:

```powershell
# Add your remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: BIDA portfolio with interactive HTML"

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 4: Enable GitHub Pages (1 minute)

1. Go to your repo on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 1-2 minutes

---

## Step 5: Get Your Live URL

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Example: `https://jsmith.github.io/python-bida-portfolio/`

---

## Step 6: Add to Your Word Document

In your Word doc, you can:

**Option 1: Hyperlink text**
```
View my portfolio: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Option 2: Insert as clickable link**
1. Type: "Interactive Portfolio"
2. Highlight the text
3. Insert → Link → paste your GitHub Pages URL

**Option 3: Add to header/footer**
```
Portfolio: YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

---

## What Hiring Managers Will See

When they click your link:
✅ Beautiful interactive table with all 28 projects
✅ Filter buttons to view specific skill areas
✅ Click any file name to see the actual code on GitHub
✅ Professional, scannable presentation

---

## Troubleshooting

**Links not working?**
- Make sure you updated GITHUB_USERNAME and GITHUB_REPO in index.html
- Commit and push the changes

**GitHub Pages not showing?**
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages for the green "Your site is live" message
- Make sure you selected the "main" branch

**Files showing 404?**
- Make sure all your .py and .ipynb files were pushed to GitHub
- Check that file names match exactly (spaces and capitalization matter)

---

## Files in This Repo

- `index.html` - Your interactive portfolio page (THIS IS THE STAR)
- `PORTFOLIO_CATALOG.csv` - Spreadsheet version for Excel users
- `PORTFOLIO_README.md` - GitHub repo documentation
- `FILE_RENAMING_GUIDE.md` - Optional file naming suggestions
- All your `.py` and `.ipynb` files - The actual code

---

**You're all set! Once this is live, you'll have a professional portfolio link to share.** 🚀
