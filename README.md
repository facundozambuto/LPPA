# LENGUAJES DE PROGRAMACIÓN PARA LA ADMINISTRACIÓN 

Trabajo práctico "Mini Damas". 

Para acceder: https://facundozambuto.github.io/LPPA/TP1/index.html 📌

![Alt Text](https://media.giphy.com/media/kTHvm5ZApOvcAin3G4/giphy.gif)

## Consignas 📋

Continuar el proyecto desarrollado en el Trabajo Practico N1, agregandole las primeras reglas del juego de Damas. El objetivo de esta semana es poder seleccionar fichas por turno, es decir que se debe detectar el jugador actual, y solo se pueden seleccionar casilleros correspondientes al color de ficha de dicho jugador. No es necesario crear reglas de movimiento de fichas diagonales, solo turnos.

[UPDATE TP2]

Continuar el proyecto desarrollado en la Clase 11, agregandole jugabilidad a las Damas. El objetivo de esta semana es poder comer fichas del oponente, es decir que se debe detectar el jugador actual, la ficha seleccionada y los casilleros disponibles para mover dicha ficha o comer una ficha contigua. Cuanto el jugador termina su movimiento, se debe pasar el turno al siguiente jugador. No es necesario crear la habilidad de comer mas de una ficha a la vez, ni detectar si se ha ganado la partida.

El codigo HTML, CSS y JavaScript desarrollado debe ser subido a Github con sus commits correspondientes.

El repositorio debe ser el mismo que se utilizó para la Clase 09, actualizando el Readme y los cambios deben ser visibles utilizando Github Pages.

Esta semana se evaluará:

Correcta funcionalidad de JavaScript.
Correcto manejo de Eventos del navegador.
Responsividad del contenido, visible correctamente en celulares, tablets y monitores.
Cumplimiento de la consigna y los contenidos.
Contenido completo y prolijo del Readme.
Prolijidad del codigo realizado, tanto HTML, CSS como JS. Prestar atención a la indentacion, puntuacion, etc.
Correcto y frecuente uso de commits de Git.
Correcta visualizacion del sitio en Github Pages.
Colaboración con los compañeros de clase para mejorar los conocimientos y avanzar como grupo.


### Cambios subidos en la última release 🚀

Se modifican los archivos index.html, damas.js y styles.css a fin de cumplir con el requisito principal que es la "gestión de turnos". Al generar el tablero con la primera carga del sitio
se le asigna a cada celda negra del mismo sus coordenadas y el valor booleano true/false si esta posee una ficha. Se almacena en una variable del localStorage el turno que corresponde y
se va modificando cuando los jugadores juegan. 


[UPDATE TP3]

Se añade más jugabilidad. Se añade movimiento a las fichas y posibilidad de comer las fichas rivales. Además, se lleva el conteo de fichas comidas para definir el ganador.


[UPDATE TP4] Formulario de Contacto

Continuar el proyecto desarrollado en el TP3, agregando un formulario de contacto que debe contener los campos: 

- Nombre Completo
- Email
- Comentario

Agregar un botón al final del formulario que diga “enviar” y que al presionar se realice una consulta HTTP utilizando una API pública enviando los datos cargados en los campos del formulario (usar método Fetch de JS para la consulta/request). La url o API para hacer la consulta puede ser cualquiera, y no es necesario que devuelva una respuesta correcta.

El formulario de contacto debe visualizarse correctamente en cualquier dispositivo (diseño responsivo), y se recomienda hacerlo en una nueva página HTML, manteniendo la estética del juego de Damas.

### Cambios subidos en la última release 🚀

Se añaden los archivos formConctact.js, formularioContacto.html y formularioContacto.php.
Se cumplen con las consignas solicitadas. Se añaden validaciones del lado del cliente para los campos solicitados en las consignas (se validan los campos requeridos -todos- y que el email cumpla con el formato correspondiente). Se añade código necesario en el archivo style.css para el formulario y hacerlo responsive. Se utiliza Ajax y jQuery para realizar la llamada al servidor y algunas funciones con respecto al DOM. Se agrega un spinner para mostrar mientras se realiza la llamada al servidor y luego una vez terminada se oculta. Se intentó que el formulario envié realmente un correo a mi inbox personal con la consulta pero como el código PHP está alojado en un hosting personal (http://www.partypicapp.com) sin SSL, hay un MIX CONTENT ERROR en GitHub pages ya que la petición se quiere hacer desde un sitio con protocolo HTTPS hacia uno HTTP. Por esta razón, he creado un endpoint random que devuelve un 200 OK para simular dicha petición. Puede verse el código PHP para el envío de email.

![Alt Text](https://media.giphy.com/media/1yoEGwbWgKTseKVLxV/giphy.gif)


## A mejorar 🛠️

Para la próxima entrega trataré de refactorizar el código a fin de poder crear funciones y reutilizarlas pasando los parámetros necesarios con el objetivo de no repetir código.

## Integrantes ✒️

Facundo Zambuto
