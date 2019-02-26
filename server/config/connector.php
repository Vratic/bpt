<?php 
    session_start();
    require_once 'config.php';
    $dsn= "mysql:host=".MYSQL_HOST.";dbname=".MYSQL_DB;
    try{
        $conn = new PDO($dsn, MYSQL_USER, MYSQL_PASS);
        if($conn){
            echo "Connected to the <strong>".MYSQL_DB."</strong> database successfully!";
        }
    }catch (PDOException $e){
        echo $e->getMessage();
    }
?>