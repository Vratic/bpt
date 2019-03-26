<?php 
  if (!isset($_SESSION)) {
    session_start();
  }

  header('Content-Type: application/json');
  header('Accept: application/json');

  require "../config/config.php";
  require "object/menu.php";

  $menu = new Menu();

  if ($_POST['req'] ) {
    switch ($_POST['req']) {
  // MENU CREATE
  // ---------------------------------------------------------------------------
    case "create":
      $menu = $menu->create($_POST['name']);
      echo json_encode([
        "status" => $menu,
        "message" => $menu ? "Menu Created" : "Error creating menu"
      ]);
      break;

  // MENU UPDATE
  // ---------------------------------------------------------------------------
    case "update":
      $menu = $menu->update($_POST['name'], $_POST['id']);
      echo json_encode([
        "status" => $menu,
        "message" => $menu ? "Menu Updated" : "Error updating menu"
      ]);
      break;

  // MENU DELETE
  // ---------------------------------------------------------------------------
    case "delete":
      $menu = $menu->delete($_POST['id']);
      echo json_encode([
        "status" => $menu,
        "message" => $menu ? "Menu Deleted" : "Error deleting menu"
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

  if ($_GET['req'] ) {
    switch ($_GET['req']) {
  // MENU LIST
  // ---------------------------------------------------------------------------
    case "menulist":
      $all = $menu->getMenuList();
      echo json_encode([
        "status" => $all==false?400:200,
        "data" => $all
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

?>