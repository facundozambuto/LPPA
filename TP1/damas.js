document.addEventListener('DOMContentLoaded', function() {

    location.href = "#popupJugadores";

    //Renderiza el tablero
    for(i=0; i<8; i++) {
        for(j=0; j<8; j++) {
            var celda = document.createElement('DIV');
            celda.classList.add('celda');
            if ( ((i % 2) == 0 && (j % 2) == 0) || ((i % 2) == 1 && (j % 2) == 1)) {
                celda.classList.add('celdaBlanca');
            } else {
                celda.classList.add('celdaNegra');
                celda.setAttribute('fila', i*60);
                celda.setAttribute('columna', j*60);
                
                if ((i*60 === 180 && j*60 === 0) || (i*60 === 180 && j*60 === 120) || (i*60 === 180 && j*60 === 240) || (i*60 === 180 && j*60 === 360)
                    || (i*60 === 240 && j*60 === 60) || (i*60 === 240 && j*60 === 180) || (i*60 === 240 && j*60 === 300) || (i*60 === 240 && j*60 === 420)) {
                    celda.setAttribute('ocupada', false);
                } else {
                    celda.setAttribute('ocupada', true);
                }
                
            }
            document.getElementById('tableroDamas').appendChild(celda);
        }
    }

    //Renderiza las fichas
    for(i=0; i<8; i++) {
        for(j=0; j<8; j++) {
            if (((i % 2) == 0 && (j % 2) == 1) || ((i % 2) == 1 && (j % 2) == 0))  {
                if (i == 5 || i == 6 || i == 7) {
                    var ficha = document.createElement('DIV');
                    ficha.classList.add('ficha');
                    ficha.classList.add('roja');
                    ficha.style.setProperty("top", i * 60 + 'px');
                    ficha.style.setProperty("left", j == 0 ? 0 + 'px' : j * 60 +'px');
                    ficha.setAttribute('fila', i*60);
                    ficha.setAttribute('columna', j == 0 ? 0  : j * 60);
                    document.getElementById('tableroDamas').appendChild(ficha);
                }

                    if (i == 0 || i == 1 || i == 2) {
                    var ficha = document.createElement('DIV');
                    ficha.classList.add('ficha');
                    ficha.classList.add('blanca');
                    ficha.style.setProperty("top", i == 0 ? '0px' : i * 60 + 'px');
                    ficha.style.setProperty("left", j * 60 + 'px');
                    ficha.setAttribute('fila', i == 0 ? 0 : i * 60);
                    ficha.setAttribute('columna', j * 60);
                    document.getElementById('tableroDamas').appendChild(ficha);
                }
            }
        }
    }

    //Lógica para selección de ficha roja
    var elements = document.getElementsByClassName("ficha roja");
    var addSelectedRojaClass = function() {

        if (localStorage.getItem('turno') === 'jugadorUno') {

            const targetElement = document.querySelector('.selected');

            if (targetElement) {
                targetElement.classList.remove('selected');
            }

            if (this.classList.contains('errorSelected')) {
                this.classList.remove('errorSelected');
            } else {
                var elems = document.querySelectorAll(".ficha.roja");
                [].forEach.call(elems, function(el) {
                    el.classList.remove("errorSelected");
                });
                this.classList.add('errorSelected');
            }
        } else if (localStorage.getItem('turno') === 'jugadorDos') {

            const targetElement = document.querySelector('.errorSelected');

            if (targetElement) {
                targetElement.classList.remove('errorSelected');
            }

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                var elems = document.querySelectorAll(".ficha.roja");
                [].forEach.call(elems, function(el) {
                    el.classList.remove("selected");
                });
                this.classList.add('selected');
            }
        }
    };
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', addSelectedRojaClass, false);
    }

    //Lógica para mostrar error al seleccionar ficha blanca
    var elements = document.getElementsByClassName("ficha blanca");
    var addSelectedBlancaClass = function() {

        if (localStorage.getItem('turno') === 'jugadorUno') {

            const targetElement = document.querySelector('.errorSelected');

            if (targetElement) {
                targetElement.classList.remove('errorSelected');
            }

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                var elems = document.querySelectorAll(".ficha.blanca");
                [].forEach.call(elems, function(el) {
                    el.classList.remove("selected");
                });
                this.classList.add('selected');
            }
        } else if (localStorage.getItem('turno') === 'jugadorDos') {

            const targetElement = document.querySelector('.selected');

            if (targetElement) {
                targetElement.classList.remove('selected');
            }

            if (this.classList.contains('errorSelected')) {
                this.classList.remove('errorSelected');
            } else {
                var elems = document.querySelectorAll(".ficha.blanca");
                [].forEach.call(elems, function(el) {
                    el.classList.remove("errorSelected");
                });
                this.classList.add('errorSelected');
            }
        }
    };
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', addSelectedBlancaClass, false);
    }

    var elements = document.getElementsByClassName("celda");

    var validarCasilleroVacio = function() {

        if (localStorage.getItem('turno') === 'jugadorUno') {
            const targetElement = document.querySelector('.ficha.blanca.selected');

            if (targetElement) {
                if (!this.classList.contains('roja') && !this.classList.contains('blanca')) {
                    if (this.attributes['ocupada'].value == 'false') {
                        if (realizarMovimiento(parseInt(targetElement.attributes['fila'].value), 
                                            parseInt(targetElement.attributes['columna'].value), 
                                            parseInt(this.attributes['fila'].value), 
                                            parseInt(this.attributes['columna'].value), 
                                            'blanca')) {
                            localStorage.setItem("turno", "jugadorDos");
                            targetElement.classList.remove('selected');
                            const jugadorUno = document.getElementById('jugadorUno');
                            const jugadorDos = document.getElementById('jugadorDos');
                            jugadorUno.style.display = 'none';
                            jugadorDos.style.display = 'block';
                            
                            validarGanador();
                        }
                    }
                }
            }
        } else if (localStorage.getItem('turno') === 'jugadorDos') {
            const targetElement = document.querySelector('.ficha.roja.selected');

            if (targetElement) {
                if (!this.classList.contains('roja') && !this.classList.contains('blanca')) {
                    if (this.attributes['ocupada'].value == 'false') {
                        if (realizarMovimiento(parseInt(targetElement.attributes['fila'].value), 
                                            parseInt(targetElement.attributes['columna'].value), 
                                            parseInt(this.attributes['fila'].value), 
                                            parseInt(this.attributes['columna'].value), 
                                            'roja')) {
                            localStorage.setItem("turno", "jugadorUno");
                            targetElement.classList.remove('selected');
                            const jugadorUno = document.getElementById('jugadorUno');
                            const jugadorDos = document.getElementById('jugadorDos');
                            jugadorUno.style.display = 'block';
                            jugadorDos.style.display = 'none';

                            validarGanador();
                        }
                    }
                }
            }
        }
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', validarCasilleroVacio, false);
    }

    var btnJugadores = document.getElementById('btnJugadores');

    btnJugadores.addEventListener('click', validarJugadoresYComenzar, false);

}, false);

