function realizarMovimiento(filaFicha, columnaFicha, filaCelda, columnaCelda, colorFicha) {
    var ficha = document.querySelectorAll('div.ficha.' + colorFicha + '[columna=' + '"' + columnaFicha + '"' + '][fila=' + '"' + filaFicha + '"' + ']');

    var esDama = ficha[0].attributes["esDama"].value === 'true';

    if (esDeAvance(filaFicha, filaCelda, colorFicha) || esDama) {
        if (estaComiendo(columnaFicha, columnaCelda, filaFicha, filaCelda, colorFicha, esDama) || esValido(columnaFicha, columnaCelda)) {
            actualizarFichaYCelda(columnaFicha, columnaCelda, filaFicha, filaCelda, colorFicha, ficha, esDama);
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

function estaComiendo(columnaFicha, columnaCelda, filaFicha, filaCelda, colorFicha, esDama) {
    if (columnaFicha + 120 == columnaCelda || columnaFicha - 120 == columnaCelda) {
        var colorFichaRival = colorFicha === 'blanca' ? 'roja' : 'blanca';

        if (colorFicha === 'blanca' && !esDama) {
            filaCelda = filaCelda - 60;
        }
        if (colorFicha === 'roja' && !esDama) {
            filaCelda = filaCelda + 60;
        }
        if (colorFicha === 'blanca' && esDama) {
            filaCelda = filaCelda + 60;
        }
        if (colorFicha === 'roja' && esDama) {
            filaCelda = filaCelda - 60;
        }

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

function actualizarFichaYCelda(columnaFicha, columnaCelda, filaFicha, filaCelda, colorFicha, ficha, esDama) {
    celdaActual = document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFicha + '"' + '][fila=' + '"' + filaFicha + '"' + ']');
    celdaActual[0].attributes["ocupada"].value = false;
    celdaNueva = document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaCelda + '"' + '][fila=' + '"' + filaCelda + '"' + ']');
    celdaNueva[0].attributes["ocupada"].value = true;
    ficha[0].attributes["columna"].value = columnaCelda;
    ficha[0].attributes["fila"].value = filaCelda;
    ficha[0].style.setProperty("top", filaCelda + 'px');
    ficha[0].style.setProperty("left", columnaCelda + 'px');

    if (alcanzaBordeEnemigo(colorFicha, filaCelda) && !esDama) {
        ficha[0].attributes["esDama"].value = true;
        if (colorFicha === 'roja') {
            ficha[0].classList.add('damaRoja');
        } else {
            ficha[0].classList.add('damaBlanca');
        }
    }
}

function alcanzaBordeEnemigo(colorFicha, filaCelda) {
    if (colorFicha === 'blanca' && filaCelda === 420) {
        return true;
    }

    if (colorFicha === 'roja' && filaCelda === 0) {
        return true;
    }
}

function actualizarTablaDePosiciones() {
    var tablero = JSON.parse(localStorage.getItem('tablaDePosiciones'));

    if (parseInt(tablero[0].puntos) === 0) {
        $("#puntosJugadorUno").text(tablero[0].nombreJugador + " Sin puntos aún.");
    } else if (parseInt(tablero[0].puntos) === 1){
        $("#puntosJugadorUno").text(tablero[0].nombreJugador + " " + tablero[0].puntos + " punto");
    } else {
        $("#puntosJugadorUno").text(tablero[0].nombreJugador + " " + tablero[0].puntos + " puntos");
    }
    
    if (parseInt(tablero[1].puntos) === 0) {
        $("#puntosJugadorDos").text(tablero[1].nombreJugador + " Sin puntos aún.");
    } else if (parseInt(tablero[1].puntos) === 1){
        $("#puntosJugadorDos").text(tablero[1].nombreJugador + " " + tablero[1].puntos + " punto");
    } else {
        $("#puntosJugadorDos").text(tablero[1].nombreJugador + " " + tablero[1].puntos + " puntos");
    }
}

function actualizarPosiciones(colorFicha) {
    var tablero = JSON.parse(localStorage.getItem('tablaDePosiciones'));

    var nroJugador = colorFicha === 'blanca' ? 1 : 2;

    tablero.forEach(x => {
        if (x.jugador === nroJugador) {
            x.puntos = x.puntos + 1;
        }
    });

    if (parseInt(tablero[0].puntos) === 0) {
        $("#puntosJugadorUno").text(tablero[0].nombreJugador + " Sin puntos aún.");
    } else if (parseInt(tablero[0].puntos) === 1){
        $("#puntosJugadorUno").text(tablero[0].nombreJugador + " " + tablero[0].puntos + " punto");
    } else {
        $("#puntosJugadorUno").text(tablero[0].nombreJugador + " " + tablero[0].puntos + " puntos");
    }
    
    if (parseInt(tablero[1].puntos) === 0) {
        $("#puntosJugadorDos").text(tablero[1].nombreJugador + " Sin puntos aún.");
    } else if (parseInt(tablero[1].puntos) === 1){
        $("#puntosJugadorDos").text(tablero[1].nombreJugador + " " + tablero[1].puntos + " punto");
    } else {
        $("#puntosJugadorDos").text(tablero[1].nombreJugador + " " + tablero[1].puntos + " puntos");
    }
    
    localStorage.setItem("tablaDePosiciones", JSON.stringify(tablero));
}

function validarGanador() {
    if ($(".ficha.blanca").length === 1 && $(".ficha.roja").length === 1) {
        declararEmpate();
    }

    var partidasFinalizadas = JSON.parse(localStorage.getItem('partidasFinalizadas'));
    var tablaDePosiciones = JSON.parse(localStorage.getItem('tablaDePosiciones'));

    if ($(".ficha.blanca").length === 0 || $(".ficha.roja").length === 0) {
        partidasFinalizadas.push(
            [
                tablaDePosiciones[0].nombreJugador,
                tablaDePosiciones[0].puntos,
                tablaDePosiciones[1].nombreJugador,
                tablaDePosiciones[1].puntos,
                new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
            ]
        );

        if ($(".ficha.blanca").length === 0) {
            alert("¡" + tablaDePosiciones[1].nombreJugador + " ha sido el ganador!")
        } else {
            alert("¡" + tablaDePosiciones[0].nombreJugador + " ha sido el ganador!")
        }
    }
}

function declararEmpate () {
    alert("No hay más movimientos posibles. La partida ha quedado empatada.")
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
        $("#puntosJugadorUno").text(nombreJugadorUno + " Sin puntos aún.");
        $("#puntosJugadorDos").text(nombreJugadorDos + " Sin puntos aún.");
        localStorage.setItem("turno", "jugadorUno");
        localStorage.setItem("tablaDePosiciones", JSON.stringify([{'jugador': 1, 'puntos': 0, 'nombreJugador': nombreJugadorUno}, {'jugador': 2, 'puntos': 0, 'nombreJugador':nombreJugadorDos}]));
        localStorage.setItem("idPartida", generarIdRandom(5));

        $("#popupJugadores").hide();
    }
}

function openPopupPartidasGuardadas(isNewGameFormBtn) {

    if (isNewGameFormBtn) {
        localStorage.setItem('isNewGameFormBtn', true);
    } else {
        localStorage.setItem('isNewGameFormBtn', false);
    }

    location.href = "#popupPartidasGuardadas";
    actualizarTablaPartidasGuardadas();
    $("#popupPartidasGuardadas").show();
}

function cerrarPopupPartidasGuardadas() {
    $("#divSinPartidasGuardadas").hide();
    $("#popupPartidasGuardadas").hide();
    
    if (localStorage.getItem('isNewGameFormBtn') === 'true') {
        localStorage.setItem('isNewGameFormBtn', false);
        window.location.reload();
    }
}

function openPopupPartidas() {
    location.href = "#popupPartidas";
    $("#popupPartidas").show();
}

function cerrarPopupPartidas() {
    $("#popupPartidas").hide();
}

function actualizarTablaPartidasGuardadas() {
    var dataSet = [];

    var partidasGuardadas = JSON.parse(localStorage.getItem('partidasGuardadas'));

    if (!partidasGuardadas || !(partidasGuardadas.length > 0)) {
        $("#divSinPartidasGuardadas").show();
    } else {

        partidasGuardadas.forEach(partida => {
            var tablero = JSON.parse(partida.tablaDePosiciones);
            dataSet.push([
                partida.idPartida,
                tablero[0].nombreJugador,
                tablero[0].puntos,
                tablero[1].nombreJugador,
                tablero[1].puntos,
                partida.turno
            ]);
        });

        var tablaPartidasGuardadas = $('#tablaPartidasGuardadas').DataTable({
            data: dataSet,
            destroy: true,
            responsive: true,
            "scrollX": true,
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": "<button>Cargar Partida</button>"
            } ],
            columns: [
                { title: "# ID Partida" },
                { title: "Jugador 1" },
                { title: "Puntos J1" },
                { title: "Jugador 2" },
                { title: "Puntos J2." },
                { title: "Turno" }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json' 
            }
        });

        $('#tablaPartidasGuardadas tbody').on( 'click', 'button', function () {
            var idPartida = $(this).parents('tr')[0].children[0].innerText;
            cargarPartida(idPartida);
        });
    }
}

