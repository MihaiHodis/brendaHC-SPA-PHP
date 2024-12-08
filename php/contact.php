<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include fișierele PHPMailer
require __DIR__ . '/includes/PHPMailer.php';
require __DIR__ . '/includes/SMTP.php';
require __DIR__ . '/includes/Exception.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    if (!preg_match('/^[0-9]{10}$/', $phone)) {
        echo "Număr de telefon invalid!";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mihaihodis98@gmail.com';
        $mail->Password = 'nhfedaibwfpoyztx';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('mihaihodis98@gmail.com', 'BrendaHC');
        $mail->addAddress('mihaihodis98@gmail.com');
        $mail->Subject = "Mesaj de la $name";
        $mail->Body = "Nume: $name\nEmail: $email\nNumăr de telefon: $phone\n\nMesaj:\n$message";

        $mail->send();
        echo "Mesaj trimis cu succes!";
    } catch (Exception $e) {
        echo "Eroare la trimiterea mesajului: {$mail->ErrorInfo}";
    }
} else {
    echo "Cerere invalidă.";
}
?>
