<?php

function CORS($method) {
    header("Access-Control-Allow-Origin: http://localhost:8000");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-HEaders: Content-Type, Authorization");

    if ($method === "OPTIONS") {
        http_response_code(204);
        exit;
    }
}