document.addEventListener('DOMContentLoaded', () => {
  // Typewriter animation with correction
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const steps = [
      { action: 'type', text: 'Demonstrate value in the first 10 seco', speed: 70 },
      { action: 'pause', duration: 400 },
      { action: 'delete', count: 7, speed: 50 },
      { action: 'pause', duration: 200 },
      { action: 'type', text: '5 seconds', speed: 70 },
      { action: 'pause', duration: 300 },
      { action: 'break' },
      { action: 'type', text: 'or it is not going to work.', speed: 70 },
    ];

    let textContent = '';
    let stepIdx = 0;
    let charIdx = 0;

    function updateDisplay() {
      typeEl.innerHTML = '';
      const parts = textContent.split('\n');
      parts.forEach((part, i) => {
        if (i > 0) typeEl.appendChild(document.createElement('br'));
        typeEl.appendChild(document.createTextNode(part));
      });
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.textContent = '|';
      typeEl.appendChild(cursor);
    }

    function runStep() {
      if (stepIdx >= steps.length) {
        const cursor = typeEl.querySelector('.typewriter-cursor');
        if (cursor) cursor.remove();
        triggerWalk();
        return;
      }

      const step = steps[stepIdx];

      if (step.action === 'type') {
        if (charIdx < step.text.length) {
          textContent += step.text[charIdx];
          updateDisplay();
          charIdx++;
          setTimeout(runStep, step.speed);
        } else {
          stepIdx++;
          charIdx = 0;
          runStep();
        }
      } else if (step.action === 'delete') {
        if (charIdx < step.count) {
          textContent = textContent.slice(0, -1);
          updateDisplay();
          charIdx++;
          setTimeout(runStep, step.speed);
        } else {
          stepIdx++;
          charIdx = 0;
          runStep();
        }
      } else if (step.action === 'pause') {
        stepIdx++;
        charIdx = 0;
        setTimeout(runStep, step.duration);
      } else if (step.action === 'break') {
        textContent += '\n';
        updateDisplay();
        stepIdx++;
        charIdx = 0;
        setTimeout(runStep, 200);
      }
    }

    setTimeout(runStep, 500);
  }

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
