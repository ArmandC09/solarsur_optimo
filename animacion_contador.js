document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.numero');

  counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    counter.innerText = 0; // Inicializar el contador en 0
    let count = 0;

    // Ajustar la duración en función del valor objetivo
    const baseDuration = 1500; // Duración base para un número "promedio"
    const durationFactor = 0.8; // Factor para ajustar la duración (puedes experimentar con este valor)
    const minDuration = 800; // Duración mínima para evitar animaciones demasiado rápidas

    // Cuanto menor sea el target, menor será la duración (y más lento parecerá)
    const duration = Math.max(minDuration, baseDuration * (target / 100));
    const interval = duration / target;

    function updateCounter() {
      count++;
      counter.innerText = count;
      if (count < target) {
        setTimeout(updateCounter, interval);
      } else {
        counter.innerText = target; // Asegurar que el valor final sea exacto
      }
    }

    if (target > 0) {
      setTimeout(updateCounter, 100); // Iniciar la animación con un pequeño retraso
    }
  });
});