function realizarMovimiento(filaFicha, columnaFicha, filaCelda, columnaCelda, colorFicha) {
     if (esDeAvance(filaFicha, filaCelda, colorFicha)) {
        if (estaComiendo(columnaFicha, columnaCelda, filaFicha, filaCelda, colorFicha) || esValido(columnaFicha, columnaCelda)) {
            var ficha = document.querySelectorAll('div.ficha.' + colorFicha + '[columna=' + '"' + columnaFicha + '"' + '][fila=' + '"' + filaFicha + '"' + ']');
            celdaActual = document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFicha + '"' + '][fila=' + '"' + filaFicha + '"' + ']');
            celdaActual[0].attributes["ocupada"].value = false;
            celdaNueva = document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaCelda + '"' + '][fila=' + '"' + filaCelda + '"' + ']');
            celdaNueva[0].attributes["ocupada"].value = true;
            ficha[0].attributes["columna"].value = columnaCelda;
            ficha[0].attributes["fila"].value = filaCelda;
            ficha[0].style.setProperty("top", filaCelda + 'px');
            ficha[0].style.setProperty("left", columnaCelda + 'px');

            return true;
        }
        return false
    }
    return false;
}

function esDeAvance(filaFicha, filaCelda, colorFicha) {
    if (colorFicha === 'blanca') {
        if (filaCelda === (filaFicha + 60) || filaCelda === (filaFicha + 120)) {
            return true
        }
    } else if (colorFicha === 'roja') {
        if (filaCelda === (filaFicha - 60) || filaCelda === (filaFicha - 120)) {
            return true
        }
    }
    return false;
}

function esValido(columnaFicha, columnaCelda) {
    if (columnaFicha + 60 == columnaCelda || columnaFicha - 60 == columnaCelda) {
        return true;
    }
    return false;
}

