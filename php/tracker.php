<?php
require_once 'config.php';

// Registrar acesso
function trackVisit($page, $referer = '') {
    $dataDir = DATA_DIR;
    $logFile = $dataDir . '/visits.json';
    
    // Carregar visitas existentes
    $visits = [];
    if (file_exists($logFile)) {
        $content = file_get_contents($logFile);
        $visits = json_decode($content, true) ?: [];
    }
    
    // Dados da visita
    $visit = [
        'page' => $page,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'referer' => $referer,
        'timestamp' => date('Y-m-d H:i:s'),
        'date' => date('Y-m-d'),
        'time' => date('H:i:s')
    ];
    
    // Adicionar visita
    $visits[] = $visit;
    
    // Manter apenas últimos 10000 registros
    if (count($visits) > 10000) {
        $visits = array_slice($visits, -10000);
    }
    
    // Salvar
    file_put_contents($logFile, json_encode($visits, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Obter estatísticas
function getStats($days = 30) {
    $dataDir = DATA_DIR;
    $logFile = $dataDir . '/visits.json';
    
    if (!file_exists($logFile)) {
        return [
            'total_visits' => 0,
            'unique_visitors' => 0,
            'pages' => [],
            'daily' => [],
            'recent' => []
        ];
    }
    
    $content = file_get_contents($logFile);
    $visits = json_decode($content, true) ?: [];
    
    $cutoffDate = date('Y-m-d', strtotime("-{$days} days"));
    
    // Filtrar por período
    $filteredVisits = array_filter($visits, function($visit) use ($cutoffDate) {
        return ($visit['date'] ?? '') >= $cutoffDate;
    });
    
    // Total de visitas
    $totalVisits = count($filteredVisits);
    
    // Visitantes únicos (por IP)
    $uniqueIPs = array_unique(array_column($filteredVisits, 'ip'));
    $uniqueVisitors = count($uniqueIPs);
    
    // Páginas mais acessadas
    $pageCounts = [];
    foreach ($filteredVisits as $visit) {
        $page = $visit['page'] ?? 'unknown';
        $pageCounts[$page] = ($pageCounts[$page] ?? 0) + 1;
    }
    arsort($pageCounts);
    $topPages = array_slice($pageCounts, 0, 10, true);
    
    // Visitas por dia
    $dailyCounts = [];
    foreach ($filteredVisits as $visit) {
        $date = $visit['date'] ?? '';
        $dailyCounts[$date] = ($dailyCounts[$date] ?? 0) + 1;
    }
    ksort($dailyCounts);
    
    // Últimas 10 visitas
    $recent = array_slice(array_reverse($filteredVisits), 0, 10);
    
    return [
        'total_visits' => $totalVisits,
        'unique_visitors' => $uniqueVisitors,
        'pages' => $topPages,
        'daily' => $dailyCounts,
        'recent' => $recent,
        'period_days' => $days
    ];
}

// Se for chamado via AJAX para registrar visita
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'track') {
    header('Content-Type: application/json');
    $page = $_POST['page'] ?? 'index.html';
    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    trackVisit($page, $referer);
    echo json_encode(['success' => true]);
    exit;
}

// Se for chamado para obter estatísticas
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'stats') {
    header('Content-Type: application/json');
    $days = isset($_GET['days']) ? (int)$_GET['days'] : 30;
    $stats = getStats($days);
    echo json_encode(['success' => true, 'data' => $stats]);
    exit;
}
?>

