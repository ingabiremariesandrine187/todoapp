import { firebaseConfig } from "./config.js";


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const signupForm = document.querySelector(".registration.form");
const loginForm = document.querySelector(".login.form");
const forgotForm = document.querySelector(".forgot.form");
const container = document.querySelector(".container");
const signupBtn = document.querySelector(".signupbtn");
const anchors = document.querySelectorAll("a");

anchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    const id = anchor.id;
    switch (id) {
      case "loginLabel":
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        forgotForm.style.display = "none";
        break;
      case "signupLabel":
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        forgotForm.style.display = "none";
        break;
      case "forgotLabel":
        signupForm.style.display = "none";
        loginForm.style.display = "none";
        forgotForm.style.display = "block";
        break;
    }
  });
});

signupBtn.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      if(user){
        location.href = "signout.html";
      }
      firestore.collection("users").doc(uid).set({
        name: name,
        username: username,
        email: email,
      });
      signupForm.style.display = "none";
      loginForm.style.display = "block";
      forgotForm.style.display = "none";
    })
    .catch((error) => {
      alert("Error signing up: " + error.message);
    });
});


const loginBtn = document.querySelector(".loginbtn");

loginBtn.addEventListener("click", () => {
  const password = document.querySelector("#inPass").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        location.href = "signout.html";
      }
    })
    .catch((error) => {
      alert("Error signing in: " + error.message);
    });
});


