<?php  
header('Content-Type: text/xml');  
  
$feed = file_get_contents('http://feeds.feedburner.com/meetin_gs');  
  
echo $feed;  
  
?>