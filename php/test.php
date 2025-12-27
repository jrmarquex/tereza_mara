<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "PHP está funcionando!<br>";
echo "Versão PHP: " . phpversion() . "<br>";

// Testar criação de diretórios
$dataDir = __DIR__ . '/../data';
$uploadsDir = __DIR__ . '/../uploads';

echo "Tentando criar diretórios...<br>";

if (!is_dir($dataDir)) {
    if (mkdir($dataDir, 0755, true)) {
        echo "Diretório data criado com sucesso!<br>";
    } else {
        echo "Erro ao criar diretório data<br>";
    }
} else {
    echo "Diretório data já existe<br>";
}

if (!is_dir($uploadsDir)) {
    if (mkdir($uploadsDir, 0755, true)) {
        echo "Diretório uploads criado com sucesso!<br>";
    } else {
        echo "Erro ao criar diretório uploads<br>";
    }
} else {
    echo "Diretório uploads já existe<br>";
}

// Testar require
echo "Testando require config.php...<br>";
try {
    require_once 'config.php';
    echo "config.php carregado com sucesso!<br>";
} catch (Exception $e) {
    echo "Erro ao carregar config.php: " . $e->getMessage() . "<br>";
}

echo "<br>Teste concluído!";
?>

