
document.addEventListener('DOMContentLoaded', function() {
  const logoImage = document.querySelector('.logo img'); // Selecciona la etiqueta img dentro de la clase logo
  const initialImageSrc = "Recurso 2.svg"; // Ruta de la imagen inicial
  const scrolledImageSrc = "Recurso 1.svg"; // Ruta de la imagen que se mostrará al hacer scroll
  const scrollThreshold = 445; // Define la cantidad de píxeles para el cambio de imagen

  window.addEventListener('scroll', function() {
    if (window.scrollY >= scrollThreshold) {
      logoImage.src = scrolledImageSrc; // Cambia la fuente de la imagen
    } else {
      logoImage.src = initialImageSrc; // Restaura la fuente de la imagen inicial
    }
  });
});
