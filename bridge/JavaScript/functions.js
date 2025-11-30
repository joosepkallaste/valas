/*  
  --------------------------------------------
  Autor: Armin Kull  
  Ajaperiood: 01.11 – 31.11  
  Dokumentatsiooniallikad: StackOverflow, W3Schools, DevDocs  
  --------------------------------------------
  See skript sisaldab kahte põhifunktsiooni:
  
  1) renderCustomText()  
     - Võimaldab lihtsat markdown-laadset süntaksit (#, ##, -, ||bold||)
     - Genereerib HTML-i, mis lisatakse lehel vastavasse konteinerisse

  2) loadSectionsFromFile()
     - Laeb tekstifaili (näiteks .txt või .md)
     - Jagab sisu tühjade ridade alusel sektsioonideks
     - Paneb iga sektsiooni vastavasse HTML konteinerisse ID järgi
*/


// ----------------------------------------------------------
// Renderdab lihtsa markdownilaadse teksti HTML-iks
// ----------------------------------------------------------
function renderCustomText(text) {
  // Jagame teksti ridade kaupa
  const lines = text.split("\n");
  let html = "";
  let inList = false; // Kas hetkel ollakse loendis (<ul>)

  for (let line of lines) {
    line = line.trim(); // Eemaldame üleliigsed tühikud

    // **Bold** märgend: ||tekst||
    line = line.replace(/\|\|(.*?)\|\|/g, "<strong>$1</strong>");

    // Tühi rida – sulgeme vajadusel loendi
    if (line === "") {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      continue;
    }

    // --------------------------------------------
    // H1 pealkiri süntaksiga:
    // # class="stiil" Tekst
    // --------------------------------------------
    if (line.startsWith("# ")) {
      const match = line.match(/^# class="(.*?)" (.*)$/);
      if (match) {
        html += `<h1 class="${match[1]}">${match[2]}</h1>`;
        continue;
      }
    }

    // --------------------------------------------
    // H2 pealkiri süntaksiga:
    // ## class="stiil" Tekst
    // --------------------------------------------
    if (line.startsWith("## ")) {
      const match = line.match(/^## class="(.*?)" (.*)$/);
      if (match) {
        html += `<h2 class="${match[1]}">${match[2]}</h2>`;
        continue;
      }
    }

    // --------------------------------------------
    // Lõik (paragraph) süntaksiga:
    // p class="stiil" Tekst
    // --------------------------------------------
    if (line.startsWith("p ")) {
      const match = line.match(/^p class="(.*?)" (.*)$/);
      if (match) {
        html += `<p class="${match[1]}">${match[2]}</p>`;
        continue;
      }
    }

    // --------------------------------------------
    // Loend (bullet list):
    // - Element
    // --------------------------------------------
    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${line.slice(2)}</li>`;
      continue;
    }

    // Kui loend lõppes
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  }

  // Kui fail lõppes loendi sees, sulgeme loendi
  if (inList) html += "</ul>";

  return html;
}



// ----------------------------------------------------------
// Laadib tekstifaili ja jagab sisu sektsioonideks
// ----------------------------------------------------------
function loadSectionsFromFile(file, containerIds) {
  fetch(file)
    .then(res => res.text())
    .then(text => {

      // Jagame sektsioonid kahe või enama reavahe alusel
      const sections = text.split(/\n\s*\n/);

      sections.forEach((sectionText, index) => {
        const containerId = containerIds[index];
        const container = document.getElementById(containerId);

        // Kui vastavat konteinerit pole, hoiatus
        if (!container) {
          console.warn(`No container found for id: ${containerId}`);
          return;
        }

        // Tühjendame konteineri ja lisame renderdatud HTML-i
        container.innerHTML = '';
        container.innerHTML = renderCustomText(sectionText);
      });
    })
    .catch(err => console.error('Viga faili lugemisel:', err));
}
