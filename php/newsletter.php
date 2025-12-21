<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verifica se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Obtém o email do POST
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// Validação básica
if (empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email é obrigatório']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Diretório para salvar os emails (crie este diretório se não existir)
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Arquivo para salvar os emails
$file = $dataDir . '/newsletter.txt';

// Prepara os dados
$data = [
    'email' => $email,
    'date' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

// Salva no arquivo (formato JSON linha por linha)
$line = json_encode($data) . "\n";
file_put_contents($file, $line, FILE_APPEND | LOCK_EX);

// Opcional: Enviar email de confirmação
// Você pode configurar isso depois com PHPMailer ou similar

// Resposta de sucesso
echo json_encode([
    'success' => true,
    'message' => 'Inscrição realizada com sucesso!'
]);
?>

