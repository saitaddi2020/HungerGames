// In firebase.js

// UPDATED to version 11.6.1
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// UPDATED to version 11.6.1
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
// UPDATED to version 11.6.1
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// UPDATED to version 11.6.1
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsIFvtzzbx3OYXZr2MKCk7ml8jZvKUOVs",
  authDomain: "hunger-games-cb40E.firebaseapp.com",
  projectId: "hunger-games-cb40E",
 storageBucket: "hunger-games-cb40e.firebasestorage.app",
  messagingSenderId: "1002369787131",
  appId: "1:1002369787131:web:39e602e3440d5fd6a1fc5e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);