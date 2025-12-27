<?php
// Habilitar exibição de erros para debug (remover em produção)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

require_once 'config.php';

// Verificar se headers já foram enviados
if (!headers_sent()) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Verificar autenticação para operações de escrita
$requiresAuth = ['POST', 'PUT', 'DELETE'];
if (in_array($_SERVER['REQUEST_METHOD'], $requiresAuth) && !isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Não autorizado']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['path'] ?? '';

switch ($path) {
    case 'content':
        handleContent($method);
        break;
    case 'exposicoes':
        handleExposicoes($method);
        break;
    case 'colecoes':
        handleColecoes($method);
        break;
    case 'eventos':
        handleEventos($method);
        break;
    case 'upload':
        handleUpload();
        break;
    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Endpoint não encontrado']);
}

function handleContent($method) {
    if ($method === 'GET') {
        $data = loadData('content.json') ?? getDefaultContent();
        echo json_encode(['success' => true, 'data' => $data]);
    } elseif ($method === 'POST' || $method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (saveData('content.json', $input)) {
            echo json_encode(['success' => true, 'message' => 'Conteúdo salvo com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao salvar conteúdo']);
        }
    }
}

function handleExposicoes($method) {
    $data = loadData('exposicoes.json') ?? [];
    
    if ($method === 'GET') {
        // Ordenar por ordem
        usort($data, function($a, $b) {
            return ($a['ordem'] ?? 0) - ($b['ordem'] ?? 0);
        });
        echo json_encode(['success' => true, 'data' => $data]);
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $input['id'] = uniqid();
        $input['ordem'] = count($data) + 1;
        $data[] = $input;
        if (saveData('exposicoes.json', $data)) {
            echo json_encode(['success' => true, 'data' => $input]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao criar exposição']);
        }
    } elseif ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        foreach ($data as $key => $item) {
            if ($item['id'] === $id) {
                $data[$key] = array_merge($item, $input);
                break;
            }
        }
        if (saveData('exposicoes.json', $data)) {
            echo json_encode(['success' => true, 'message' => 'Exposição atualizada']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar exposição']);
        }
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        $data = array_filter($data, function($item) use ($id) {
            return $item['id'] !== $id;
        });
        // Reordenar
        $data = array_values($data);
        foreach ($data as $key => $item) {
            $data[$key]['ordem'] = $key + 1;
        }
        if (saveData('exposicoes.json', $data)) {
            echo json_encode(['success' => true, 'message' => 'Exposição excluída']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao excluir exposição']);
        }
    }
}

function handleColecoes($method) {
    $data = loadData('colecoes.json') ?? [];
    
    if ($method === 'GET') {
        usort($data, function($a, $b) {
            return ($a['ordem'] ?? 0) - ($b['ordem'] ?? 0);
        });
        echo json_encode(['success' => true, 'data' => $data]);
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $input['id'] = uniqid();
        $input['ordem'] = count($data) + 1;
        $data[] = $input;
        if (saveData('colecoes.json', $data)) {
            echo json_encode(['success' => true, 'data' => $input]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao criar coleção']);
        }
    } elseif ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        foreach ($data as $key => $item) {
            if ($item['id'] === $id) {
                $data[$key] = array_merge($item, $input);
                break;
            }
        }
        if (saveData('colecoes.json', $data)) {
            echo json_encode(['success' => true, 'message' => 'Coleção atualizada']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar coleção']);
        }
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        $data = array_filter($data, function($item) use ($id) {
            return $item['id'] !== $id;
        });
        $data = array_values($data);
        foreach ($data as $key => $item) {
            $data[$key]['ordem'] = $key + 1;
        }
        if (saveData('colecoes.json', $data)) {
            echo json_encode(['success' => true, 'message' => 'Coleção excluída']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao excluir coleção']);
        }
    }
}

function handleEventos($method) {
    $data = loadData('eventos.json') ?? [];
    
    if ($method === 'GET') {
        usort($data, function($a, $b) {
            return ($a['ordem'] ?? 0) - ($b['ordem'] ?? 0);
        });
        echo json_encode(['success' => true, 'data' => $data]);
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $input['id'] = uniqid();
        $input['ordem'] = count($data) + 1;
        $data[] = $input;
        if (saveData('eventos.json', $data)) {
            echo json_encode(['success' => true, 'data' => $input]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao criar evento']);
        }
    } elseif ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        foreach ($data as $key => $item) {
            if ($item['id'] === $id) {
                $data[$key] = array_merge($item, $input);
                break;
            }
        }
        if (saveData('eventos.json', $data)) {
            echo json_encode(['success' => true, 'message' => 'Evento atualizado']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar evento']);
        }
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        $data = array_filter($data, function($item) use ($id) {
            return $item['id'] !== $id;
        });
        $data = array_values($data);
        foreach ($data as $key => $item) {
            $data[$key]['ordem'] = $key + 1;
        }
        if (saveData('eventos.json', $data)) {
            echo json_encode(['success' => true, 'message' => 'Evento excluído']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao excluir evento']);
        }
    }
}

function handleUpload() {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Nenhuma imagem enviada']);
        return;
    }
    
    $file = $_FILES['image'];
    $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!in_array($file['type'], $allowed)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Tipo de arquivo não permitido']);
        return;
    }
    
    $filename = uniqid() . '_' . basename($file['name']);
    $filepath = UPLOADS_DIR . '/' . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        echo json_encode(['success' => true, 'url' => '/uploads/' . $filename]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erro ao fazer upload']);
    }
}

function getDefaultContent() {
    return [
        'whatsapp' => '5511999999999', // Número do WhatsApp
        'index' => [
            'hero_title' => 'Museu [Nome]',
            'hero_subtitle' => 'Museu de História e Patrimônio',
            'hero_description' => 'Preservando a memória e celebrando a cultura através das gerações',
            'hero_image' => 'https://images.unsplash.com/photo-1541961018884-2234998574a9?w=1920&q=80',
            'intro_text' => 'Bem-vindo ao nosso museu. Aqui você pode explorar nossa rica coleção de artefatos históricos, obras de arte e exposições que contam a história da nossa região e além.',
            'about_title' => 'Sobre o Museu',
            'about_text' => 'O Museu [Nome] foi fundado com a missão de preservar, pesquisar e compartilhar o patrimônio cultural e histórico da nossa região.',
            'about_image' => 'https://images.unsplash.com/photo-1541961018884-2234998574a9?w=600&q=80'
        ],
        'sobre' => [
            'title' => 'Sobre',
            'content' => 'Sou um parágrafo. Aqui você pode adicionar seu próprio texto.',
            'image' => 'https://images.unsplash.com/photo-1541961018884-2234998574a9?w=600&q=80'
        ],
        'contato' => [
            'endereco' => 'Rua do Museu, 123\nCentro Histórico\nCEP 12345-678',
            'telefone' => '(11) 1234-5678\n(11) 9876-5432',
            'email' => 'contato@museu.com.br\ninfo@museu.com.br',
            'horario' => 'Terça a Sexta: 9h - 18h\nSábado e Domingo: 10h - 16h\nSegunda: Fechado'
        ]
    ];
}
?>

