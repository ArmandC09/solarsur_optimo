document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide-panel');
  const puntos = document.querySelectorAll('.punto-carrusel');
  let current = 0;
  let interval = null;
  let pauseTimeout = null;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('activa', i === idx);
      puntos[i].classList.toggle('activo', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function startAuto() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }

  // Solo efecto automático en escritorio
  if (window.innerWidth > 900) {
    puntos.forEach((punto, idx) => {
      punto.addEventListener('click', function() {
        showSlide(idx);
        clearInterval(interval);
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(startAuto, 8000); // Pausa 8 segundos
      });
    });
    showSlide(0);
    startAuto();
  } else {
    // En móvil: muestra todos los slides, activa el primero y los puntos
    showSlide(0);
    // Opcional: sincroniza los puntos con el scroll
    const carrusel = document.querySelector('.carrusel-paneles');
    carrusel.addEventListener('scroll', function() {
      const scrollLeft = carrusel.scrollLeft;
      const slideWidth = carrusel.offsetWidth;
      const idx = Math.round(scrollLeft / slideWidth);
      puntos.forEach((p, i) => p.classList.toggle('activo', i === idx));
    });
    puntos.forEach((punto, idx) => {
      punto.addEventListener('click', function() {
        const carrusel = document.querySelector('.carrusel-paneles');
        carrusel.scrollTo({
          left: idx * carrusel.offsetWidth,
          behavior: 'smooth'
        });
      });
    });
  }
});
