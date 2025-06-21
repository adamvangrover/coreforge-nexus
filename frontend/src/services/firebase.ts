// IMPORTANT: In a real project, replace with your actual Firebase config.
// This file is set up to allow the app to run with mock data if Firebase is not configured.

import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // Replace with your actual API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your actual auth domain
  projectId: "YOUR_PROJECT_ID", // Replace with your actual project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your actual storage bucket
  messagingSenderId: "YOUR_SENDER_ID", // Replace with your actual sender ID
  appId: "YOUR_APP_ID" // Replace with your actual app ID
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

try {
  // Check if all necessary Firebase config keys are present (but not "YOUR_API_KEY_HERE" etc.)
  const isLikelyPlaceholderConfig = Object.values(firebaseConfig).some(value => value.startsWith("YOUR_") || value.includes("PROJECT_ID"));

  if (!isLikelyPlaceholderConfig) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase initialized successfully.");
  } else {
    console.warn("Firebase configuration appears to be placeholder data. Firebase services will not be initialized. The app will use mock data.");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  console.warn("The app will proceed with mock data due to Firebase initialization failure.");
  // Ensure app, db, auth remain null if initialization fails
  app = null;
  db = null;
  auth = null;
}

// Export the initialized services, or null if initialization failed/skipped
export { db, auth, app };
