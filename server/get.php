<?php

require_once __DIR__ . "/methods.php";

function GET() {
    $url = $_SERVER["REQUEST_URI"];

    if ($url === "/") {
        readfile(__DIR__ . "/../index.html");
    } else if ($url === "/key") {
        header("Content-Type: application/json");
        return file_get_contents(__DIR__ . "/../api/key.json");
    } else {    
        $splitURL = explode("/", $url);
        header("Content-Type: " . contentType($splitURL[1]));
        readfile(__DIR__ . "/.." . $url);
    }
}