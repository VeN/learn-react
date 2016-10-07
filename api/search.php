<?php

$db = [
    [
        'id' => 1,
        'name' => "Toys",
        'products' => [
            ['id' => 1, 'name' => "Teddy Bear", 'price' => 123],
            ['id' => 2, 'name' => "Police Car", 'price' => 300]
        ]
    ],
    [
        'id' => 2,
        'name' => "Stationery",
        'products' => [
            ['id' => 3, 'name' => "White Paper", 'price' => 2],
            ['id' => 4, 'name' => "Colour Envelope", 'price' => 11],
        ]
    ]
];

if ($_GET && array_key_exists('q', $_GET) && $_GET['q']) {
    $q = $_GET['q'];
    $out = [];

    foreach ($db as $category) {
        $c = null;
        foreach ($category['products'] as $item) {
            if (stripos($item['name'], $q) !== false) {
                if (!$c) {
                    $c = $category;
                    $c['products'] = [];
                }

                $c['products'][] = $item;
            }
        }

        if ($c) {
            $out[] = $c;
        }
    }
} else {
    $out = $db;
}

header('Content-type: application/json');
die(json_encode($out));
