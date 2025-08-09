<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sanitize($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Methode nicht erlaubt.";
    exit;
}

// Formulardaten
$nom = sanitize($_POST['nom'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$telephone = sanitize($_POST['telephone'] ?? '');
$adresse = sanitize($_POST['adresse'] ?? '');
$codePostal = sanitize($_POST['codePostal'] ?? '');
$ville = sanitize($_POST['ville'] ?? '');
$montant = sanitize($_POST['montant'] ?? '');
$duree = sanitize($_POST['duree'] ?? '');
$typePret = sanitize($_POST['typePret'] ?? '');

// E-Mail-Validierung
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Ungültige E-Mail-Adresse.";
    exit;
}

// Inhalt der Admin-E-Mail
$message = '<h2>🚗 Neue Kreditanfrage:</h2>';
$message .= '<ul style="font-size:16px">';
$message .= '<li>💼 <strong>Kreditart:</strong> ' . $typePret . '</li>';
$message .= '<li>👤 <strong>Name:</strong> ' . $nom . '</li>';
$message .= '<li>✉️ <strong>E-Mail:</strong> ' . $email . '</li>';
$message .= '<li>📞 <strong>Telefon:</strong> ' . $telephone . '</li>';
$message .= '<li>🏠 <strong>Adresse:</strong> ' . $adresse . '</li>';
$message .= '<li>🏷️ <strong>Postleitzahl:</strong> ' . $codePostal . '</li>';
$message .= '<li>🏙️ <strong>Stadt:</strong> ' . $ville . '</li>';
$message .= '<li>💶 <strong>Betrag:</strong> ' . $montant . ' €</li>';
$message .= '<li>⏳ <strong>Laufzeit:</strong> ' . $duree . '</li>';
$message .= '</ul>';

// PHPMailer für Admin-E-Mail vorbereiten
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'support-contact@zofin.space';
    $mail->Password = 'Coris@2025';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('support-contact@zofin.space', 'Zofin - Kreditanfrage');
    $mail->addAddress('support-contact@zofin.space');
    $mail->addReplyTo($email, $nom);
    $mail->Sender = 'support-contact@zofin.space';

    $mail->isHTML(true);
    $mail->Subject = 'Neue Autokreditanfrage';
    $mail->Body = $message;

    // Anhangverarbeitung
    $allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    $maxFileSize = 5 * 1024 * 1024;

    if (!empty($_FILES['documents'])) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);

        foreach ($_FILES['documents']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['documents']['error'][$key] === UPLOAD_ERR_OK) {
                $fileType = $finfo->file($tmp_name);
                $fileSize = $_FILES['documents']['size'][$key];
                $fileName = $_FILES['documents']['name'][$key];

                if (in_array($fileType, $allowedTypes) && $fileSize <= $maxFileSize) {
                    $mail->addAttachment($tmp_name, $fileName);
                }
            }
        }
    }

    $mail->send();

    // Inhalt der Kundenbestätigungs-E-Mail
    $autoReplyHTML = <<<HTML
<html>
<body style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
  <div style="max-width: 600px; margin: auto;">
    <h2>✅ Ihre Kreditanfrage wurde erfolgreich registriert</h2>
    <p>Guten Tag <strong>{$nom}</strong>,</p>
    <p>Vielen Dank für Ihr Vertrauen.</p>
    <p>Wir haben Ihre Anfrage sowie die für die Bearbeitung erforderlichen Unterlagen erhalten.</p>

    <h3>📂 Nächster Schritt: Validierung und Bearbeitung Ihres Antrags</h3>
    <p>Damit unsere Analysten Ihre Anfrage bearbeiten können, wird eine einmalige Beteiligung von <strong>95 €</strong> benötigt.</p>
    <p>Dieser Beitrag ermöglicht:</p>
    <ul>
      <li>Überprüfung der Konformität Ihrer Nachweise</li>
      <li>Analyse Ihrer Kreditwürdigkeit und Eignung</li>
      <li>Beschleunigung Ihres Antrags in der Kommission</li>
    </ul>

    <p><strong>Möchten Sie fortfahren und zur Validierungsphase mit Zahlung übergehen?</strong></p>
    <p>Antworten Sie einfach auf diese E-Mail mit: <strong>"Ja, ich stimme zu"</strong></p>

    <p>Sobald wir Ihre Zustimmung erhalten haben, senden wir Ihnen sofort den Link für die sichere Zahlung.</p>

    <hr>
    <p style="font-size: 14px; color: #666;">
      Zofin Financement<br>
      contact@zofin.space – www.zofin.space<br>
      © 2025 Zofin – Alle Rechte vorbehalten
    </p>

    <p style="margin-top: 30px;">Mit freundlichen Grüßen,<br><strong>Das Zofin-Team</strong></p>
  </div>
</body>
</html>
HTML;

    // Bestätigungs-E-Mail an den Kunden
    $confirmation = new PHPMailer(true);
    $confirmation->isSMTP();
    $confirmation->Host = 'smtp.hostinger.com';
    $confirmation->SMTPAuth = true;
    $confirmation->Username = 'support-contact@zofin.space';
    $confirmation->Password = 'Coris@2025';
    $confirmation->SMTPSecure = 'tls';
    $confirmation->Port = 587;

    $confirmation->setFrom('support-contact@zofin.space', 'Zofin Financement');
    $confirmation->addAddress($email, $nom);
    $confirmation->addReplyTo('support-contact@zofin.space', 'Zofin Kundenservice');
    $confirmation->Sender = 'support-contact@zofin.space';

    $confirmation->isHTML(true);
    $confirmation->Subject = 'Bestätigung Ihrer Kreditanfrage';
    $confirmation->Body = $autoReplyHTML;
    $confirmation->AltBody = "Guten Tag $nom,\n\nVielen Dank für Ihre Anfrage. Wir haben sie erhalten.\nFür die Bearbeitung wird eine Beteiligung von 95 € benötigt.\nMöchten Sie fortfahren? Antworten Sie einfach mit: \"Ja, ich stimme zu.\"\n\nMit freundlichen Grüßen,\nDas Zofin-Team";

    $confirmation->addCustomHeader('X-Mailer', 'PHP/' . phpversion());
    $confirmation->addCustomHeader('List-Unsubscribe', '<mailto:support-contact@zofin.space>');

    $confirmation->send();

    http_response_code(200);
    echo "OK";

} catch (Exception $e) {
    error_log("PHPMailer-Fehler: " . $mail->ErrorInfo);
    http_response_code(500);
    echo "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
} 