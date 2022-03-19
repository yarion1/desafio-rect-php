<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");


require('./Conexao.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'get') {

    $sql = $pdo->query("SELECT * FROM catlogfilms");
    if($sql->rowCount() > 0) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);

        foreach($data as $item) {
            $array['result'][] = [
                'id' => $item['id_film'],
                'imagem' => $item['imagem'],
                'titulo' => $item['titulo'],
                'descricao' => $item['descricao'],
                'lancamento' => $item['lancamento'],
            ];
        }
        echo json_encode($array['result']);
    }
    
} else {
    $array['error'] = 'Método não permitido (apenas GET)';
}

