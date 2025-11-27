const images = [
  'Pildid/background_eff/kaardid/2_of_clubs.png',
  'Pildid/background_eff/kaardid/2_of_diamonds.png',
  'Pildid/background_eff/kaardid/2_of_hearts.png',
  'Pildid/background_eff/kaardid/2_of_spades.png',
  'Pildid/background_eff/kaardid/3_of_clubs.png',
  'Pildid/background_eff/kaardid/3_of_diamonds.png',
  'Pildid/background_eff/kaardid/3_of_hearts.png',
  'Pildid/background_eff/kaardid/3_of_spades.png',
  'Pildid/background_eff/kaardid/4_of_clubs.png',
  'Pildid/background_eff/kaardid/4_of_diamonds.png',
  'Pildid/background_eff/kaardid/4_of_hearts.png',
  'Pildid/background_eff/kaardid/4_of_spades.png',
  'Pildid/background_eff/kaardid/5_of_clubs.png',
  'Pildid/background_eff/kaardid/5_of_diamonds.png',
  'Pildid/background_eff/kaardid/5_of_hearts.png',
  'Pildid/background_eff/kaardid/5_of_spades.png',
  'Pildid/background_eff/kaardid/6_of_clubs.png',
  'Pildid/background_eff/kaardid/6_of_diamonds.png',
  'Pildid/background_eff/kaardid/6_of_hearts.png',
  'Pildid/background_eff/kaardid/6_of_spades.png',
  'Pildid/background_eff/kaardid/7_of_clubs.png',
  'Pildid/background_eff/kaardid/7_of_diamonds.png',
  'Pildid/background_eff/kaardid/7_of_hearts.png',
  'Pildid/background_eff/kaardid/7_of_spades.png',
  'Pildid/background_eff/kaardid/8_of_clubs.png',
  'Pildid/background_eff/kaardid/8_of_diamonds.png',
  'Pildid/background_eff/kaardid/8_of_hearts.png',
  'Pildid/background_eff/kaardid/8_of_spades.png',
  'Pildid/background_eff/kaardid/9_of_clubs.png',
  'Pildid/background_eff/kaardid/9_of_diamonds.png',
  'Pildid/background_eff/kaardid/9_of_hearts.png',
  'Pildid/background_eff/kaardid/9_of_spades.png',
  'Pildid/background_eff/kaardid/10_of_clubs.png',
  'Pildid/background_eff/kaardid/10_of_diamonds.png',
  'Pildid/background_eff/kaardid/10_of_hearts.png',
  'Pildid/background_eff/kaardid/10_of_spades.png',
  'Pildid/background_eff/kaardid/jack_of_clubs.png',
  'Pildid/background_eff/kaardid/jack_of_diamonds.png',
  'Pildid/background_eff/kaardid/jack_of_hearts.png',
  'Pildid/background_eff/kaardid/jack_of_spades.png',
  'Pildid/background_eff/kaardid/jack_of_clubs2.png',
  'Pildid/background_eff/kaardid/jack_of_diamonds2.png',
  'Pildid/background_eff/kaardid/jack_of_hearts2.png',
  'Pildid/background_eff/kaardid/jack_of_spades2.png',
  'Pildid/background_eff/kaardid/queen_of_clubs.png',
  'Pildid/background_eff/kaardid/queen_of_diamonds.png',
  'Pildid/background_eff/kaardid/queen_of_hearts.png',
  'Pildid/background_eff/kaardid/queen_of_spades.png',
  'Pildid/background_eff/kaardid/queen_of_clubs2.png',
  'Pildid/background_eff/kaardid/queen_of_diamonds2.png',
  'Pildid/background_eff/kaardid/queen_of_hearts2.png',
  'Pildid/background_eff/kaardid/queen_of_spades2.png',
  'Pildid/background_eff/kaardid/king_of_clubs.png',
  'Pildid/background_eff/kaardid/king_of_diamonds.png',
  'Pildid/background_eff/kaardid/king_of_hearts.png',
  'Pildid/background_eff/kaardid/king_of_spades.png',
  'Pildid/background_eff/kaardid/king_of_clubs2.png',
  'Pildid/background_eff/kaardid/king_of_diamonds2.png',
  'Pildid/background_eff/kaardid/king_of_hearts2.png',
  'Pildid/background_eff/kaardid/king_of_spades2.png',
  'Pildid/background_eff/kaardid/ace_of_clubs.png',
  'Pildid/background_eff/kaardid/ace_of_diamonds.png',
  'Pildid/background_eff/kaardid/ace_of_hearts.png',
  'Pildid/background_eff/kaardid/ace_of_spades.png',
  'Pildid/background_eff/kaardid/ace_of_spades2.png',
  'Pildid/background_eff/kaardid/black_joker.png',
  'Pildid/background_eff/kaardid/red_joker.png'
];

