document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const btnPlay = document.getElementById('btnPlay');
  const progressBar = document.getElementById('progressBar');

  if (!audio || !btnPlay || !progressBar) {
    return;
  }

  function updateButton() {
    btnPlay.textContent = audio.paused ? 'PLAYMIUSIC' : 'PAUSAR';
  }

  btnPlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    updateButton();
  });

  // Actualizar la barra de progreso mientras suena la música
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = progressPercent + '%';
    }
  });

  // Permitir hacer click en la barra para saltar a esa parte
  progressBar.parentElement.addEventListener('click', (e) => {
    const rect = progressBar.parentElement.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    if (audio.duration) {
      audio.currentTime = clickPercent * audio.duration;
    }
  });

  audio.addEventListener('ended', () => {
    updateButton();
    progressBar.style.width = '0%';
  });

  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);

  updateButton();
});
