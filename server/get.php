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
        $splitURL = explode("/", $url);
        $cType = "";
        if (count($splitURL) < 3) return defaultResp();
        if (isset($splitURL[3])) $cType = contentType($splitURL[1], $splitURL[3]);
        else $cType = contentType($splitURL[1], $splitURL[2]);

        if (!$cType) return defaultResp();
        header("Content-Type: " . $cType);
        readfile(__DIR__ . "/.." . $url);
    }
}