<?php 

class User{
  private $pdo = null;
  private $query = null;
  public $error = "";

  function __construct(){
    try{
      $dsn= "mysql:host=".MYSQL_HOST.";dbname=".MYSQL_DB.";charset=".MYSQL_CHAR;
      $this->pdo = new PDO($dsn, MYSQL_USER, MYSQL_PASS,
      [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
      ]);
    }
    catch(Exception $ex){
      die($ex->getMessage());
    }
  }

  function __destruct(){
    if ($this->query!==null) { $this->query = null; }
    if ($this->pdo!==null) { $this->pdo = null; }
  }

  function query($sql, $cond=[]){
    try {
      $this->query = $this->pdo->prepare($sql);
      $this->query->execute($cond);
    } catch (Exception $ex) { 
      $this->error = $ex->getMessage();
      return false;
    }
    $this->query = null;
    return true;
  }

  function getAllUsers(){
    $this->query = $this->pdo->prepare("SELECT * FROM `users`");
    $this->query->execute();
    $users = $this->query->fetchAll();
    return count($users)==0 ? false : $users;
  }

  function create($username, $password){
    return $this->query(
      "INSERT INTO `users` (`name`, `password`) VALUES (?,?)",
      [$username,  password_hash($password, PASSWORD_BCRYPT)]
    );
  }

  function getUser($name){
    $this->stmt = $this->pdo->prepare("SELECT * FROM `users` WHERE `name`=?");
    $cond = [$name];
    $this->stmt->execute($cond);
    $user = $this->stmt->fetchAll();
    return count($user)==0 ? false : $user[0];
  }

  function login($name, $password){
    $user = $this->getUser($name);
    if ($user==false) { return false; }

    if (password_verify($password, $user['password'])){
      return $user;
    } else {
      return false;
    }
  }
}
?>