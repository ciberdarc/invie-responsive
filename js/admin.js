var ref = firebase.database().ref("usuario")
var refGuitarras = firebase.database().ref("guitarras")

var nombre = document.getElementById("nombre");
var descripcion = document.getElementById("descripcion");
var tipo = document.getElementById("tipo");
var precio = document.getElementById("precio");
var img = document.getElementById("img");


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log(user);
  } else {
    window.location.href = "index.html";
  }
});


function nuevaGuitarra() {
  event.preventDefault();
  console.log("nueva guitarra");
  var obj = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    tipo: tipo.value,
    precio: precio.value,
  }
  // console.log(obj);
}