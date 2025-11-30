/*  
  --------------------------------------------
  Autor: Armin Kull  
  Ajaperiood: 01.11 – 31.11  
  Dokumentatsiooniallikad: StackOverflow, W3Schools, DevDocs  
  --------------------------------------------
  See skript muudab kursori välimust, kui hiir liigub linkide, nuppude või
  kaardielementide kohal. Eesmärk on anda visuaalne tagasiside interaktiivsetele
  elementidele spetsiaalsete .cur-failide abil.
*/


// Kui hiir liigub elemendi kohale, vaatame kas see on interaktiivne (a, button või .btn)
// Kui on, siis määrame töötava (active) kursoripildi.
document.addEventListener("mouseover", (e) => {
    // matches() tagastab true kui event.target vastab antud CSS-valijale
    if (e.target.matches("a, button, .btn")) {
        // Määrame kohandatud kursori (.cur) ja varukursoriks pointer
        e.target.style.cursor = "url('Pildid/cursor/Card_Working.cur'), pointer";
    }
});


// Kui hiir lahkub elemendilt, kontrollime kas see oli üks nendest elementidest
// ja tagastame kursori tagasi normaalseks (või tavalise .cur-faili järgi).
document.addEventListener("mouseout", (e) => {
    if (e.target.matches("a, button, .btn, .card")) {
        // Tagastame normaalse kursori asendi (auto kui .cur ei lae)
        e.target.style.cursor = "url('Pildid/cursor/Card_Normal.cur'), auto";
    }
});
