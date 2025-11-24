// Renders simple markdown-like syntax (#, ##, -, text)
function renderCustomText(text) {
  const lines = text.split("\n");
  let html = "";
  let inList = false;

  for (let line of lines) {
    line = line.trim();

    // Strong
    line = line.replace(/\|\|(.*?)\|\|/g, "<strong>$1</strong>");

    if (line === "") {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      const match = line.match(/^# class="(.*?)" (.*)$/);
      if (match) {
        html += `<h1 class="${match[1]}">${match[2]}</h1>`;
        continue;
      }
    }

    // H2
    if (line.startsWith("## ")) {
      const match = line.match(/^## class="(.*?)" (.*)$/);
      if (match) {
        html += `<h2 class="${match[1]}">${match[2]}</h2>`;
        continue;
      }
    }

    // Paragraph
    if (line.startsWith("p ")) {
      const match = line.match(/^p class="(.*?)" (.*)$/);
      if (match) {
        html += `<p class="${match[1]}">${match[2]}</p>`;
        continue;
      }
    }

    // Lists
    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${line.slice(2)}</li>`;
      continue;
    }

    if (inList) {
      html += "</ul>";
      inList = false;
    }
  }

  if (inList) html += "</ul>";

  return html;
}



// Loads one file and splits content into sections separated by blank lines
function loadSectionsFromFile(file, containerIds) {
  fetch(file)
    .then(res => res.text())
    .then(text => {
      // Split sections by two or more newlines
      const sections = text.split(/\n\s*\n/);

      sections.forEach((sectionText, index) => {
        const containerId = containerIds[index];
        const container = document.getElementById(containerId);

        if (!container) {
          console.warn(`No container found for id: ${containerId}`);
          return;
        }

        container.innerHTML = '';
        container.innerHTML = renderCustomText(sectionText);
      });
    })
    .catch(err => console.error('Viga faili lugemisel:', err));
}

