<?php  
header('Content-Type: text/xml');  
  
$feed = file_get_contents('http://twitter.com/statuses/user_timeline/252745045.rss');  
  
echo $feed;  
  
?>