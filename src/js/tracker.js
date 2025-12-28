// Sistema de tracking de visitas
(function() {
    // Obter página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Registrar visita
    fetch('php/tracker.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=track&page=${encodeURIComponent(currentPage)}`
    }).catch(err => {
        // Silenciosamente falha se não conseguir registrar
        console.log('Tracking não disponível');
    });
})();

