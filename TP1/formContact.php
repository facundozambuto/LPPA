<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

post_data($_POST);

function post_data($args)
{
  $email = $args['email'];
  $nombre = $args['nombre'];
  $comentario = $args['comentario'];

  $res = array();

  if($email == null || $nombre == null || $comentario == null)
  {
  	$res['success'] = false;
  }
  else
  {
	if(!filter_var($email, FILTER_VALIDATE_EMAIL))
   	{
		$res['success'] = false;
   	}
   	else
   	{
		$to = 'facundozambuto@gmail.com';
		$subject = "Nueva Consulta";
		$message = $mensaje . "\r\n  \r\n  <span style=\"color:red\"><b>E-mail:</b></span>" . $email . "\r\n  \r\n Teléfono: " . $telefono;

	    $message = '<html><body>';
	    $message .= '<img src="http://www.partypicok.com/images/IconoPartyPic.png" width="75" height="75" class="img-responsive">';
	    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
	    $message .= "<tr style='background: #eee;'><td><strong>Nombre:</strong> </td><td>" . $nombre ."</td></tr>";
	    $message .= "<tr><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
	    $message .= "<tr><td><strong>Consulta:</strong> </td><td>" . $comentario  . "</td></tr>";
	    $message .= "</table>";
        $message .= "</body></html>";
        
        $message = "asdasdas";


	    $headers = "From:" . $nombre . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
  	    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	    mail($to, utf8_decode($subject), utf8_decode($message), $headers);
	
	    $res['success'] = true;
	    $res['message'] = "Tu consulta ha sido enviada con éxito, en breve será respondida.";
   	}
  }

  echo json_encode($res);
}
