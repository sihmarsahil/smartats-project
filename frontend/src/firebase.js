import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxjrOKGpEHM9gEalerY_FfqNr70nr787o",
  authDomain: "smartats-4f2ab.firebaseapp.com",
  projectId: "smartats-4f2ab",
  storageBucket: "smartats-4f2ab.firebasestorage.app",
  messagingSenderId: "40189589157",
  appId: "1:40189589157:web:0be52fb6fed2398757f4c"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { auth };
export default app;
