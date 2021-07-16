document.addEventListener('DOMContentLoaded', function() {
    $('#contactForm').on('submit', function (e) {
		$('#dimScreen').show();
		$('#spinner').show();
        if (!e.isDefaultPrevented()) {
            var url = "http://www.partypicapp.com/formContact.php";

            $.ajax({
                type: "POST",
                url: url,
                crossDomain: true,
                data: $('#contactForm').serialize(),
                success: function (data) {
                    var parsedResponse = JSON.parse(data);
                    
                    var messageText = parsedResponse.message;
                   
					$('#contactForm')[0].reset();
					
					$('#contentTextDiv').html(messageText);
					
					var currentUrl = location.href;
					location.href = "#popup1";
					history.replaceState(null,null,currentUrl);
					$('#dimScreen').hide();
					$('#spinner').hide();
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