(function () {
  "use strict";
  var THEME_KEY = "myutn_theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var icon = document.getElementById("theme-toggle-icon");
    if (icon) {
      icon.textContent = theme === "dark" ? "☀" : "🌙";
      icon.classList.remove("spin");
      void icon.offsetWidth; /* fuerza reflow para reiniciar la animación */
      icon.classList.add("spin");
    }
  }

  function loadTheme() {
    var t = "light";
    try { t = localStorage.getItem(THEME_KEY) || "light"; } catch (e) {}
    applyTheme(t);
    return t;
  }

  function saveTheme(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }

  var currentTheme = loadTheme();

  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
      saveTheme(currentTheme);
    });
  }
})();
