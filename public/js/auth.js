if (!firebaseConfig) {
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
}

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

if (!btnLogOut) {
  const btnLogOut = document.getElementById("logout");
}

if (btnLogOut)
  btnLogOut.addEventListener("click", (e) => {
    auth.signOut();
  });

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    M.toast({ html: "Adiós" });
    window.location.href = "/";
  }
});
