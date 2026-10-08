<?php

function contentType($type, $file = null) {
    switch ($type) {
        case "styles":
            return "text/css";

        case "scripts":
            return "application/javascript";

        case "images":
            return "image/" . explode(".", $file)[1];

        case "fonts":
            return "font/ttf";

        case "components":
            if (explode(".", $file)[1] === "js") {
                return "application/javascript";
            } else {
                return "text/css";
            }

        default:
            return false;
    }
}

function defaultResp() {
    header("Content-Type: application/json");
    http_response_code(400);
    return json_encode(["error" => "Bad Request"]);
}