function cargarPartida(idPartida) {
    $("#divSinPartidasGuardadas").hide();
    $("#popupPartidasGuardadas").hide();
    $("#tableroDamas").empty();

    var partidasGuardadas = JSON.parse(localStorage.getItem('partidasGuardadas'));

    var index = partidasGuardadas.findIndex(partida => partida.idPartida === idPartida);

    if (index !== -1) {
        localStorage.setItem('idPartida', idPartida);
        localStorage.setItem('turno', partidasGuardadas[index].turno);
        localStorage.setItem('tablaDePosiciones', partidasGuardadas[index].tablaDePosiciones);
        $("#tableroDamas").html(partidasGuardadas[index].tablero);
        agregarListeners();
        actualizarTablaDePosiciones();
        actualizarTurno();
    }
}

function guardarPartida() {
    var partidasGuardadas = JSON.parse(localStorage.getItem('partidasGuardadas'));

    if (!partidasGuardadas || !(partidasGuardadas.length > 0)) {
        partidasGuardadas = [];
    }

    var idPartida = localStorage.getItem('idPartida');

    var index = partidasGuardadas.findIndex(partida => partida.idPartida === idPartida);
    if (index === -1) {
        partidasGuardadas.push(
            {
                idPartida: localStorage.getItem('idPartida'),
                turno: localStorage.getItem('turno'),
                tablaDePosiciones: localStorage.getItem('tablaDePosiciones'),
                tablero: $('#tableroDamas').html()
            }
        );
    } else {
        partidasGuardadas[index] = {
            idPartida: localStorage.getItem('idPartida'),
            turno: localStorage.getItem('turno'),
            tablaDePosiciones: localStorage.getItem('tablaDePosiciones'),
            tablero: $('#tableroDamas').html()
        };
    }

    localStorage.setItem('partidasGuardadas', JSON.stringify(partidasGuardadas));
    alert('Partida guardada con éxito');
}