const preloaded = [];
images.forEach((src) => {
  const img = new Image();
  img.src = src;
  img.onerror = () => console.warn('Failed to load background image:', src);
  preloaded.push(img);
});

const MAX_CONCURRENT = 30; // safeguard to avoid DOM overload
let currentCount = 0;

function createFloatingImage(x, y) {
  if (currentCount >= MAX_CONCURRENT) return; // skip if too many
  currentCount++;

  const img = document.createElement('img');
  img.src = images[Math.floor(Math.random() * images.length)];
  img.className = 'background-png';

  // place center of image at the pointer
  img.style.left = x + 'px';
  img.style.top = y + 'px';

  // random starting scale & rotation
  const startScale = 0.6 + Math.random() * 0.6; // 0.6 - 1.2
  const startRotate = Math.random() * 360;
  img.style.transform = `translate(-50%, -50%) scale(${startScale}) rotate(${startRotate}deg)`;
  img.style.opacity = '1';

  document.body.appendChild(img);

  // ensure next frame before starting transition
  requestAnimationFrame(() => {
    // choose an end position offset so it drifts (random direction)
    const dx = (Math.random() - 0.5) * 300; // px
    const dy = -50 - Math.random() * 200; // mostly upward

    const endScale = Math.max(0.2, startScale * (0.15 + Math.random() * 0.25));
    const endRotate = startRotate + (Math.random() * 80 - 40);

    // we put translateX/Y in px by composing translate then translate(-50%,-50%).
    // CSS transform order: translate(px,px) translate(-50%,-50%) scale() rotate()
    img.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${endScale}) rotate(${endRotate}deg)`;
    img.style.opacity = '0';
  });

  // remove when transition finishes (or fallback after 2s)
  const cleanup = () => {
    if (img.parentNode) img.parentNode.removeChild(img);
    currentCount = Math.max(0, currentCount - 1);
  };

  const onTransitionEnd = (ev) => {
    // ensure we only remove once (when opacity or transform finished)
    cleanup();
    img.removeEventListener('transitionend', onTransitionEnd);
  };

  img.addEventListener('transitionend', onTransitionEnd);

  // fallback cleanup in case transitionend doesn't fire
  const fallbackTimer = setTimeout(() => {
    if (img.parentNode) cleanup();
    clearTimeout(fallbackTimer);
  }, 2000);
}

// Helper to ignore interactive elements
function isInteractiveTarget(target) {
  return !!target.closest('button, a, input, textarea, select, label, [data-no-background]') ||
         !!target.closest('.menu-btn, .nupp');
}

// attach after DOM ready
function initBackgroundEffect() {
  // If you want clicks only outside ".card", change the condition below.
  document.addEventListener('pointerdown', (e) => {
    // ignore right-click / ctrl-click (optional)
    if (e.button !== 0) return;

    if (isInteractiveTarget(e.target)) return;

    // get viewport coordinates
    const x = e.clientX;
    const y = e.clientY;

    createFloatingImage(x, y);
  }, { passive: true });
}

// If script is loaded in head, wait for DOM; if already loaded, init immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackgroundEffect);
} else {
  initBackgroundEffect();
}