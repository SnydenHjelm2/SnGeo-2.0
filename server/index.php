<?php

require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/get.php";

$method = $_SERVER["REQUEST_METHOD"];

CORS($method);

echo $method();