<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'login') {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        if (login($username, $password)) {
            echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso']);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos']);
        }
    } elseif ($action === 'logout') {
        logout();
        echo json_encode(['success' => true, 'message' => 'Logout realizado com sucesso']);
    } elseif ($action === 'check') {
        echo json_encode(['logged_in' => isLoggedIn()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?>

