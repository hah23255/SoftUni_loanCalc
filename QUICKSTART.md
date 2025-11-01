# Quick Start: Firebase Deployment

## Prerequisites
You mentioned Firebase CLI is installed and project "web-v01" is created. Great!

## Deploy Now

From your terminal in the project directory, run:

```bash
# Make sure you're logged in to Firebase
firebase login

# Deploy the application
npm run deploy:hosting
```

That's it! The script will:
1. Copy all source files to the public directory
2. Deploy to Firebase Hosting

## Your Live URLs

After deployment completes, your app will be available at:
- https://web-v01.web.app
- https://web-v01.firebaseapp.com

## Troubleshooting

If you get authentication errors:
```bash
firebase login --reauth
```

If you need to select a different project:
```bash
firebase use web-v01
```

## Making Changes

After making code changes:
1. Test locally: `npm run dev`
2. Deploy: `npm run deploy:hosting`

## More Info

See DEPLOYMENT.md for detailed documentation.
