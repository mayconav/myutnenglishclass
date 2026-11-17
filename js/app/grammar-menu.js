"use strict";
/* Menu de Grammar: buscador de temas y filtro "Show upcoming topics".
   Un tema esta "listo" si grammar-render.js le puso la clase .has-content (tiene
   contenido en GRAMMAR_CONTENT). Los demas se marcan .is-soon y, por defecto, se
   ocultan para que el estudiante solo vea lo que funciona. Se carga DESPUES de
   grammar-render.js. */
(function () {
  var menu = document.getElementById("grammar-menu");
  var input = document.getElementById("grammar-search-input");
  if (!menu || !input) return;

  var clearBtn = document.getElementById("grammar-search-clear");
  var toggle = document.getElementById("grammar-show-soon");
  var countEl = document.getElementById("grammar-ready-count");
  var emptyEl = document.getElementById("grammar-empty");
  var cats = Array.prototype.slice.call(menu.querySelectorAll(".grammar-cat"));
  var STORE_KEY = "myutn_grammar_show_soon";
  var wasSearching = false;

  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  /* Marca cada tema y guarda su texto de busqueda */
  var allTopics = Array.prototype.slice.call(menu.querySelectorAll(".grammar-topic"));
  var readyTotal = 0;
  allTopics.forEach(function (t) {
    var ready = t.classList.contains("has-content");
    t.classList.add(ready ? "is-ready" : "is-soon");
    if (ready) readyTotal++;
    else t.setAttribute("aria-disabled", "true");
    t.dataset.search = norm(t.textContent);
  });

  /* Cada categoria guarda su conteo original y una nota para cuando no hay nada listo */
  cats.forEach(function (cat) {
    var ready = cat.querySelectorAll(".grammar-topic.is-ready").length;
    cat.dataset.ready = ready;
    cat.dataset.total = cat.querySelectorAll(".grammar-topic").length;
    var countSpan = cat.querySelector(".grammar-cat-count");
    if (countSpan) {
      countSpan.textContent = ready ? ready + " of " + cat.dataset.total + " ready" : "Coming soon";
    }
    if (!ready) {
      cat.classList.add("is-all-soon");
      var note = document.createElement("p");
      note.className = "grammar-cat-soon-note";
      note.textContent = "The topics in this category are on their way. Turn on “Show upcoming topics” to preview the syllabus.";
      cat.insertBefore(note, cat.querySelector(".grammar-topics") || null);
    }
  });

  function applyFilters() {
    var query = norm(input.value);
    var tokens = query ? query.split(" ") : [];
    var searching = tokens.length > 0;
    var showSoon = toggle.checked;
    var shown = 0, soonMatches = 0;

    menu.classList.toggle("show-soon", showSoon);
    clearBtn.hidden = !input.value;

    cats.forEach(function (cat) {
      var catTitle = norm(cat.querySelector(".grammar-cat-title").textContent);
      var catVisible = 0;
      var pending = [];
      var seenBlock = false;

      Array.prototype.slice.call(cat.children).forEach(function (el) {
        if (el.classList.contains("grammar-subgroup")) {
          seenBlock = true;
          pending = [el];
        } else if (el.classList.contains("grammar-cat-desc") && seenBlock) {
          pending.push(el);
        } else if (el.classList.contains("grammar-topics")) {
          var subTitle = pending.length ? norm(pending[0].textContent) : "";
          var blockVisible = 0;
          Array.prototype.slice.call(el.querySelectorAll(".grammar-topic")).forEach(function (t) {
            var hay = t.dataset.search + " " + catTitle + " " + subTitle;
            var match = tokens.every(function (tok) { return hay.indexOf(tok) !== -1; });
            var ready = t.classList.contains("is-ready");
            var show = match && (ready || showSoon);
            t.hidden = !show;
            if (show) blockVisible++;
            else if (match && !ready) soonMatches++;
          });
          el.hidden = blockVisible === 0;
          pending.forEach(function (p) { p.hidden = blockVisible === 0; });
          catVisible += blockVisible;
          pending = [];
        }
      });

      var allSoonNote = cat.classList.contains("is-all-soon") && !showSoon && !searching;
      cat.hidden = searching ? catVisible === 0 : false;
      cat.classList.toggle("show-note", allSoonNote);
      shown += catVisible;

      if (searching && catVisible > 0) {
        if (!wasSearching) cat.dataset.wasOpen = cat.open ? "1" : "0";
        cat.open = true;
      } else if (!searching && wasSearching && cat.dataset.wasOpen !== undefined) {
        cat.open = cat.dataset.wasOpen === "1";
        delete cat.dataset.wasOpen;
      }
    });
    wasSearching = searching;

    if (searching) {
      countEl.textContent = shown + (shown === 1 ? " topic found" : " topics found");
    } else {
      countEl.textContent = readyTotal + " of " + allTopics.length + " topics ready · more coming soon";
    }

    emptyEl.hidden = !(searching && shown === 0);
    if (!emptyEl.hidden) {
      emptyEl.textContent = "";
      var msg = document.createElement("span");
      if (soonMatches > 0 && !showSoon) {
        msg.textContent = "No ready topics match “" + input.value.trim() + "”, but " + soonMatches + " upcoming " + (soonMatches === 1 ? "topic does. " : "topics do. ");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "grammar-empty-btn";
        btn.textContent = "Show upcoming topics";
        btn.addEventListener("click", function () { toggle.checked = true; saveToggle(); applyFilters(); });
        emptyEl.appendChild(msg);
        emptyEl.appendChild(btn);
      } else {
        msg.textContent = "No topics match “" + input.value.trim() + "”. Try another word, like “perfect”, “adverbs” or “past”.";
        emptyEl.appendChild(msg);
      }
    }
  }

  function saveToggle() {
    try { localStorage.setItem(STORE_KEY, toggle.checked ? "1" : "0"); } catch (e) {}
  }
  try { toggle.checked = localStorage.getItem(STORE_KEY) === "1"; } catch (e) {}

  input.addEventListener("input", applyFilters);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && input.value) { input.value = ""; applyFilters(); }
  });
  clearBtn.addEventListener("click", function () { input.value = ""; applyFilters(); input.focus(); });
  toggle.addEventListener("change", function () { saveToggle(); applyFilters(); });

  applyFilters();
})();
