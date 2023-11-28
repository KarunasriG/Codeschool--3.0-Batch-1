<?php

require("./utils/function.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $title = $_POST['title'];
    $description = $_POST['description'];
    $image = $_POST['image'];

    echo $description;
    echo $title;

    $pdo = connect();
    $query = "INSERT INTO blogpage (title,description,image) VALUES(:title,:description,:image)";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":title", $title, PDO::PARAM_STR);
    $stmt->bindParam(":description", $description, PDO::PARAM_STR);
    $stmt->bindParam(":image", $image, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "success created blog";
    } else {
        echo "failed to create blog";
    }
} else {
    echo "Invalid Request";
}