function agregarListeners() {
    agregarListenerBlancas();
    agregarListenerRojas();
    agregarListenerCasilleroVacio();
}

function agregarListenerBlancas() {
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
}

function agregarListenerRojas() {
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
}

function agregarListenerCasilleroVacio() {
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
                            $("#puntosJugadorUno").removeClass("colorTurno");
                            $("#puntosJugadorDos").addClass("colorTurno");
                            jugadorUno.style.display = 'none';
                            jugadorDos.style.display = 'block';
                            
                            if (hayDisponibilidadDeMovimientos()) {
                                validarGanador();
                            } else {
                                declararEmpate();
                            }
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
                            $("#puntosJugadorUno").addClass("colorTurno");
                            $("#puntosJugadorDos").removeClass("colorTurno");
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
}

function renderizarTablero() {
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
}

function rendirizarFichas() {
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
                    ficha.setAttribute('esDama', false);
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
                    ficha.setAttribute('esDama', false);
                    document.getElementById('tableroDamas').appendChild(ficha);
                }
            }
        }
    }
}

function actualizarTurno() {
    $("#turnoJugadorUno").html('TURNO DE ' + JSON.parse(localStorage.getItem('tablaDePosiciones'))[0].nombreJugador);
    $("#turnoJugadorDos").html('TURNO DE ' + JSON.parse(localStorage.getItem('tablaDePosiciones'))[1].nombreJugador);

    if (localStorage.getItem('turno') === 'jugadorUno') {
        $("#jugadorUno").show();
        $("#jugadorDos").hide();
        $("#puntosJugadorUno").addClass("colorTurno");
        $("#puntosJugadorDos").removeClass("colorTurno");
    }

    if (localStorage.getItem('turno') === 'jugadorDos') {
        $("#jugadorUno").hide();
        $("#jugadorDos").show();
        $("#puntosJugadorUno").addClass("colorTurno");
        $("#puntosJugadorDos").removeClass("colorTurno");
    }
}

