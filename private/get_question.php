<?php

include 'bdd.php';

header("Access-Control-Allow-Origin: https://harasstic.000webhostapp.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$get_question = new bdd();

$response = $get_question->getQuestions();

$ret = array(
    'code' => 200,
    'response' => $response,
    'time' => date('d-m-Y H:i:s'),
);

$ret = json_encode($ret);

header("Content-Type: text/html;charset=utf-8");
header('Content-Length: ' . strlen($ret));

echo $ret;