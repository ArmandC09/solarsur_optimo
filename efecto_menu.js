
            function toggleMenu() {
                const efectoMenu = document.getElementById('efecto_menu');
                efectoMenu.classList.toggle('activo'); // Alterna la clase 'activo' para mostrar/ocultar el menú
            }
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
