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

$rest_json = file_get_contents("php://input");
$rest = json_decode($rest_json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $rest['req'] ) {
  switch ($rest['req']) {

// USER LIST
// ---------------------------------------------------------------------------
    case "users":
      $all = $users->getAllUsers();
      echo json_encode([
        "status" => $all==false?false:true,
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
      echo json_encode([
        "status" => is_array($pass),
        "message" => is_array($pass) ? "LOGIN" : "Error"
      ]);
      break;

// USER LOGOUT
// ---------------------------------------------------------------------------
    case "logout":
      unset($_SESSION['user']);
      echo json_encode([
        "status" => true,
        "message" => "LOGOUT"
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