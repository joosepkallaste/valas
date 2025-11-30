/*  
  --------------------------------------------
  Autor: Armin Kull  
  Ajaperiood: 01.11 – 31.11  
  Dokumentatsiooniallikad: StackOverflow, W3Schools, DevDocs  
  --------------------------------------------
  See skript loob taustale visuaalse efekti, kus kasutaja klõpsu asukohta
  ilmuvad juhuslikud kaardipildid, mis triivivad ülespoole ja hajuvad.
  Efekt ignoreerib interaktiivseid elemente (nupud, lingid, sisendväljad).
*/


// --------------------------------------------
// Kaardipiltide nimekiri (kõik võimalikud variandid)
// --------------------------------------------
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


// --------------------------------------------
// Piltide eellaadimine, et animatsioon oleks sujuv
// --------------------------------------------
const preloaded = [];
images.forEach((src) => {
  const img = new Image();
  img.src = src;

  // Kui pilt ei lae, logime hoiatuse
  img.onerror = () => console.warn('Failed to load background image:', src);

  preloaded.push(img);
});


// Maksimaalne lubatud üheaegsete piltide arv
const MAX_CONCURRENT = 30;
let currentCount = 0;


// --------------------------------------------
// Funktsioon, mis loob pildi ja käivitab juhusliku animatsiooni
// --------------------------------------------
function createFloatingImage(x, y) {
  // Kui liiga palju elemente juba ekraanil, katkestame
  if (currentCount >= MAX_CONCURRENT) return;

  currentCount++;

  // Luuakse <img> element
  const img = document.createElement('img');

  // Valime juhusliku kaardipildi
  img.src = images[Math.floor(Math.random() * images.length)];
  img.className = 'background-png';

  // Pildi paigutamine hiireklõpsu keskele
  img.style.left = x + 'px';
  img.style.top = y + 'px';

  // Algussuurus ja algpööramine
  const startScale = 0.6 + Math.random() * 0.6;  
  const startRotate = Math.random() * 360;

  img.style.transform = `translate(-50%, -50%) scale(${startScale}) rotate(${startRotate}deg)`;
  img.style.opacity = '1';

  // Lisame pildi DOM-i
  document.body.appendChild(img);

  // Käivitame animatsiooni järgmisel kaadril
  requestAnimationFrame(() => {
    // Lõppasukoha (drift) juhuslik vektor
    const dx = (Math.random() - 0.5) * 300;
    const dy = -50 - Math.random() * 200;

    const endScale = Math.max(0.2, startScale * (0.15 + Math.random() * 0.25));
    const endRotate = startRotate + (Math.random() * 80 - 40);

    img.style.transform = 
      `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${endScale}) rotate(${endRotate}deg)`;

    // Pilt hajub
    img.style.opacity = '0';
  });

  // --------------------------------------------
  // Elemendi eemaldamine animatsiooni lõpus
  // --------------------------------------------
  const cleanup = () => {
    if (img.parentNode) img.parentNode.removeChild(img);
    currentCount = Math.max(0, currentCount - 1);
  };

  const onTransitionEnd = () => {
    cleanup();
    img.removeEventListener('transitionend', onTransitionEnd);
  };

  img.addEventListener('transitionend', onTransitionEnd);

  // Tagavara puhastus (kui transitionend ei käivitu)
  setTimeout(cleanup, 2000);
}


// --------------------------------------------
// Kontroll, kas klõps toimus interaktiivsel elemendil
// --------------------------------------------
function isInteractiveTarget(target) {
  return !!target.closest('button, a, input, textarea, select, label, [data-no-background]') ||
         !!target.closest('.menu-btn, .nupp');
}


// --------------------------------------------
// Efekti init käivitamine lehe laadimisel
// --------------------------------------------
function initBackgroundEffect() {
  document.addEventListener('pointerdown', (e) => {
    // Lubame ainult vasakklõpsu
    if (e.button !== 0) return;

    // Interaktiivsed elemendid ei käivita efekti
    if (isInteractiveTarget(e.target)) return;

    createFloatingImage(e.clientX, e.clientY);
  }, { passive: true });
}


// --------------------------------------------
// Käivitame efekti, kui DOM on valmis
// --------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackgroundEffect);
} else {
  initBackgroundEffect();
}
