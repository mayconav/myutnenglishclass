"use strict";
/* Perfil del estudiante (avatar) (app.js original: L388-L435) */
  /* ============ PROFILE ============ */
  /* Avatars are stored as icon names; older profiles saved an emoji, so normalize. */
  function normAvatar(v) { return UTNIcons.has(v) ? v : (UTNIcons.legacy[v] || "owl"); }
  var avatarGrid = document.getElementById("avatar-grid");
  var selectedAvatar = normAvatar(state.profile.avatar);

  function renderAvatarGrid() {
    avatarGrid.innerHTML = "";
    AVATARS.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "avatar-option" + (a === selectedAvatar ? " selected" : "");
      b.innerHTML = UTNIcons.avatar(a);
      b.addEventListener("click", function () {
        selectedAvatar = a;
        avatarGrid.querySelectorAll(".avatar-option").forEach(function (el) { el.classList.remove("selected"); });
        b.classList.add("selected");
      });
      avatarGrid.appendChild(b);
    });
  }

  function openProfileModal() {
    document.getElementById("profile-name-input").value = state.profile.name;
    selectedAvatar = normAvatar(state.profile.avatar);
    renderAvatarGrid();
    document.getElementById("profile-modal").hidden = false;
  }
  function closeProfileModal() { document.getElementById("profile-modal").hidden = true; }

  document.getElementById("profile-open").addEventListener("click", openProfileModal);
  document.getElementById("profile-cancel").addEventListener("click", closeProfileModal);
  document.getElementById("profile-save").addEventListener("click", function () {
    var name = document.getElementById("profile-name-input").value.trim();
    state.profile.name = name || "UTN Student";
    state.profile.avatar = selectedAvatar;
    saveProgress(state);
    updateProfileUI();
    closeProfileModal();
  });
  document.getElementById("profile-modal").addEventListener("click", function (e) {
    if (e.target.id === "profile-modal") closeProfileModal();
  });

  function updateProfileUI() {
    document.getElementById("profile-chip-avatar").innerHTML = UTNIcons.avatar(state.profile.avatar);
    document.getElementById("bp-name").textContent = state.profile.name;
    document.getElementById("bp-avatar").innerHTML = UTNIcons.avatar(state.profile.avatar);
  }

