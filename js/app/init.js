"use strict";
/* Inicializacion de la aplicacion (app.js original: L2482-L2489) */
  /* ============ INIT ============ */
  updateBoardingPass();
  updateProfileUI();
  (function initialView() {
    var hash = (location.hash || "").replace("#", "");
    var valid = hash && document.querySelector('.view[data-view="' + hash + '"]');
    goto(valid ? hash : "inicio");
  })();
