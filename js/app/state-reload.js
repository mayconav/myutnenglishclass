"use strict";
/* Recarga de estado (llamado por auth.js tras iniciar sesion) (app.js original: L1641-L1654) */
  /* ============ STATE RELOAD (called by auth.js after logging in) ============
     We don't reload the page: we reread progress now with window.__UTN_UID__
     set, and repaint the view the person was already on. */
  function reloadAppState() {
    state = loadProgress();
    activeLevelIndex = state.currentLevelIndex;
    selectedAvatar = state.profile.avatar;
    updateBoardingPass();
    updateProfileUI();
    var currentView = document.querySelector(".view:not([hidden])");
    goto(currentView ? currentView.dataset.view : "inicio");
  }
  window.__UTN_APP_RELOAD__ = reloadAppState;

