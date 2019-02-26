<?php

session_start();
require "../config/config.php";
// require "../../home/config.php";
require "object/user.php";
$users = new User();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
// header('Accept: application/json');

if (isset($_POST['req'])) {
  switch ($_POST['req']) {
    default:
      echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
      ]);
      break;

    case "users":
      $all = $users->getAllUsers();
      echo json_encode([
        "status" => $all==false?false:true,
        "data" => $all
      ]);
      break;

    case "create":
        $pass = $users->create($_POST['username'], $_POST['password']);
        echo json_encode([
          "status" => $pass,
          "message" => $pass ? "User Created" : "Error creating user"
        ]);
        break;
    

    case "login":
      if (is_array($_SESSION['user'])) {
        die(json_encode([
          "status" => true,
          "message" => "Already signed in",
          "user" => $_SESSION['user']['name']
        ]));
      }
      $pass = $users->login($_POST['username'], $_POST['password']);
      if ($pass!==false) { $_SESSION['user'] = $pass; }
      echo json_encode([
        "status" => is_array($pass),
        "message" => is_array($pass) ? "LOGIN" : "Error"
      ]);
      break;

    case "logout":
      unset($_SESSION['user']);
      echo json_encode([
        "status" => true,
        "message" => "LOGOUT"
      ]);
      break;
    }
  }
    

  if (isset($_GET['req'])) {
    switch ($_GET['req']) {
      default:
        echo json_encode([
          "status" => false,
          "message" => "Invalid Request"
        ]);
        break;
  
      case "users":
        $all = $users->getAllUsers();
        echo json_encode([
          "status" => $all==false?false:true,
          "data" => $all
        ]);
        break;
      }

      
    }

?>