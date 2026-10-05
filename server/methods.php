<?php

function contentType($type) {
    switch ($type) {
        case "styles":
            return "text/css";

        case "scripts":
            return "application/javascript";

        case "images":
            return "image/png";

        case "fonts":
            return "font/ttf";

        default:
            return "text/plain";
    }
}