function estaComiendo(columnaFicha, columnaCelda, filaFicha, filaCelda, colorFicha) {
    if (columnaFicha + 120 == columnaCelda || columnaFicha - 120 == columnaCelda) {
        var colorFichaRival = colorFicha === 'blanca' ? 'roja' : 'blanca';
        filaCelda = colorFicha === 'blanca' ? filaCelda - 60 : filaCelda + 60;
        
        columnaCelda = columnaFicha + 120 === columnaCelda ? columnaCelda - 60 : columnaCelda + 60;

        var ficha = document.querySelectorAll('div.ficha.' + colorFichaRival + '[columna=' + '"' + columnaCelda + '"' + '][fila=' + '"' + filaCelda + '"' + ']');

        if (ficha.length > 0) {
            celdaFichaComida = document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaCelda + '"' + '][fila=' + '"' + filaCelda + '"' + ']');
            celdaFichaComida[0].attributes["ocupada"].value = false;
            actualizarPosiciones(colorFicha)
            ficha[0].remove();

            return true;
        }
    }
    return false;
}

function actualizarPosiciones(colorFicha) {
    var tablero = JSON.parse(localStorage.getItem('tablaDePosiciones'));

    var nroJugador = colorFicha === 'blanca' ? 1 : 2;

    tablero.forEach(x => {
        if (x.jugador === nroJugador) {
            x.puntos = x.puntos + 1;
        }
    });

    localStorage.setItem("tablaDePosiciones", JSON.stringify(tablero));
}

function validarGanador() {
    var tablero = JSON.parse(localStorage.getItem('tablaDePosiciones'));

    tablero.forEach(x => {
        if (x.puntos === 12) {
            alert('GANADOR JUGADOR ' + x.jugador);
        }
    });
}

function validarJugadoresYComenzar() {
    if ($("#jugadorUnoForm").val() === '' || $("#jugadorUnoForm").val() === undefined || $("#jugadorUnoForm").val() === null ||
        $("#jugadorDosForm").val() === '' || $("#jugadorDosForm").val() === undefined || $("#jugadorDosForm").val() === null) {
        var mensajeError = document.getElementById('mensajeErrorJugadores');
        mensajeError.style.display = 'block';
    } else {
        var nombreJugadorUno = $("#jugadorUnoForm").val();
        var nombreJugadorDos = $("#jugadorDosForm").val();
        $("#turnoJugadorUno").html('TURNO DE ' + nombreJugadorUno);
        $("#turnoJugadorDos").html('TURNO DE ' + nombreJugadorDos);
        localStorage.setItem("turno", "jugadorUno");
        localStorage.setItem("tablaDePosiciones", JSON.stringify([{'jugador': 1, 'puntos': 0, 'nombreJugador': nombreJugadorUno}, {'jugador': 2, 'puntos': 0, 'nombreJugador':nombreJugadorDos}]));
        
        $("#popupJugadores").hide();
    }
}

function openPopupPartidas() {
    location.href = "#popupPartidas";
}

function cerrarPopupPartidas() {
    $("#popupPartidas").hide();
}

var dataSet = [
    [ "Alberto", 12, "Victoria", 8, "12/07/2021"],
    [ "Angélica", 7, "Ramón", 12, "12/07/2021"],
    [ "Raúl", 7, "Claudia", 12, "13/07/2021"],
    [ "Gustavo", 12, "Tomás", 12, "13/07/2021"],
    [ "Franco", 3, "Tobías", 12, "13/07/2021"],
    [ "Josefina", 7, "Valentina", 12, "19/07/2021"],
    [ "Matías", 9, "Liliana", 12, "22/07/2021"],
    [ "Clelia", 4, "Pablo", 12, "25/07/2021"],
    [ "Lautaro", 7, "Romina", 12, "25/07/2021"],
    [ "Julio", 12, "Nicolás", 10, "26/07/2021"],
    [ "Roberto", 5, "Simón", 12, "28/07/2021"],
    [ "Juan", 7, "Laura", 12, "30/07/2021"]
];
 
$(document).ready(function() {
    $('#tablaJugadores').DataTable({
        data: dataSet,
        columns: [
            { title: "Jugador 1" },
            { title: "Puntos J1" },
            { title: "Jugador 2" },
            { title: "Puntos J2." },
            { title: "Fecha" }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json' 
        }
    });
});