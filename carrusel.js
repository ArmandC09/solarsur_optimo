document.addEventListener('DOMContentLoaded', function () {
  const carrusel = document.querySelector('.carrusel-imagen-body');
  const slides = document.querySelectorAll('.slide-imagen-body');
  const total = slides.length;
  let current = 0;

  // Inicia animaciones para primer slide si escritorio
  if (window.innerWidth > 900) {
    const cotizacion = document.querySelector('.recuadro-cotizacion');
    const horarios = document.querySelector('.horarios-container');
    if (cotizacion && horarios) {
      setTimeout(() => {
        cotizacion.classList.add('visible');
        setTimeout(() => {
          horarios.classList.add('visible');
        }, 600);
      }, 300);
    }
  } else {
    // En móvil: muestra todo sin animación
    document.querySelectorAll('.recuadro-cotizacion, .horarios-container, .recuadro-2, .recuadro-mantenimiento').forEach(el => {
      el.classList.add('visible');
    });
  }

  // Características por scroll
  const caracteristicas = document.querySelectorAll('.caracteristica');
  let animadas = false;

  function mostrarCaracteristicasEnOrden() {
    if (animadas) return;
    animadas = true;
    let delay = 0;
    let base = 300;
    let aceleracion = 0.7;
    caracteristicas.forEach((caracteristica) => {
      setTimeout(() => {
        caracteristica.classList.add('visible');
      }, delay);
      delay += base;
      base = Math.max(80, base * aceleracion);
    });
  }

  function onScroll() {
    if (window.innerWidth <= 900) {
      caracteristicas.forEach(c => c.classList.add('visible'));
      window.removeEventListener('scroll', onScroll);
      return;
    }

    const seccion = document.querySelector('.caracteristicas');
    if (!seccion) return;
    const rect = seccion.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      mostrarCaracteristicasEnOrden();
      window.removeEventListener('scroll', onScroll);
    }
  }

  caracteristicas.forEach((c) => c.classList.remove('visible'));
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Carrusel
  let autoInterval = setInterval(nextSlide, 4000);

  function showSlide(idx) {
    const percent = -(idx * (100 / total));
    carrusel.style.transform = `translateX(${percent}%)`;
    current = idx;

    // Activar animación del segundo banner
    if (idx === 1 && window.innerWidth > 900) {
      const recuadro2 = slides[idx].querySelector('.recuadro-2');
      const recuadroMantenimiento = slides[idx].querySelector('.recuadro-mantenimiento');

      if (recuadro2 && !recuadro2.classList.contains('visible')) {
        setTimeout(() => {
          recuadro2.classList.add('visible');

          // Mostrar recuadro mantenimiento después
          setTimeout(() => {
            if (recuadroMantenimiento) {
              recuadroMantenimiento.classList.add('visible');
            }
          }, 600); // después de recuadro-2
        }, 400); // tras cambiar slide
      }
    }
  }

  function nextSlide() {
    let next = (current + 1) % total;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + total) % total;
    showSlide(prev);
  }

  // Swipe y Drag
  let startX = 0;
  let isDragging = false;

  function handleSwipe(diff) {
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    autoInterval = setInterval(nextSlide, 4000);
  }

  carrusel.addEventListener('mousedown', (e) => {
    clearInterval(autoInterval);
    isDragging = true;
    startX = e.pageX;
  });

  carrusel.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.pageX - startX;
    handleSwipe(diff);
  });

  carrusel.addEventListener('touchstart', (e) => {
    clearInterval(autoInterval);
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  carrusel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.changedTouches[0].clientX - startX;
    handleSwipe(diff);
  });

  showSlide(0); // Inicia en el primer slide
});
