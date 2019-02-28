<?php
if (!isset($_SESSION)) {
  session_start();
}
require "../config/config.php";
// require "../../home/config.php";
require "object/user.php";
$users = new User();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Accept: application/json');

$rest_json = file_get_contents("php://input");
$rest = json_decode($rest_json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $rest['req'] ) {
  switch ($rest['req']) {

// USER LIST
// ---------------------------------------------------------------------------
    case "users":
      $all = $users->getAllUsers();
      echo json_encode([
        "status" => $all==false?400:200,
        "data" => $all
      ]);
      break;

// USER CREATE
// ---------------------------------------------------------------------------
    case "create":
        $pass = $users->create($rest['username'], $rest['password']);
        echo json_encode([
          "status" => $pass,
          "message" => $pass ? "User Created" : "Error creating user"
        ]);
        break;

// USER LOGIN
// ---------------------------------------------------------------------------
    case "login":
      $pass = $users->login($rest['username'], $rest['password']);
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

// USER LOGOUT
// ---------------------------------------------------------------------------
    case "logout":
      // $pass = $users->validate($rest['token']);
      // $passUPD = $users->updateToken(NULL, $pass['id']);
      echo json_encode([
        "status" => 200,
        "message" => "LOGOUT",
        // "validate" => $pass ? true : false
      ]);
      break;

// DEFAULT
// ---------------------------------------------------------------------------
    default:
      echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
      ]);
      break;
    }
  }
    

  // FOR TESTING
  // ---------------------------------------------------------------------------
  // if (isset($_GET['req'])) {
  //   switch ($_GET['req']) {
  //     default:
  //       echo json_encode([
  //         "status" => false,
  //         "message" => "Invalid Request"
  //       ]);
  //       break;
  
  //     case "users":
  //       $all = $users->getAllUsers();
  //       echo json_encode([
  //         "status" => $all==false?false:true,
  //         "data" => $all
  //       ]);
  //       break;
  //     }
  //   }
  // ---------------------------------------------------------------------------

?>