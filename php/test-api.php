<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testando API...<br>";

try {
    require_once 'config.php';
    echo "config.php carregado OK<br>";
    
    echo "Testando loadData...<br>";
    $data = loadData('content.json');
    if ($data === null) {
        echo "Arquivo content.json não existe, usando padrão<br>";
        $data = getDefaultContent();
    }
    echo "Dados carregados: " . print_r($data, true) . "<br>";
    
    echo "Testando saveData...<br>";
    if (saveData('test.json', ['test' => 'ok'])) {
        echo "saveData funcionou!<br>";
    } else {
        echo "Erro no saveData<br>";
    }
    
} catch (Exception $e) {
    echo "ERRO: " . $e->getMessage() . "<br>";
    echo "Trace: " . $e->getTraceAsString() . "<br>";
}

echo "<br>Teste concluído!";
?>

