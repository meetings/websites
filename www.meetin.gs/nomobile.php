<?php
setcookie("nomobile", '1', time()+36000);  /* expire in 10 hour */
header('Location: http://meetin.gs');
?>