function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const role = document.getElementById("role").value; // 🔄 Get selected role from dropdown

  if (!email || !pass || !role) {
    alert("Please fill all fields.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // Save selected role in Firestore
      return firebase.firestore().collection("users").doc(uid).set({
        email: email,
        role: role
      });
    })
    .then(() => {
      alert("Registered Successfully!");
    })
    .catch((error) => alert(error.message));
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (!email || !pass) {
    alert("Please enter both email and password.");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // Get role from Firestore
      return firebase.firestore().collection("users").doc(uid).get();
    })
    .then((doc) => {
      if (doc.exists) {
        const role = doc.data().role;
        if (role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "user.html";
        }
      } else {
        alert("User role not found!");
      }
    })
    .catch((error) => alert(error.message));
}
