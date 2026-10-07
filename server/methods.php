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
            return "text/plain";
    }
}