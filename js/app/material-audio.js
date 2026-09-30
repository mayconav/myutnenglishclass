"use strict";
/* ============ SUPPORT MATERIAL - PRONUNCIACION ============
   Agrega audio a las tablas de verbos irregulares del Material de Apoyo usando
   la voz del navegador (speechSynthesis), asi que no hay archivos de audio que
   subir ni descargar.
   - Tocar cualquiera de las tres formas (Base / Past Simple / Past Participle)
     pronuncia solo esa palabra.
   - El boton 🔊 de cada fila pronuncia las tres formas en orden. */
(function () {
  var groups = document.getElementById("material-groups");
  if (!groups || !("speechSynthesis" in window)) return;

  var voice = null;
  function pickVoice() {
    var voices = window.speechSynthesis.getVoices() || [];
    voice = voices.filter(function (v) { return /^en(-|_)US/i.test(v.lang); })[0] ||
            voices.filter(function (v) { return /^en/i.test(v.lang); })[0] || null;
  }
  pickVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined) window.speechSynthesis.onvoiceschanged = pickVoice;

  /* "was / were" -> "was, were" para que lea las dos variantes con pausa. */
  function cleanText(t) { return String(t).replace(/\s*\/\s*/g, ", ").trim(); }

  function say(words) {
    try {
      window.speechSynthesis.cancel();
      words.forEach(function (w) {
        var u = new SpeechSynthesisUtterance(cleanText(w));
        u.lang = "en-US";
        u.rate = 0.85;
        if (voice) u.voice = voice;
        window.speechSynthesis.speak(u);
      });
    } catch (e) {}
  }

  Array.prototype.slice.call(groups.querySelectorAll(".material-table tbody tr")).forEach(function (row) {
    var cells = row.querySelectorAll("td");
    if (cells.length < 3) return;
    var words = [cells[0].textContent, cells[1].textContent, cells[2].textContent];

    for (var i = 0; i < 3; i++) {
      (function (cell, word) {
        cell.classList.add("speakable");
        cell.setAttribute("title", "Toca para escuchar");
        cell.addEventListener("click", function () { say([word]); });
      })(cells[i], words[i]);
    }

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "material-speak-btn";
    btn.setAttribute("aria-label", "Escuchar " + words[0].trim() + ", " + words[1].trim() + ", " + words[2].trim());
    btn.title = "Escuchar las 3 formas";
    btn.textContent = "🔊";
    btn.addEventListener("click", function (e) { e.stopPropagation(); say(words); });
    cells[0].appendChild(btn);
  });
})();
