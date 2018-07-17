// var refTest = firebase.database().ref("test");
var ref = firebase.database().ref("usuario");

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var datosPerfil = document.getElementById("datosPerfil");
var formularioPerfil = document.getElementById("formularioPerfil");
var perfilTelefono = document.getElementById("perfilTelefono");
var perfilDireccion = document.getElementById("perfilDireccion");

var perfilNombre = document.getElementById("perfilNombre");
var perfilEmail = document.getElementById("perfilEmail");

var btnEditar = document.getElementById("perfilEditar");
var usuario = {};

var cancelForm = document.getElementById("cancelForm");
var nombreForm = document.getElementById("nombreForm");
var emailForm = document.getElementById("emailForm");
var telefonoForm = document.getElementById("telefonoForm");
var calleForm = document.getElementById("calleForm");
var interiorForm = document.getElementById("interiorForm");
var coloniaForm = document.getElementById("coloniaForm");
var cpForm = document.getElementById("cpForm");

function leerInformacion(uid) {
  ref.child(uid).on('value', function (data) {
    var dat = data.val();
    llenarInformacion(dat.nombre, dat.email, dat.telefono, dat.direccion);
  });
}

function llenarInformacion(nombre, email, telefono, direccion) {
  console.log(nombre, email, telefono);
  perfilNombre.innerHTML = nombre;
  perfilEmail.innerHTML = email;
  perfilTelefono.innerHTML = telefono;
  perfilDireccion.innerHTML = direccion.calle + " " +direccion.interior + ", " + direccion.colonia + " " +direccion.cp;
}

//Para la seccion de uso de base de datos
// var btnPush = document.getElementById("btnPush");
// var btnSet = document.getElementById("btnSet");
// var btnUpdate = document.getElementById("btnUpdate");
// var btnRemove = document.getElementById("btnRemove");

// btnRemove.addEventListener("click", function() {
//   ref.child("sUq4yWNc3SNJPVCzvYNYsQyIXE52").remove().then(function() {
//     alert("remove");
//   }).catch(function(err) {
//     console.log(err);
//     alert("fallo el remove");
//   });
// });

// btnSet.addEventListener("click", function() {
//   var obj = {
//     lugarPlatziConf: "Cdmx"
//   };
//   refTest.set(obj).then(function() {
//     alert("set");
//   }).catch(function(err) {
//     console.log(err);
//     alert("fallo el set");
//   });
// });

// btnPush.addEventListener("click", function () {
//   var objeto = {
//     curso: "firebase",
//     profesor: "angel",
//     contenidos:{
//       primero: "autenticacion"
//     }
//   };
//   refTest.push(objeto).then(function() {
//     alert("se subio correctamente la informacion");
//   }).catch(function(err) {
//     console.log(err);
//     alert("hubo un error");
//   });
// });

// btnUpdate.addEventListener("click", function() {
//   var obj = {
//     lugar: "platzi"
//   };
//   refTest.update(obj).then(function() {
//     alert("se actualizo correctament la informaion");
//   }).catch(function (err) {
//     console.log(err);
//     alert("hubo un error");
//   });
// });
var usuario = {};
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
    leerInformacion(user.uid);
  }else {
    
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
    window.location.href = "index.html";
  }
});
//Se agrego que el perfil se carga unicamente desde el inicio de sesion desde el index
// btnLogin.addEventListener("click", function name(params) {
//   event.preventDefault();

//   var provider = new firebase.auth.FacebookAuthProvider();
//   provider.addScope('public_profile');
//   // var provider = new firebase.auth.GoogleAuthProvider();
//   // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

//   firebase.auth().signInWithPopup(provider).then(function(datosusuario) {
//   btnLogout.innerHTML = "Cerrar sesión";
//   console.log(datosusuario);
  
//   usuario = {
//     nombre: datosusuario.user.displayName,
//     email: datosusuario.user.email,
//     uid: datosusuario.user.uid
//   };
//   agregarUsuario(usuario, usuario.uid);
//   }).catch(function(error){
//     console.log("error");
//   });
// });

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

btnEditar.addEventListener("click", function() {
  datosPerfil.style.display = 'none';
  formularioPerfil.style.display = 'block';
});

cancelForm.addEventListener("click", function() {
  datosPerfil.style.display = 'block';
  formularioPerfil.style.display = 'none';
});

function editarDatos() {
  event.preventDefault();
  var uid = firebase.auth().currentUser.uid;
  console.log("editar datos");
  var obj = {
    nombre: nombreForm.value,
    email: emailForm.value,
    telefono: telefonoForm.value,
    direccion: {
      calle: calleForm.value,
      interior: interiorForm.value,
      colonia: coloniaForm.value,
      cp: cpForm.value
    }
  };
  console.log(obj);
  ref.child(uid).update(obj).then(function () {
    datosPerfil.style.display = 'block';
    formularioPerfil.style.display = 'none';
  });
}