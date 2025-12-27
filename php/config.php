<?php
// Configurações do sistema
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'admin123'); // Altere esta senha!
define('DATA_DIR', __DIR__ . '/../data');
define('UPLOADS_DIR', __DIR__ . '/../uploads');

// Criar diretórios se não existirem
if (!is_dir(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

if (!is_dir(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0755, true);
}

// Iniciar sessão
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Função para verificar se está logado
function isLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

// Função para fazer login
function login($username, $password) {
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        return true;
    }
    return false;
}

// Função para fazer logout
function logout() {
    session_destroy();
}

// Função para salvar dados JSON
function saveData($filename, $data) {
    $filepath = DATA_DIR . '/' . $filename;
    return file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Função para carregar dados JSON
function loadData($filename) {
    $filepath = DATA_DIR . '/' . $filename;
    if (file_exists($filepath)) {
        $content = file_get_contents($filepath);
        return json_decode($content, true);
    }
    return null;
}
?>

