<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require('./Conexao.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {

    $img = filter_input(INPUT_POST, 'imagem');
    $title = filter_input(INPUT_POST, 'titulo');
    $overview = filter_input(INPUT_POST, 'descricao');
    $release = filter_input(INPUT_POST, 'lancamento');

    if ($img && $title && $overview && $release) {

        $sql = $pdo->prepare("INSERT INTO catlogfilms (imagem, titulo, descricao, lancamento) VALUES (:imagem, :titulo, :descricao, :lancamento)");
        $sql->bindValue(':imagem', $img);
        $sql->bindValue(':titulo', $title);
        $sql->bindValue(':descricao', $overview);
        $sql->bindValue(':lancamento', $release);
        $sql->execute();

        $id = $pdo->lastInsertId();

        $array['result'] = [
            'id' => $id,
            'imagem' => $img,
            'titulo' => $title,
            'descricao' => $overview,
            'lancamento' => $release

        ];
        var_dump($array);
    } else {
        $array['error'] = 'Campos não enviados';
    }
} else {
    $array['error'] = 'Método não permitido (apenas POST)';
}
