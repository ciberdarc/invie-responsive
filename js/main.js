var consulta = window.matchMedia('(max-width: 500px)')
consulta.addListener(mediaQuery)

var $burgerButton = document.getElementById('burger-button')
var $menu = document.getElementById('menu')

function toggleMenu () {
  $menu.classList.toggle('active')
  $burgerButton.classList.toggle('icon-close')
}

function mediaQuery () {
  if (consulta.matches) {
    console.log('si')
    window.onload = function () {
      $burgerButton.addEventListener('touchstart', toggleMenu)
    }
  } else {
    console.log('no')
    $burgerButton.removeEventListener('touchstart', toggleMenu)
  }
}
mediaQuery()
