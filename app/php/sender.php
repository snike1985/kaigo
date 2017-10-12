<? header("content-type: text/html; charset=utf-8");

echo "<p> $value </p>";

$mail = "snike1985@gmail.com";
$subject= "Kaigo";
$header = "From: test <test@test.ua> \n";
$header .= "Content-type: text/html; charset=utf-8 \r\n";

$message = "<h2>Kaigo Plan $_POST[plan]</h2><hr>
                <p><strong>Date:</strong> ".date("Y-m-d H:i:s")."</p>
                <p><strong>Name:</strong> $_POST[firstName] $_POST[lastName]</p>
                <p><strong>E-mail:</strong> $_POST[email]</p>
                <p><strong>Password:</strong> $_POST[password]</p>
                <p><strong>Phone:</strong> $_POST[phone]</p>";

mail($mail, $subject, $message, $header);