  function esDispositivoMovil() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 769;
  }

  if (!esDispositivoMovil()) {
    function aparecerAlScroll() {
      const elementos = document.querySelectorAll('.texto-informacion, .imagen');
      elementos.forEach(el => {
        const rect = el.getBoundingClientRect();
        const altoVentana = window.innerHeight;

        if (rect.top < altoVentana - 100) {
          el.classList.add('aparecer');
        }
      });
    }

    window.addEventListener('scroll', aparecerAlScroll);
    window.addEventListener('load', aparecerAlScroll);
  }
