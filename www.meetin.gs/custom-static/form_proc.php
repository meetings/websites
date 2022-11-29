<?php
if( isset($_POST['startup_name']) && $_POST['startup_name'] !== '' &&
    isset($_POST['email']) && $_POST['email'] !== '' &&
    isset($_POST['startup_desc']) && $_POST['startup_desc'] !== '' &&
    isset($_POST['name']) && $_POST['name'] !== '' &&
    isset($_POST['number']) && $_POST['number'] !== '' &&
    isset($_POST['www']) && $_POST['www'] !== '' ) {
        $promote = 'no';
        if(isset($_POST['ok_to_promote'])) $promote = 'ok';
        $headers = 'From: frontpage@meetin.gs'."\r\n".'Reply-To: '.$_POST['email']."\r\n";
        $message = 'Startup application:'
            . "\r\n\r\n Startup name: " . $_POST['startup_name']
            . "\r\n\r\n Website: " . $_POST['www']
            . "\r\n\r\n Description: " . $_POST['startup_desc']
            . "\r\n\r\n Name: " . $_POST['name']
            . "\r\n\r\n Email: " . $_POST['email']
            . "\r\n\r\n Number of employees: " . $_POST['number']
            . "\r\n\r\n Permission to promote: " . $promote;
        mail('startups@meetin.gs', 'Startup application', $message, $headers);
        echo 'ok';
    }
else{
    echo 'error';
}
?>
