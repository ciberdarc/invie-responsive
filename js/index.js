var ref = firebase.database().ref("usuario");
var refGuitarras = firebase.database().ref("guitarras")
var imgref = firebase.storage().ref()

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var usuario = {};

// refImg.child("invie-classic.png").getDownloadURL().then(function (url) {
//   console.log(url);

// })

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
  } else {
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
  }
});

btnLogin.addEventListener("click", function () {
  event.preventDefault();
  // var provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('public_profile');
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  firebase.auth().signInWithPopup(provider).then(function (datosusuario) {
    btnLogout.innerHTML = "Cerrar sesión";
    usuario = {
      nombre: datosusuario.user.displayName,
      email: datosusuario.user.email,
      uid: datosusuario.user.uid
    };
    agregarUsuario(usuario, usuario.uid);
  }).catch(function (error) {
    console.log("error");
  });
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

function agregarUsuario(usuario, uid) {
  ref.child(uid).update(usuario);
}

function leerGuitarras() {
  refGuitarras.child('vip').on('child_added', (datos) => {
    console.log('vip', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContent')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
      contenedorElementos.firsChild
    )
  })
}

function leerGuitarrasVip() {
  refGuitarras.child('normal').on('child_added', (datos) => {
    console.log('normales', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContentVip')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
      contenedorElementos.firstChild
    )
  })
}

function crearElementoGuitarra(key, nombre, precio, descripcion, img) {
  const uid = firebase.auth().currentUser.uid

  const html =
    '<article class="guitarra contenedor">' +
    '<img class="derecha b-lazy" src="" alt="Guitarra Invie Acustica" width="350"/>' +
    '<div class="contenedor-guitarra-a">' +
    '<h3 class="title-b"></h3>' +
    '<ol>' +
    '<li class="precio-b"></li>' +
    '<li class="descripcion-b"></li>' +
    '</ol>' +
    '</div>' +
    '<button type="button" onclick="comprar(' + '`' + key + '`' + ')">Comprar</button>' +
    '</article>'

  // Create the DOM element from the HTML
  const div = document.getElementById('div')
  div.innerHTML = html

  const guitarElement = div.firstChild
  var imgURL = ""
  imgref.child(img).getDownloadURL().then((url) => {
    imgURL = url
  }).then(() => {
    guitarElement.getElementsByClassName('title-b')[0].innerText = nombre
    guitarElement.getElementsByClassName('precio-b')[0].innerText = precio
    guitarElement.getElementsByClassName('descripcion-b')[0].innerText = descripcion
    guitarElement.getElementsByClassName('derecha')[0].src = imgURL
  })
  return guitarElement
}

// function IngresoGoogle() {
//   if (!firebase.auth().currentUser) {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
//     firebase.auth().signInWithPopup(provider).then(function (result) {
//       var token = result.credential.accesstoken
//       var user = result.user
//       var name = result.user.displayName

//     }).catch(function (error) {
//       var errorCode = error.code
//       var errorMessage = error.message
//       var errormail = error.mail
//       var credential = error.credential
//       if (errorCode === 'auth/account-exists-with-different-credential') {
//         alert('Es el mismo usuario')
//       }
//     })
//   } else {
//     firebase.auth().signOut()
//   }
// }

// document.getElementById('btn-google').addEventListener('click', IngresoGoogle, false)

leerGuitarras()
leerGuitarrasVip()