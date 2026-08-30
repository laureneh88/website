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

  // Both carousel crossfades: hover only
  document.querySelectorAll('.timeline-track .timeline-card-crossfade').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('swap-active'));
    el.addEventListener('mouseleave', () => el.classList.remove('swap-active'));
  });

  // TuneMyMusic hover crossfade: cycles 12.01 → 12.02 → 12.03 → 12.02 → 12.03...
  const tmm = document.getElementById('tunemymusic-crossfade');
  if (tmm) {
    const screens = tmm.querySelectorAll('.phone-screen');
    const buttons = tmm.querySelectorAll('.phone-button');
    let currentIdx = 0;
    let interval = null;
    let firstSwap = true;

    function showStep(idx) {
      screens.forEach(s => s.classList.remove('active'));
      buttons.forEach(b => b.classList.remove('active'));
      screens[idx].classList.add('active');
      if (buttons[idx]) buttons[idx].classList.add('active');
    }

    tmm.addEventListener('mouseenter', () => {
      firstSwap = true;
      currentIdx = 1;
      showStep(currentIdx);
      interval = setInterval(() => {
        if (firstSwap) {
          currentIdx = 2;
          firstSwap = false;
        } else {
          currentIdx = currentIdx === 1 ? 2 : 1;
        }
        showStep(currentIdx);
      }, 800);
    });

    tmm.addEventListener('mouseleave', () => {
      clearInterval(interval);
      currentIdx = 0;
      showStep(0);
    });
  }
});
