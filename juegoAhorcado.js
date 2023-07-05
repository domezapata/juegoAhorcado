;(function() {
    'use strict'
    var palabras = [
        'ALURA', 'ORACLE', 'NINO', 'HOLA', 'LATAM', 'LINDO','JUEGO'
    ]
    palabras.push('NUEVA')
    var  juego = null
    var finalizado = false

    var juego = {
        palabra: 'ALURA',
        estado: 7,
        adivinar: ['A', 'L'],
        error: [ 'B', 'J',  'K', 'C']

    }
    var $html = {
    hombre: document.getElementById('hombre'),
    adivinar: document.querySelector('.adivinar'),
    error: document.querySelector('.error')
}
    function dibujar(juego) {
        var $elem
        $elem = $html.hombre

        var estado = juego.estado
        if (estado == 8) {
            estado = juego.previo

        }
        $elem.src = './img/0' + estado + '.png'

        var palabra = juego.palabra
        var adivinar = juego.adivinar
        $elem = $html.adivinar
        $elem.innerHTML = ''
        for (let letra of palabra) {
           let $span = document.createElement('span')
            let $txt = document.createTextNode('')
            if (adivinar.indexOf(letra) >= 0) {
                $txt.nodeValue = letra

            }
            $span.setAttribute('class', 'letra adivinada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
        var error = juego.error
        $elem = $html.error
        $elem.innerHTML= ''
        for (let letra of error) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode(letra)
            $span.setAttribute('class', ' letra error')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }


    function adivinar(juego, letra) {
        var estado = juego.estado
        if (estado == 1 || estado == 8) {
            return
        }
        var adivinado = juego.adivinar
        var error = juego.error
        if (adivinado.indexOf(letra) >= 0 ||
            error.indexOf(letra) >= 0) {

            }
            var palabra = juego.palabra
            if (palabra.indexOf(letra) >= 0){
                let ganado = true
                for(let l of palabra) {
                    if(adivinado.indexOf(l) < 0 && l != letra){
                        ganado = false
                        juego.previo = juego.estado
                        break

                    }

                }
                if (ganado){
                    juego.estado = 8
                }
                adivinado.push(letra)

            } else {
                juego.estado--
                error.push(letra)
            }
    }

   window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase()
    if(/[^A-ZÑ]/.test(letra)){
        return
    }
    adivinar(juego, letra)
    var estado = juego.estado
    if(estado == 8 && !finalizado){
        setTimeout(alertaGanado, 500)
        finalizado = true
    } else if (estado == 1 && !finalizado) {
        let palabra = juego.palabra
        let fn = alertaPerdido.bind(undefined, palabra)
        setTimeout(fn, 500)
        finalizado = true
       
    }
    dibujar(juego)
    
   }
   window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinar = []
    juego.error = []
    finalizado = false
    dibujar(juego)
    console.log(juego)
   }
   function palabraAleatoria() {
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
   }
   function alertaGanado() {
    alert('Felicidades ganaste')


   }
   function alertaPerdido () {
    alert('lo siento perdiste la palabra correcta es:' + juego.palabra)
    
   }
   nuevoJuego()
   
   
}()) 