  const bloqueInvisible = document.querySelector('.bloque-invisible');
  const contenedorAnimacion = document.querySelector('.contenedor-animacion');
  const originalItems = document.querySelectorAll('.invisible.original');
  const itemHeightWithMargin = 61 + 10;
  const totalOriginalItems = originalItems.length;
  const visibleHeight = bloqueInvisible.offsetHeight;
  let animationTimeout;
  let isScrolling = false;
  let isAnimating = true; // Controlar si la animación está activa

  // Duplicar los elementos para el bucle (solo si la animación está activa)
  const duplicateElements = () => {
    // Limpiar duplicados previos
    const clones = contenedorAnimacion.querySelectorAll('.invisible:not(.original)');
    clones.forEach(clone => clone.remove());

    if (isAnimating) {
      for (let i = 0; i < Math.ceil(visibleHeight / itemHeightWithMargin); i++) {
        originalItems.forEach(item => {
          const clonedItem = item.cloneNode(true);
          contenedorAnimacion.appendChild(clonedItem);
        });
      }
      contenedorAnimacion.classList.add('animating');
    } else {
      contenedorAnimacion.classList.remove('animating');
      contenedorAnimacion.style.transform = 'translateY(0)'; // Asegurar que esté al inicio
    }
  };

  duplicateElements(); // Duplicar al cargar

  bloqueInvisible.addEventListener('scroll', () => {
    isScrolling = true;
    isAnimating = false; // Detener la animación al scrollear
    duplicateElements(); // Remover duplicados
    contenedorAnimacion.style.animationPlayState = 'paused';
    clearTimeout(animationTimeout);

    animationTimeout = setTimeout(() => {
      isScrolling = false;
      isAnimating = true; // Reanudar la animación después de 5 segundos
      duplicateElements(); // Volver a duplicar
      contenedorAnimacion.style.animationPlayState = 'running';
    }, 5000);
  });

  contenedorAnimacion.addEventListener('animationiteration', () => {
    if (isAnimating) {
      contenedorAnimacion.style.transform = 'translateY(0)';
    }
  });
