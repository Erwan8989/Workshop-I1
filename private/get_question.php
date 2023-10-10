<?php

include 'bdd.php';

$get_question = new bdd();

return $get_question->getQuestions();