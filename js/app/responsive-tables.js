"use strict";
/* ============ TABLAS RESPONSIVAS ============
   Copia el texto de cada <th> a un atributo data-label en las <td> de su columna
   (lo usa el CSS movil para mostrar cada fila como tarjeta) y marca con
   .table-stack las tablas de 4+ columnas. Tambien observa el DOM porque las
   tablas de gramatica se generan dinamicamente. */
(function () {
  function prepare(table) {
    if (table.dataset.rt === "1") return;
    var heads = Array.prototype.map.call(table.querySelectorAll("thead th"), function (th) {
      return th.textContent.trim();
    });
    if (!heads.length) return;
    table.dataset.rt = "1";
    if (heads.length >= 4) table.classList.add("table-stack");
    Array.prototype.forEach.call(table.querySelectorAll("tbody tr"), function (tr) {
      Array.prototype.forEach.call(tr.children, function (td, i) {
        if (heads[i] && !td.hasAttribute("data-label")) td.setAttribute("data-label", heads[i]);
      });
    });
  }
  function scan(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll(".material-table"), prepare);
  }
  scan();
  var pending = false;
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; scan(); });
  }).observe(document.body, { childList: true, subtree: true });
})();
