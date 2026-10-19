# Accounts and cloud sync (optional)

The app can sign you in with Google and keep your progress in your account, so
your phone and laptop share it. It uses Firebase Authentication plus Firestore.
The SDK is bundled in `vendor/firebase.js` (no CDN). With no config the app
simply runs from `localStorage` as before.

## One-time setup (about 5 minutes)

1. Go to https://console.firebase.google.com and create a project (free Spark plan).
2. **Build → Authentication → Get started → Sign-in method → Google → Enable.**
3. **Authentication → Settings → Authorized domains → Add** `igor-gibernoot.github.io`
   (`localhost` is already there for local testing).
4. **Build → Firestore Database → Create database** (production mode, any region).
   Then open the **Rules** tab and paste the contents of `firestore.rules`.
5. **Project settings → General → Your apps → Web app (`</>`)**: register an app and
   copy the `firebaseConfig` object into `js/firebase-config.js`.
6. Commit and push. Open Settings in the app → **Sign in with Google**.

The config values are not secrets; the security rules make each user's document
readable and writable only by that user.

## How sync works

- Local progress is always the working copy. On sign-in the cloud copy is merged
  in (best score, run counts, newest card answer, latest streak), then the merged
  result is pushed. After that every change is pushed after 1.5 s.
- Reset and import overwrite local progress and therefore the cloud copy too.
- The export/import code still works as a manual backup.

## Rebuilding `vendor/firebase.js`

```sh
npm i firebase esbuild
cat > entry.js <<'JS'
export { initializeApp } from 'firebase/app';
export { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth';
export { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
JS
npx esbuild entry.js --bundle --minify --format=esm --outfile=vendor/firebase.js
```
