/* Descarga de la app Android:
   - En el navegador de un Android: muestra un aviso arriba (se puede cerrar).
   - Dentro de la app instalada o como PWA: oculta todo lo relacionado con descargar. */
(function () {
  function enApp() {
    try {
      if (window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform()) return true;
    } catch (e) {}
    if (/MyUTNApp/i.test(navigator.userAgent)) return true;
    try { if (window.matchMedia("(display-mode: standalone)").matches) return true; } catch (e) {}
    return false;
  }
  var inApp = enApp();
  var esAndroid = /Android/i.test(navigator.userAgent);

  // Dentro de la app: quita el enlace del footer
  if (inApp) {
    document.querySelectorAll('a[href="descargar.html"]').forEach(function (a) {
      var p = a.closest("p") || a;
      p.style.display = "none";
    });
    return;
  }

  // En navegador Android: muestra el aviso (si no lo cerraron en los ultimos 7 dias)
  if (!esAndroid) return;
  var KEY = "myutn_install_banner_closed";
  try {
    var t = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (t && Date.now() - t < 7 * 24 * 3600 * 1000) return;
  } catch (e) {}
  var b = document.getElementById("install-banner");
  if (!b) return;
  b.hidden = false;
  var x = b.querySelector(".ib-close");
  if (x) x.addEventListener("click", function () {
    b.hidden = true;
    try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
  });
})();
