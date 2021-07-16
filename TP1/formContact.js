document.addEventListener('DOMContentLoaded', function() { 
    $('#contactForm').on('submit', function (e) {
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

                    var closeBtn = $('<a href="#" data-rel="back" class="ui-btn-right ui-btn ui-btn-b ui-corner-all ui-btn-icon-notext ui-icon-delete ui-shadow">Close</a>');

                    var content = "<p>" + messageText + "</p>";

                    var popup = $("<div/>", {
                        "data-role": "popup"
                    }).css({
                        width: $(window).width() / 2.5 + "px",
                        padding: 5 + "px"
                    }).append(closeBtn).append(content);
            
                    $.mobile.pageContainer.append(popup);

                    $("[data-role=popup]").popup({
                        dismissible: false,
                        history: false,
                        theme: "b",
                        positionTo: "window",
                        overlayTheme: "b",
                        transition: "pop",
                        beforeposition: function () {
                            $.mobile.pageContainer.pagecontainer("getActivePage")
                                .addClass("blur-filter");
                        },
                        afterclose: function () {
                            $(this).remove();
                            $(".blur-filter").removeClass("blur-filter");
                        }
                    }).popup("open");
                }
            });
            return false;
        }
    });
});