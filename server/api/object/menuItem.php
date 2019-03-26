<?php 
  class MenuItem{
    private $pdo = null;
    private $query = null;
    public $error = "";

    function __construct() {
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

    function getMenuItemList($idMenu){
      $this->query = $this->pdo->prepare("
        SELECT * FROM `menu`
        INNER JOIN `menuItem`
        ON menu.id=menuItem.idMenu
        WHERE menu.id=?
      ");

      $cond = [$idMenu];
      $this->query->execute($cond);
      $menu = $this->query->fetchAll();
      return count($menu)==0 ? false : $menu;
    }

    // [ CREATE ]
    function create($name, $idMenu, $desc, $price, $vaha){
      return $this->query(
        "INSERT INTO `menuItem` (`name`, `idMenu`, `description`, `price`, `vaha`) VALUES (?,?,?,?,?)",
        [$name, $idMenu, $desc, $price, $vaha]
      );
    }

    // [ UPDATE ]
    function update($name, $desc, $price, $vaha, $id){
      $q = "UPDATE `menuItem` SET `name`=?, `description`=?, `price`=?, `vaha`=?";
      $cond = [$name, $desc, $price, $vaha];
      $q .= " WHERE `id`=?";
      $cond[] = $id;
      return $this->query($q, $cond);
    }


    // [ DELETE ]
    function delete($id){
      return $this->query(
        "DELETE FROM menuItem WHERE id=?",
        [$id]
      );
    }

  }
?>