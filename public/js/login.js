var firebaseConfig = {
  apiKey: "AIzaSyAAR1ZR8bvOs3BbSrZbquDiQxXcSkvUIVQ",
  authDomain: "shopping-list-ea0af.firebaseapp.com",
  databaseURL: "https://shopping-list-ea0af.firebaseio.com",
  projectId: "shopping-list-ea0af",
  storageBucket: "shopping-list-ea0af.appspot.com",
  messagingSenderId: "18909849388",
  appId: "1:18909849388:web:0701bb4d62aae771daee89",
  measurementId: "G-E16K0FDNMP",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const form = document.querySelector("#submit-form");
const txtEmail = form.querySelector("#email");
const message = form.querySelector(".helper-text");

if (auth.isSignInWithEmailLink(window.location.href)) {
  var email = window.localStorage.getItem("emailForSignIn");
  window.localStorage.removeItem("emailForSignIn");

  if (!email) {
    message.innerHTML = "Por favor introduce de nuevo tu correo";
    txtEmail.value = "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      auth
        .signInWithEmailLink(txtEmail.value, window.location.href)
        .catch(function (error) {
          console.log("¡Ups! Algo salió mal");
        });
    });
  } else {
    auth
      .signInWithEmailLink(email, window.location.href)
      .catch(function (error) {
        console.log("¡Ups! Algo salió mal");
      });
  }
} else {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = txtEmail.value;

    auth
      .sendSignInLinkToEmail(email, {
        url: window.location.href,
        handleCodeInApp: true,
      })
      .then(() => {
        M.toast({ html: "Te hemos enviado un correo" });
        txtEmail.value = "";
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });
}

auth.onAuthStateChanged((user) => {
  if (user) window.location.href = "/app.html";
});
