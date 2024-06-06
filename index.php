<?php
session_start();
require 'vendor/autoload.php';
require 'src/bootstrap.php';

header("Access-Control-Allow-Origin: *"); // Replace with allowed domain
header("Access-Control-Allow-Methods: *"); // Allowed HTTP methods
header("Access-Control-Allow-Headers: *"); // Allowed headers

echo (new Bootstrap())->run();
