document.addEventListener('DOMContentLoaded', function() { 

    localStorage.setItem("turno", "jugadorUno");


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
                    document.getElementById('tableroDamas').appendChild(ficha);
                }

                    if (i == 0 || i == 1 || i == 2) {
                    var ficha = document.createElement('DIV');
                    ficha.classList.add('ficha');
                    ficha.classList.add('blanca');
                    ficha.style.setProperty("top", i == 0 ? '0px' : i * 60 + 'px');
                    ficha.style.setProperty("left", j * 60 + 'px');
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
                        alert('CAMBIO DE TURNO');
                        localStorage.setItem("turno", "jugadorDos");
                        targetElement.classList.remove('selected');
                        const jugadorUno = document.getElementById('jugadorUno');
                        const jugadorDos = document.getElementById('jugadorDos');
                        jugadorUno.style.display = 'none';
                        jugadorDos.style.display = 'block';
                    }
                }
            }
        } else if (localStorage.getItem('turno') === 'jugadorDos') {
            const targetElement = document.querySelector('.ficha.roja.selected');

            if (targetElement) {
                if (!this.classList.contains('roja') && !this.classList.contains('blanca')) {
                    if (this.attributes['ocupada'].value == 'false') {
                        alert('CAMBIO DE TURNO');
                        localStorage.setItem("turno", "jugadorUno");
                        targetElement.classList.remove('selected');
                        const jugadorUno = document.getElementById('jugadorUno');
                        const jugadorDos = document.getElementById('jugadorDos');
                        jugadorUno.style.display = 'block';
                        jugadorDos.style.display = 'none';
                    }
                }
            }
        }
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', validarCasilleroVacio, false);
    }


}, false);
