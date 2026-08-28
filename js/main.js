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
});
