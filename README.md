# Frontend - UID Whitelist Dashboard

React/Vite web application for UID whitelist management with coin system.

## Deploy to Vercel

1. **Via Vercel Dashboard:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import from GitHub or drag & drop this folder
   - Set environment variable:
     - `VITE_API_BASE_URL` = `https://your-backend-url.railway.app`
   - Click "Deploy"

2. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel
   ```

## Environment Variables (Set in Vercel)

**IMPORTANT:** After deploying backend to Railway, set this variable:

```
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

## Local Development

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`

## Features

- **Whitelist Page:** Add/remove UIDs (costs 100 coins)
- **Get Access Page:** Earn coins by viewing ads
- Real-time coin balance updates
- Multi-region support (13 regions)

## Build for Production

```bash
npm run build
```

Static files will be in `dist/` folder.
