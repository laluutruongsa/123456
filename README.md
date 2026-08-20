Project prepared for deployment (Render/Vercel).

Important: DO NOT commit sensitive files like `.env` or `atlas-credentials.env`.

Create a private GitHub repo named `1102` and push this project:

Option A — GitHub CLI (recommended if installed):

```bash
git init
git add .
git commit -m "Initial commit"
# create private repo and push
gh repo create 1102 --private --source=. --remote=origin --push
```

Option B — GitHub web UI:

- Create a new repository named `1102` and set visibility to Private.
- Then run:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:YOUR_USERNAME/1102.git
git branch -M main
git push -u origin main
```

Add secrets to GitHub (Repository Settings -> Secrets) or with `gh`:

```bash
# example using gh
gh secret set MONGODB_URI -b "$MONGODB_URI"
gh secret set MONGODB_DBNAME -b "$MONGODB_DBNAME"
```

If you accidentally committed credentials, stop and remove them from history (example):

```bash
git rm --cached .env
git commit -m "Remove .env"
# For full removal from history consider using git-filter-repo or BFG — follow their docs.
```

Deploy notes:
- Render: set `MONGODB_URI`, `NODE_ENV=production`, `PORT` in Environment.
- Vercel: prefer serverless; for long-running services use Render or a VPS.

