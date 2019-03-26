<?php 
  if (!isset($_SESSION)) {
    session_start();
  }

  header('Content-Type: application/json');
  header('Accept: application/json');

  require "../config/config.php";
  require "object/menuItem.php";

  $menu = new MenuItem();

  if ($_POST['req'] ) {
    switch ($_POST['req']) {
  // MENU CREATE
  // ---------------------------------------------------------------------------
    case "create":
      $menu = $menu->create($_POST['name'], $_POST['idMenu'], $_POST['description'], $_POST['price'], $_POST['vaha']);
      echo json_encode([
        "status" => $menu,
        "message" => $menu ? "menuItem Created" : "Error creating menuItem"
      ]);
      break;

  // MENU UPDATE
  // ---------------------------------------------------------------------------
    case "update":
      $menu = $menu->update($_POST['name'], $_POST['description'], $_POST['price'], $_POST['vaha'], $_POST['id']);
      echo json_encode([
        "status" => $menu,
        "message" => $menu ? "menuItem Updated" : "Error updating menuItem"
      ]);
      break;

  // MENU DELETE
  // ---------------------------------------------------------------------------
    case "delete":
      $menu = $menu->delete($_POST['id']);
      echo json_encode([
        "status" => $menu,
        "message" => $menu ? "menuItem Deleted" : "Error deleting menuItem"
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

  // MENU ITEM LIST
  // ---------------------------------------------------------------------------
    case "menuitemlist":
      $all = $menu->getMenuItemList($_GET['idMenu']);
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