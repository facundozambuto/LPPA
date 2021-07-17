document.addEventListener('DOMContentLoaded', function() {
    $('#contactForm').on('submit', function (e) {
		$('#dimScreen').show();
		$('#spinner').show();
        if (!e.isDefaultPrevented()) {
            var url = "https://60f35eed6d44f30017788935.mockapi.io/contacto";

            $.ajax({
                type: "POST",
                url: url,
                crossDomain: true,
                data: $('#contactForm').serialize(),
                success: function (data) {
                    responseHandler(data, true);
                },
                error: function(xhr,status,error) {
                    responseHandler(error, false);
                }
            });
            return false;
        }
    });
	
	var counter = 0;
	setInterval(function() {
		var frames=19; var frameWidth = 30;
		var offset=counter * -frameWidth;
		document.getElementById("spinner").style.backgroundPosition=
			 0 + "px" + " " + offset + "px";
		counter++; if (counter>=frames) counter =0;
	}, 60);
});

function responseHandler(data, isSuccess) {
    var messageText = isSuccess ? "Su consulta ha sido enviada con éxito, en breve será respondida." : "Ha ocurrido un error, comuníquese con el administrador."
    $('#contactForm')[0].reset();
    $('#contentTextDiv').html(messageText);
    var currentUrl = location.href;
    location.href = "#popup1";
    history.replaceState(null,null,currentUrl);
    $('#dimScreen').hide();
    $('#spinner').hide();
}