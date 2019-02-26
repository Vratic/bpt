<?php

session_start();
require "config.php";
require "lib.php";
$users = new User();

header('Content-Type: application/json');

if (isset($_POST['req'])) {
  switch ($_POST['req']) {
    default:
      echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
      ]);
      break;

    case "users":
      $all = $users->getAll();
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
        $all = $users->getAll();
        echo json_encode([
          "status" => $all==false?false:true,
          "data" => $all
        ]);
        break;
      }

      
    }

?>