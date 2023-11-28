<?php

echo "Hello";
require("./utils/function.php");

if (!$_SERVER["REQUEST_METHOD"] == "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["username"])) {
    sendResponse(false, "UserName is required");
}

if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}


$username = $_POST["username"];
$email = $_POST["email"];
$password = md5($_POST["password"]);

echo $username;
echo $email;
echo $password;

//Validate Name
if (!preg_match("/^[a-zA-Z_' ]*$/", $username)) {
    echo "Name must be alphabets only";
    exit;
}
// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email address.";
    exit;
}

// Validate password
if (empty($password)) {
    echo "Password is required ";
    exit;
}


$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}

try {
    $query = "INSERT INTO users(username,email, password) VALUES (:username, :email, :password)";

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);

    $stmt->bindParam(":password", $password, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Registered Successfully");

        // echo '<script>window.location.href="../login.html";</script>';
    }
} catch (PDOException $e) {
    sendResponse(false, "User registration failed");
    // echo '<script>window.location.href="login.php";</script>';
}
