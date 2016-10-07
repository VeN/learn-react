<?php

const DB_NAME = __DIR__ . '/comments.json';

$db = file_get_contents(DB_NAME);
$comments = json_decode($db);
$commentsString = null;

if ($_POST) {
    if (!array_key_exists('author', $_POST) || !array_key_exists('text', $_POST) ) {
        die();
    }
    $comments[] = ['id' => uniqid(), 'author' => $_POST['author'], 'text' => $_POST['text']];

    $commentsString = json_encode($comments);
    file_put_contents(DB_NAME, $commentsString);
}

header('Context-type: application/json');

$output = $commentsString ? $commentsString : $db;
die($output);
