
window.addEventListener('DOMContentLoaded', function() {
    // Mostrar modal si viene de formsubmit
    if (window.location.search.includes('enviado=1')) {
        document.getElementById('modal-confirmacion').style.display = 'flex';
    }

    // Cerrar al hacer click en la equis
    document.getElementById('modal-cerrar-x').addEventListener('click', function(e) {
        document.getElementById('modal-confirmacion').style.display = 'none';
        limpiarUrl();
        e.stopPropagation();
    });

    // Cerrar al hacer click en el fondo transparente
    document.querySelector('.modal-fondo').addEventListener('click', function(e) {
        if (e.target === this) {
            document.getElementById('modal-confirmacion').style.display = 'none';
            limpiarUrl();
        }
    });

    // Limpia el parámetro de la URL al cerrar el modal
    function limpiarUrl() {
        if (window.history.replaceState) {
            const url = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, url);
        }
    }
});
