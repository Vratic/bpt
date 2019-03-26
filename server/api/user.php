<?php
session_start();
require "../config/config.php";
// require "../../home/config.php";
require "object/user.php";
$users = new User();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Accept: application/json');

if (isset($_POST['req'])) {

  switch ($_POST['req']) {
    // USER LIST
    // ---------------------------------------------------------------------------
    case "users":
      $all = $users->getAllUsers();
      echo json_encode([
        "status" => $all==false?false:true,
        "data" => $all
      ]);
      break;
    
    // USER LOGIN
    // ---------------------------------------------------------------------------
    case "login":
      $pass = $users->login($_POST['username'], $_POST['password']);
      if ($pass['token'] === NULL) {
        $token = bin2hex(random_bytes(RANDOM));
        $passUPD = $users->updateToken($token, $pass['id']);

        echo json_encode([
          "status" => is_array($pass) ? 200 : 400,
          "message" => is_array($pass) ? "LOGIN" : "Error",
          "token" => (is_array($pass) && $passUPD) ? $token : NULL
        ]);

      } else {
        echo json_encode([
          "status" => 404,
          "message" => "User is login...",
          "token" => $pass['token']
        ]);
      }
      
      break;

    // LOGOUT
    // ---------------------------------------------------------------------------
    case "logout":
      $pass = $users->validate($_POST['token']);
      $passUPD = $users->updateToken(NULL, $pass['id']);
      echo json_encode([
        "status" => 200,
        "message" => "LOGOUT",
        "validate" => $pass ? true : false
      ]);
      break;

    // DEFAULT
    // ---------------------------------------------------------------------------
    default:
      echo json_encode([
        "status" => 500,
        "message" => "Invalid Request"
      ]);
      break;
    

  }
}

// ---------------------------------------------------------------------------
// $rest_json = file_get_contents("php://input");
// $rest = json_decode($rest_json, true);
// if ($_SERVER['REQUEST_METHOD'] === 'POST' && $rest['req'] ) {
//    switch ($rest['req']) {
  // ---------------------------------------------------------------------------

?>