# Firebase Deployment Guide

This guide explains how to deploy the SoftUni Loan Calculator to Firebase Hosting.

## Prerequisites

1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

## Setup

The project is already configured with:
- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Firebase project reference

## Building for Production

Before deploying, build the project:

```bash
npm run build
```

This copies all source files from `src/` into the `public/` directory, which is served by Firebase Hosting.

## Deployment Steps

### First Time Setup

1. Create a Firebase project at https://console.firebase.google.com/
   - Project name: `softuni-loan-calc` (or any name you prefer)
   - Enable Google Analytics (optional)

2. Update `.firebaserc` with your project ID if different:
   ```json
   {
     "projects": {
       "default": "your-project-id"
     }
   }
   ```

3. Initialize Firebase (if needed):
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new one
   - Use `public` as the public directory
   - Configure as single-page app: No
   - Don't overwrite existing files

### Deploy to Firebase

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

3. Your app will be live at: `https://your-project-id.web.app`

## Continuous Deployment

For automatic deployments on push, you can set up GitHub Actions with Firebase Hosting.

### Setup GitHub Actions (Optional)

A workflow file is already included at `.github/workflows/firebase-deploy.yml`.

To enable automatic deployments:

1. Generate a Firebase service account key:
   ```bash
   firebase init hosting:github
   ```
   OR manually at: https://console.firebase.google.com/project/your-project-id/settings/serviceaccounts/adminsdk

2. Add the service account JSON as a GitHub secret:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add new repository secret: `FIREBASE_SERVICE_ACCOUNT`
   - Paste the entire JSON content

3. Push to the `main` branch, and GitHub Actions will automatically build and deploy your app

Note: Update the `projectId` in `.github/workflows/firebase-deploy.yml` if you use a different project name.

## Local Testing

To test the built version locally before deploying:

```bash
npm run build
firebase serve
```

This will start a local server at http://localhost:5000

## Troubleshooting

### "An unexpected error has occurred"

If you get this error when running Firebase commands:
1. Make sure you're logged in: `firebase login`
2. Check your internet connection
3. Verify the project exists in Firebase Console
4. Try logging out and back in: `firebase logout` then `firebase login`

### Files not loading

If CSS or JS files don't load after deployment:
1. Make sure you ran `npm run build` before deploying
2. Check that all files exist in the `public/` directory
3. Verify paths in `public/index.html` are relative (no `../`)

## Project Structure

```
public/              # Firebase hosting public directory
  ├── index.html     # Main HTML file
  ├── main.js        # Main application JS (built)
  ├── styles/        # CSS files (built)
  ├── components/    # Component files (built)
  ├── services/      # Service files (built)
  └── utils/         # Utility files (built)

src/                 # Source files
  ├── main.js
  ├── components/
  ├── services/
  ├── styles/
  └── utils/

firebase.json        # Firebase configuration
.firebaserc          # Firebase project reference
```

## Development Workflow

1. Make changes in `src/` directory
2. Test with dev server: `npm run dev`
3. Build for production: `npm run build`
4. Deploy: `firebase deploy`
