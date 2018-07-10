var btnLogin = document.getElementById("btnLogin");




firebase.auth().onAuthStateChanged(function (user) {
// console.log(user);
// if (user) {
//     console.log("tenemos usuario");
  
// } else {
//     console.log("no tenemos usuario");
  
// }
});

btnLogin.addEventListener("click", function name(params) {
  event.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();

  console.log("funciona btn");
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithPopup(provider).then(function(datosusuario) {
    console.log(datosusuario);
    
  }).catch(function(err) {
    console.log("error");
  });
});