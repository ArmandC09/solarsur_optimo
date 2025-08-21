
document.addEventListener('DOMContentLoaded', function () {
  const abrirBtn = document.getElementById('abrir-video');
  const modal = document.getElementById('video-modal');
  const cerrarBtn = modal.querySelector('.cerrar-video');
  const videoEscritorio = document.getElementById('video-escritorio');
  const videoMovil = document.getElementById('video-movil');

  // Guarda el contenido HTML original del video de TikTok
  const tiktokOriginalHTML = videoMovil.innerHTML;

  if (abrirBtn && modal && cerrarBtn && videoEscritorio && videoMovil) {
    abrirBtn.addEventListener('click', () => {
      const esMovil = window.innerWidth <= 900;

      if (esMovil) {
        videoEscritorio.style.display = 'none';
        videoMovil.style.display = 'block';
        videoMovil.innerHTML = tiktokOriginalHTML; // Reinicia TikTok embed
        // Vuelve a cargar el script de TikTok
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else {
        videoMovil.style.display = 'none';
        videoEscritorio.style.display = 'block';
      }

      modal.style.display = 'flex';
    });

    cerrarBtn.addEventListener('click', () => {
      modal.style.display = 'none';

      if (videoEscritorio.style.display === 'block') {
        videoEscritorio.src = videoEscritorio.src; // reinicia YouTube
      } else {
        videoMovil.innerHTML = ""; // limpia TikTok para detener el sonido
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';

        if (videoEscritorio.style.display === 'block') {
          videoEscritorio.src = videoEscritorio.src;
        } else {
          videoMovil.innerHTML = ""; // detiene TikTok
        }
      }
    });
  }
});
