<?php

require_once __DIR__ . "/methods.php";

function POST() {
    $url = $_SERVER["REQUEST_URI"];
    $input = json_decode(file_get_contents("php://input"), true);
    $contentType = $_SERVER["CONTENT_TYPE"] ?? null;

    if (!$contentType || $contentType !== "application/json") return sendResp(["error" => "Invalid Content-Type"], 400);

    switch ($url) {
        case "/sign-up":
            $username = $input["username"] ?? null;
            $pwd = $input["pwd"] ?? null;

            if (!$username || !$pwd) return sendResp(["error" => "Missing attributes"], 400);
            if (strlen($username) > 15) return sendResp(["error" => "Username too long, max 14 characters"], 400);
            //if (strlen($pwd) < 12) return sendResp(["error" => "Password too short, must be atleast 12 characters"], 400);

            $db = json_decode(file_get_contents(__DIR__ . "/../db/users.json"), true);
            $exists = array_find($db, fn($x) => $x["username"] === $username);
            if ($exists) return sendResp(["error" => "Username already exists"], 409);

            array_push($db, [
                "username" => $username,
                "pwd" => $pwd,
                "id" => uniqid()
            ]);
            file_put_contents(__DIR__ . "/../db/users.json", json_encode($db));
            return sendResp(["success" => "Account created! You may now log in"], 201);

        case "/log-in":
            $username = $input["username"] ?? null;
            $pwd = $input["pwd"] ?? null;

            if (!$username || !$pwd) return sendResp(["error" => "Missing attributes"], 400);

            $db = json_decode(file_get_contents(__DIR__ . "/../db/users.json"), true);
            $exists = array_find($db, fn($x) => $x["username"] === $username);

            if (!$exists) return sendResp(["error" => "No account found with provided username", 404]);
            if ($exists["pwd"] !== $pwd) return sendResp(["error" => "Incorrect password"], 400);

            return sendResp(["username" => $exists["username"], "id" => $exists["id"]], 200);
    }
}