<?php

require_once __DIR__ . "/methods.php";

function GET() {
    $url = $_SERVER["REQUEST_URI"];
    $parsedURL = parse_url($url, PHP_URL_PATH);

    switch ($parsedURL) {
        case "/":
            readfile(__DIR__ . "/../index.html");
            return;

        case "/key":
            header("Content-Type: application/json");
            return file_get_contents(__DIR__ . "/../api/key.json");

        case "/games":
            $user = $_GET["user"] ?? null;
            $db = json_decode(file_get_contents(__DIR__ . "/../db/games.json"), true);
            if (!$user) return sendResp($db, 200);

            $games = array_values(array_filter($db, fn($x) => $x["userId"] === $user));
            return sendResp($games, 200);

        default:
            $splitURL = explode("/", $url);

            switch ($splitURL[1]) {
                case "scripts":
                    header("Content-Type: application/javascript");
                    return readfile(__DIR__ . "/.." . $url);
                
                case "styles":
                    header("Content-Type: text/css");
                    return readfile(__DIR__ . "/.." . $url);
                
                case "images":
                    $split = explode(".", $url);
                    header("Content-Type: image/" . $split[1]);
                    return readfile(__DIR__ . "/.." . $url);
                
                case "fonts":
                    header("Content-Type: font/ttf");
                    return readfile(__DIR__ . "/.." . $url);
                
                case "components":
                    if (explode(".", $url)[1] === "js") header("Content-Type: application/javascript");
                    else header("Content-Type: text/css");
                    return readfile(__DIR__ . "/.." . $url);
                
                default:
                    return defaultResp();
            }
    }

    // if ($url === "/") {
    //     readfile(__DIR__ . "/../index.html");
    // } else if ($url === "/key") {
    //     header("Content-Type: application/json");
    //     return file_get_contents(__DIR__ . "/../api/key.json");
    // } else if ($url === "/games") {
    //     header("Content-Type: application/json");
    //     return file_get_contents(__DIR__ . "/../db/games.json");
    // } else {  
    //     $splitURL = explode("/", $url);
    //     $cType = "";
    //     if (count($splitURL) < 3) return defaultResp();
    //     if (isset($splitURL[3])) $cType = contentType($splitURL[1], $splitURL[3]);
    //     else $cType = contentType($splitURL[1], $splitURL[2]);

    //     if (!$cType) return defaultResp();
    //     header("Content-Type: " . $cType);
    //     readfile(__DIR__ . "/.." . $url);
    // }
}