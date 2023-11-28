<?php

require("./utils/function.php");


$pdo = connect();

$query = 'SELECT * FROM blogpage';

$stmt = $pdo->prepare($query);
$stmt->execute();
if ($stmt->rowCount() > 0) {
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  // echo json_encode($result);

  foreach ($result as $item) {
    echo  "
        <div class='col-lg-3 col-md-4 col-12' id='col'>
        <div class='card'>
          <img src='{$item['image']}' alt='BlogPage' class='card-img' height='300px'/>
          <div class='card-body'>
            <h5 class='card-title'>{$item['title']}</h5>
            <p class='card-text'>
            {$item['description']}
            </p>
          </div>
        </div>
      </div> ";
  }
}
