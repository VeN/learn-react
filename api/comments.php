<?php

$data = [
    [
        'id' => 1,
        'author' => "John Snow",
        'text' => "Upon being guided into the inner-sanctum at the Oculus Connect developers conference.",
    ],
    [
        'id' => 2,
        'author' => "Disguised Toast",
        'text' => "Snap is *reportedly* preparing for an IPO that could value it at $25B or higher",
    ],
    [
        'id' => 3,
        'author' => "Moo Cow",
        'text' => "*What are you saying?!*",
    ]
];

header('Context-type: application/json');
die(json_encode($data));
