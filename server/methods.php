<?php

function defaultResp() {
    header("Content-Type: application/json");
    http_response_code(400);
    return json_encode(["error" => "Bad Request"]);
}

function sendResp($resp, $code) {
    header("Content-Type: application/json");
    http_response_code($code);
    return json_encode($resp);
}