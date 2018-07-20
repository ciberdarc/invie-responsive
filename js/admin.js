var ref = firebase.database().ref("usuario")
var refGuitarras = firebase.database().ref("guitarras")

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var nombre = document.getElementById("nombre");
var descripcion = document.getElementById("descripcion");
var tipo = document.getElementById("tipo");
var precio = document.getElementById("precio");
var img = document.getElementById("img");


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
    // console.log(user);
  } else {
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
    window.location.href = "index.html";
  }
});

btnLogout.addEventListener("click", function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    btnLogin.innerHTML = "Iniciar sesión";
    btnLogout.innerHTML = "";

  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
});

function nuevaGuitarra() {
  event.preventDefault();
  console.log("nueva guitarra");
  var obj = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    tipo: tipo.value,
    precio: precio.value,
    img: img.value
  }
  // console.log(obj);
  if (obj.tipo == "normal") {
    console.log("normal");
    subirGuitarra(obj, "normal")
  } else if (obj.tipo == "vip") {
    console.log("vip");
    subirGuitarra(obj, "vip")
  } else {
    alert("El tipo debe ser normal o vip")
  }
}

function subirGuitarra(guitarra, tipo) {
  refGuitarras.child(tipo).push(guitarra)
}