function uploadToCloudinary(file, callback) {
  const url = "https://api.cloudinary.com/v1_1/dk4gktat9/image/upload";
  const preset = "unsigned_preset"; // Replace with your actual preset

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.secure_url) {
        callback(null, data.secure_url); // ✅ Use this in Firestore
      } else {
        callback(new Error("Upload failed"));
      }
    })
    .catch((err) => callback(err));
}

function uploadProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("productImage").files[0];

  if (!name || !price || !file) {
    alert("Please fill all fields and select an image.");
    return;
  }

  // Get the currently logged-in admin's username
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      alert("You must be logged in as an admin.");
      return;
    }

    const adminRef = firebase.firestore().collection("admins").doc(user.uid);
    adminRef.get().then((doc) => {
      if (!doc.exists) {
        alert("Admin data not found.");
        return;
      }

      const adminUsername = doc.data().username;

      uploadToCloudinary(file, (err, imageUrl) => {
        if (err) {
          alert("Image upload failed");
          return;
        }

        firebase.firestore().collection("products").add({
          productName: name,
          price: parseFloat(price),
          imageUrl: imageUrl,
          catererUsername: adminUsername, // 🔐 Important for Firestore rules
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          alert("Product uploaded successfully!");

          // Clear form
          document.getElementById("productName").value = "";
          document.getElementById("price").value = "";
          document.getElementById("productImage").value = "";
        });
      });
    });
  });
}
