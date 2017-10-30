<?php 

header("Access-Control-Allow-Origin: *");

$consumer_key = 'y5pXybhFneoaBcD89I5InAftQ';
$consumer_secret = 'l7awHqwTaIL0Drd08mBoi17pCuXcL1uM6s0pb0aMscKh7rLmsV';
$access_token = '45729364-rYjhN5jnnFfPtTsJqFu920MKHkUbLg0qHI0C14hFd';
$access_token_secret = 'rZRRqhbCWW3hsOss3xQDAYSD8YckKKWJ2td0GZtiQr1eP';

require "twitteroauth/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

$connection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
$content = $connection->get("account/verify_credentials");

//get tweets
$statuses = $connection->get("search/tweets", ["q" => "%23sharepoint"]);
print_r(json_encode($statuses));

?>