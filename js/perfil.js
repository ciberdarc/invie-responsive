var refTest = firebase.database().ref("test");
var ref = firebase.database().ref("usuario");

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");


var btnPush = document.getElementById("btnPush");
var btnSet = document.getElementById("btnSet");
var btnUpdate = document.getElementById("btnUpdate");
var btnRemove = document.getElementById("btnRemove");

btnRemove.addEventListener("click", function() {
  ref.child("sUq4yWNc3SNJPVCzvYNYsQyIXE52").remove().then(function() {
    alert("remove");
  }).catch(function(err) {
    console.log(err);
    alert("fallo el remove");
  });
});

btnSet.addEventListener("click", function() {
  var obj = {
    lugarPlatziConf: "Cdmx"
  };
  refTest.set(obj).then(function() {
    alert("set");
  }).catch(function(err) {
    console.log(err);
    alert("fallo el set");
  });
});

btnPush.addEventListener("click", function () {
  var objeto = {
    curso: "firebase",
    profesor: "angel",
    contenidos:{
      primero: "autenticacion"
    }
  };
  refTest.push(objeto).then(function() {
    alert("se subio correctamente la informacion");
  }).catch(function(err) {
    console.log(err);
    alert("hubo un error");
  });
});

btnUpdate.addEventListener("click", function() {
  var obj = {
    lugar: "platzi"
  };
  refTest.update(obj).then(function() {
    alert("se actualizo correctament la informaion");
  }).catch(function (err) {
    console.log(err);
    alert("hubo un error");
  });
});


var usuario = {};
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
  }else {
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
  }
});

btnLogin.addEventListener("click", function name(params) {
  event.preventDefault();

  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  // var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  firebase.auth().signInWithPopup(provider).then(function(datosusuario) {
  btnLogout.innerHTML = "Cerrar sesión";
  console.log(datosusuario);
  
  usuario = {
    nombre: datosusuario.user.displayName,
    email: datosusuario.user.email,
    uid: datosusuario.user.uid
  };
  agregarUsuario(usuario, usuario.uid);
  }).catch(function(error){
    console.log("error");
  });
});

btnLogout.addEventListener("click", function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    btnLogin.innerHTML = "Iniciar sesión";
    btnLogout.innerHTML = "";

  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
});

function agregarUsuario(usuario, uid){
  ref.child(uid).update(usuario);
}