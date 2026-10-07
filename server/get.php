<?php

require_once __DIR__ . "/methods.php";

function GET() {
    $url = $_SERVER["REQUEST_URI"];

    if ($url === "/") {
        readfile(__DIR__ . "/../index.html");
    } else if ($url === "/key") {
        header("Content-Type: application/json");
        return file_get_contents(__DIR__ . "/../api/key.json");
    } else if ($url === "/gameTypes") {
        header("Content-Type: application/json");
        return file_get_contents(__DIR__ . "/../db/game-types.json");
    } else {
        //Gör om detta så att det finns en default response av 400 Bad Request    
        $splitURL = explode("/", $url);
        if (isset($splitURL[3])) header("Content-Type: " . contentType($splitURL[1], $splitURL[3]));
        else header("Content-Type: " . contentType($splitURL[1], $splitURL[2]));
        readfile(__DIR__ . "/.." . $url);
    }
}