import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsIFvtzzbx3OYXZr2MKCk7ml8jZvKUOVs",
  authDomain: "hunger-games-cb40e.firebaseapp.com",
  projectId: "hunger-games-cb40e",
  storageBucket: "hunger-games-cb40e.firebasestorage.app",
  messagingSenderId: "1002369787131",
  appId: "1:1002369787131:web:39e602e3440d5fd6a1fc5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Handle Login Submit
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.querySelector('input[name="role"]:checked').value; // 'user' or 'admin'

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    if (role === "user") {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        alert("This account is not registered as a user.");
        return;
      }
      alert("User login successful!");
      window.location.href = "user.html";

    } else if (role === "admin") {
      const adminDoc = await getDoc(doc(db, "admins", uid));
      if (!adminDoc.exists()) {
        alert("This account is not registered as a caterer.");
        return;
      }

      const data = adminDoc.data();
      if (data.approved === false) {
        alert("Your account is pending approval by Super Admin.");
        return;
      }

      alert("Caterer login successful!");
      window.location.href = "admin_dashboard.html"; // Change to your actual dashboard page
    }

  } catch (error) {
    console.error("Login failed:", error.code, error.message);
    alert("Login failed: " + error.message);
  }
});
