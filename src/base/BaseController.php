<?php

abstract class BaseController
{

    function getRequest()
    {
        try {
            // Capture JSON submit
            $rawData = file_get_contents('php://input');
            // Decode JSON data
            return json_decode($rawData, true);
        } catch (\Exception $ex) {
            throw new \Exception("Invalid Request format");
        }
    }

    function get($key)
    {
        try {
            // Capture JSON submit
            return $_GET[$key];
            // Decode JSON data
        } catch (\Exception $ex) {
            throw new \Exception("Invalid Request query {$key} is required");
        }
    }

    function setSuccessResponse(array|string $data)
    {
        header("HTTP/1.1 200 OK");
        header("Content-Type:application/json");
        return json_encode([
            "status" => "success",
            "data" => $data
        ]);
    }
    function setErrorResponse(string $data = "Error", $code = 500)
    {
        header("HTTP/1.1 $code $data");
        header("Content-Type:application/json");
        return json_encode([
            "status" => "error",
            "data" => $data
        ]);
    }
}
