document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('robot-animation');

  const anim = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/animations/robot.json'
  });

  anim.setSpeed(1.4);

  function triggerWalk() {
    container.classList.remove('walking');
    void container.offsetWidth;
    container.classList.add('walking');

    setTimeout(() => {
      container.classList.remove('walking');
    }, 15000);
  }

  setTimeout(triggerWalk, 1000);
  setInterval(triggerWalk, 25000);

  // Drag-to-scroll on timeline tracks
  document.querySelectorAll('.timeline-track').forEach(track => {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', e => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });

    track.style.cursor = 'grab';
  });

  // Auto-swap only the first crossfade card in the carousel on a timer
  const firstCrossfade = document.querySelector('.timeline-track .timeline-card-crossfade');
  if (firstCrossfade) {
    let swapped = false;
    setInterval(() => {
      swapped = !swapped;
      firstCrossfade.classList.toggle('swap-active', swapped);
    }, 4000);
  }

  // TuneMyMusic 3-step hover crossfade
  const tmm = document.getElementById('tunemymusic-crossfade');
  if (tmm) {
    const screens = tmm.querySelectorAll('.phone-screen');
    const buttons = tmm.querySelectorAll('.phone-button');
    let currentIdx = 0;
    let interval = null;

    function showStep(idx) {
      screens.forEach(s => s.classList.remove('active'));
      buttons.forEach(b => b.classList.remove('active'));
      screens[idx].classList.add('active');
      if (buttons[idx]) buttons[idx].classList.add('active');
    }

    tmm.addEventListener('mouseenter', () => {
      interval = setInterval(() => {
        currentIdx = (currentIdx + 1) % screens.length;
        showStep(currentIdx);
      }, 1500);
    });

    tmm.addEventListener('mouseleave', () => {
      clearInterval(interval);
      currentIdx = 0;
      showStep(0);
    });
  }
});