function hayDisponibilidadDeMovimientos() {
    var hayDisponibilidad = false;
    $(".ficha").each(function() {
        if ($(this).hasClass('blanca') && !$(this).hasClass('damaBlanca')) {
            var columnaFichaIzq = parseInt($(this).attr('columna')) - 60;
            var columnaFichaDer = parseInt($(this).attr('columna')) + 60;
            var filaFicha = parseInt($(this).attr('fila')) + 60;

            if (document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaDer + '"' + '][fila=' + '"' + filaFicha + '"' + '][ocupada="false"]').length > 0
             || document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaIzq + '"' + '][fila=' + '"' + filaFicha + '"' + '][ocupada="false"]').length > 0) {
                hayDisponibilidad = true;
                return false;
            }
        }

        if ($(this).hasClass('roja') && !$(this).hasClass('dameRoja')) {
            var columnaFichaIzq = parseInt($(this).attr('columna')) - 60;
            var columnaFichaDer = parseInt($(this).attr('columna')) + 60;
            var filaFicha = parseInt($(this).attr('fila')) - 60;

            if (document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaDer + '"' + '][fila=' + '"' + filaFicha + '"' + '][ocupada="false"]').length > 0
             || document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaIzq + '"' + '][fila=' + '"' + filaFicha + '"' + '][ocupada="false"]').length > 0) {
                hayDisponibilidad = true;
                return false;
            }
        }

        if ($(this).hasClass('blanca') && $(this).hasClass('damaBlanca') || $(this).hasClass('roja') && $(this).hasClass('damaRoja')) {
            var columnaFichaIzq = parseInt($(this).attr('columna')) - 60;
            var columnaFichaDer = parseInt($(this).attr('columna')) + 60;
            var filaFichaAbajo = parseInt($(this).attr('fila')) + 60;
            var filaFichaArriba = parseInt($(this).attr('fila')) - 60;

            if (document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaDer + '"' + '][fila=' + '"' + filaFichaAbajo + '"' + '][ocupada="false"]').length > 0
             || document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaDer + '"' + '][fila=' + '"' + filaFichaArriba + '"' + '][ocupada="false"]').length > 0
             || document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaIzq + '"' + '][fila=' + '"' + filaFichaAbajo + '"' + '][ocupada="false"]').length > 0
             || document.querySelectorAll('div.celda.celdaNegra' + '[columna=' + '"' + columnaFichaIzq + '"' + '][fila=' + '"' + filaFichaArriba + '"' + '][ocupada="false"]').length > 0) {
                hayDisponibilidad = true;
                return false;
            }
        }
    });
    
    if (hayDisponibilidad) {
        return true;
    } else {
        return false;
    }
}

function generarIdRandom(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i<length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function cargarPartidasFinalizadas() {
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

    localStorage.setItem('partidasFinalizadas', JSON.stringify(dataSet));
 
    $('#tablaJugadores').DataTable({
        data: dataSet,
        responsive: true,
        "scrollX": true,
        destroy: true,
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
}

$(document).ready(function() {
    location.href = "#popupJugadores";
    renderizarTablero();
    rendirizarFichas();
    agregarListeners();
    var btnJugadores = document.getElementById('btnJugadores');
    btnJugadores.addEventListener('click', validarJugadoresYComenzar, false);
    cargarPartidasFinalizadas();
    actualizarTablaPartidasGuardadas();
});