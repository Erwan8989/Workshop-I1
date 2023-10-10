<?php

include 'bdd.php';

$get_question = new bdd();

$response = $get_question->getQuestions();

$ret = array(
    'code' => 200,
    'response' => $response,
    'time' => date('d-m-Y H:i:s'),
);

$ret = json_encode($ret);
$ret = base64_encode($ret);

header("Content-Type: text/html;charset=utf-8");
header('Content-Length: '.strlen($ret) ); 

echo $ret;