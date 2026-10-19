// Optional Google sign-in with progress sync through Firebase (Auth + Firestore).
// Local progress stays the source the app reads; the cloud copy is merged in on
// sign-in and pushed (debounced) after every change. Without a config, or
// offline, everything keeps working from localStorage.

import { firebaseConfig } from './firebase-config.js';
import { progress } from './progress.js';

const HINT = 'dg2gr.signedin'; // set once the user signs in, so we restore the session on load
const hasHint = () => { try { return localStorage.getItem(HINT) === '1'; } catch { return false; } };
const setHint = on => { try { on ? localStorage.setItem(HINT, '1') : localStorage.removeItem(HINT); } catch { /* ignore */ } };

export const cloudConfigured = !!firebaseConfig;

const status = { user: null, sync: 'idle', error: null }; // sync: idle | syncing | synced | error
const subs = new Set();
const emit = () => subs.forEach(fn => fn({ ...status }));
export function onCloudChange(fn) { subs.add(fn); fn({ ...status }); return () => subs.delete(fn); }

let fb = null, auth = null, db = null, pushTimer = null, started = false, attached = false;

async function load() {
  if (fb) return fb;
  fb = await import('../vendor/firebase.js');
  const app = fb.initializeApp(firebaseConfig);
  auth = fb.getAuth(app);
  db = fb.getFirestore(app);
  return fb;
}

const ref = () => fb.doc(db, 'users', status.user.uid);

async function pull() {
  const snap = await fb.getDoc(ref());
  if (snap.exists()) progress.mergeRemote(JSON.parse(snap.data().progress));
}

async function push() {
  if (!status.user) return;
  await fb.setDoc(ref(), { progress: JSON.stringify(progress.snapshot()), updated: Date.now() });
}

async function run(fn) {
  status.sync = 'syncing'; status.error = null; emit();
  try { await fn(); status.sync = 'synced'; }
  catch (err) { status.sync = 'error'; status.error = err.message; console.error(err); }
  emit();
}

const syncNow = async () => { await pull(); await push(); };

function schedulePush() {
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => status.user && run(push), 1500);
}

// Call once at startup. Loads Firebase only if the user signed in before.
export async function initCloud() {
  if (!cloudConfigured || started) return;
  started = true;
  if (!hasHint()) return;
  await attach();
}

async function attach() {
  if (attached) return;
  try {
    await load();
  } catch (err) { status.sync = 'error'; status.error = 'Could not load sign-in (offline?)'; emit(); return; }
  attached = true;
  fb.onAuthStateChanged(auth, user => {
    status.user = user ? { uid: user.uid, name: user.displayName, email: user.email, photo: user.photoURL } : null;
    setHint(!!user);
    emit();
    if (user) run(syncNow);
  });
  progress.onChange(schedulePush);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && status.user) run(syncNow);
  });
}

export async function signIn() {
  started = true;
  await attach();
  setHint(true);
  const provider = new fb.GoogleAuthProvider();
  try {
    await fb.signInWithPopup(auth, provider);
  } catch (err) {
    if (err.code === 'auth/popup-blocked') return fb.signInWithRedirect(auth, provider);
    if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') return;
    throw err;
  }
}

export async function signOutUser() {
  if (status.user) await run(push);
  await fb.signOut(auth);
}
