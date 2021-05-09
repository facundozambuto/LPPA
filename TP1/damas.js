document.addEventListener('DOMContentLoaded', function(){ 
    //Renderiza el tablero
    for(i=0; i<8; i++) {
        for(j=0; j<8; j++) {
            var celda = document.createElement('DIV');
            celda.classList.add('celda');
            if ( ((i % 2) == 0 && (j % 2) == 0) || ((i % 2) == 1 && (j % 2) == 1)) {
                celda.classList.add('celdaBlanca');
            } else {
                celda.classList.add('celdaNegra');
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
    var addSelectedClass = function() {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
        } else {
            var elems = document.querySelectorAll(".ficha.roja");
            [].forEach.call(elems, function(el) {
                el.classList.remove("selected");
            });
            this.classList.add('selected');
        }
    };
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', addSelectedClass, false);
    }

    //Lógica para mostrar error al seleccionar ficha blanca
    var elements = document.getElementsByClassName("ficha blanca");
    var addSelectedClass = function() {
        if (this.classList.contains('errorSelected')) {
            this.classList.remove('errorSelected');
        } else {
            var elems = document.querySelectorAll(".ficha.blanca");
            [].forEach.call(elems, function(el) {
                el.classList.remove("errorSelected");
            });
            this.classList.add('errorSelected');
        }
    };
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', addSelectedClass, false);
    }
}, false);
