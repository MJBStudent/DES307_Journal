# Troubleshooting: 'Cannot Get' Error

## What This Error Means
Your browser can't connect to the server or find the `/api/notes` endpoint.

## Quick Fixes (in order)

### 1. Start the Server
Run this in your terminal:
```bash
node server.js
```
You should see: `Server is running on http://localhost:3000`

### 2. Verify the Notes Directory Exists
Your project needs a `/notes` folder in the root directory (same level as `server.js` and `index.html`).

### 3. Test the Connection
- Open http://localhost:3000 in your browser
- Check the browser's Developer Tools (F12 → Console) for specific error messages

## What's Happening
- `server.js` defines the API endpoint at line 14
- `index.html` tries to fetch from that endpoint
- If the server isn't running, the browser gets "cannot get"
- If `/notes` directory is missing, you'll get a 500 error instead