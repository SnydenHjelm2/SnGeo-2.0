<?php

require_once __DIR__ . "/methods.php";

function POST() {
    $url = $_SERVER["REQUEST_URI"];
    $input = json_decode(file_get_contents("php://input"));
    $contentType = $_SERVER["CONTENT_TYPE"] ?? null;

    if (!$contentType || $contentType !== "application/json") return sendResp(["error" => "Invalid Content-Type"], 400);

    switch ($url) {
        case "/sign-up":
            $username = $input["username"] ?? null;
            $pwd = $input["pwd"] ?? null;

            if (!$username || !$pwd) return sendResp(["error" => "Missing attributes"], 400);
    }
}