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
        if (!currentPhoto()) renderPhotoPreview();
        avatarGrid.querySelectorAll(".avatar-option").forEach(function (el) { el.classList.remove("selected"); });
        b.classList.add("selected");
      });
      avatarGrid.appendChild(b);
    });
  }

  /* ---- Foto de perfil ----
     pendingPhoto: undefined = sin cambios, null = quitar foto, string = foto nueva (data URL JPEG 192x192). */
  var pendingPhoto;
  var PHOTO_SIZE = 192;
  function currentPhoto() {
    if (pendingPhoto === null) return "";
    var v = pendingPhoto !== undefined ? pendingPhoto : state.profile.photo;
    return UTNIcons.photoOk(v) ? v : "";
  }
  function renderPhotoPreview() {
    var v = currentPhoto();
    var box = document.getElementById("photo-preview");
    box.innerHTML = v ? UTNIcons.photo(v) : UTNIcons.avatar(selectedAvatar);
    document.getElementById("photo-remove").hidden = !v;
    document.getElementById("photo-choose").textContent = v ? "Change photo" : "Choose photo";
  }
  function photoToDataUrl(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) { reject(new Error("type")); return; }
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error("read")); };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error("decode")); };
        img.onload = function () {
          var side = Math.min(img.naturalWidth, img.naturalHeight);
          if (!side) { reject(new Error("decode")); return; }
          var sx = (img.naturalWidth - side) / 2, sy = (img.naturalHeight - side) / 2;
          var canvas = document.createElement("canvas");
          canvas.width = PHOTO_SIZE; canvas.height = PHOTO_SIZE;
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, PHOTO_SIZE, PHOTO_SIZE);
          ctx.drawImage(img, sx, sy, side, side, 0, 0, PHOTO_SIZE, PHOTO_SIZE);
          var out = canvas.toDataURL("image/jpeg", 0.82);
          if (!UTNIcons.photoOk(out)) { reject(new Error("size")); return; }
          resolve(out);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  document.getElementById("photo-choose").addEventListener("click", function () {
    document.getElementById("photo-input").click();
  });
  document.getElementById("photo-input").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    photoToDataUrl(file).then(function (url) {
      pendingPhoto = url;
      renderPhotoPreview();
    }).catch(function () {
      if (typeof showGenericToast === "function") showGenericToast("Could not use that image. Try a JPG or PNG photo.");
    });
  });
  document.getElementById("photo-remove").addEventListener("click", function () {
    pendingPhoto = null;
    renderPhotoPreview();
  });

  /* Foto si existe; si no, el avatar de siempre */
  function profileAvatarHtml() {
    return UTNIcons.photo(state.profile.photo) || UTNIcons.avatar(state.profile.avatar);
  }

  function openProfileModal() {
    document.getElementById("profile-name-input").value = state.profile.name;
    selectedAvatar = normAvatar(state.profile.avatar);
    pendingPhoto = undefined;
    renderAvatarGrid();
    renderPhotoPreview();
    document.getElementById("profile-modal").hidden = false;
  }
  function closeProfileModal() { document.getElementById("profile-modal").hidden = true; }

  document.getElementById("profile-open").addEventListener("click", openProfileModal);
  document.getElementById("profile-cancel").addEventListener("click", closeProfileModal);
  document.getElementById("profile-save").addEventListener("click", function () {
    var name = document.getElementById("profile-name-input").value.trim();
    state.profile.name = name || "UTN Student";
    state.profile.avatar = selectedAvatar;
    if (pendingPhoto === null) delete state.profile.photo;
    else if (pendingPhoto) state.profile.photo = pendingPhoto;
    pendingPhoto = undefined;
    saveProgress(state);
    if (typeof window.__UTN_BINGO_SET_PHOTO__ === "function") window.__UTN_BINGO_SET_PHOTO__();
    updateProfileUI();
    closeProfileModal();
  });
  document.getElementById("profile-modal").addEventListener("click", function (e) {
    if (e.target.id === "profile-modal") closeProfileModal();
  });

  function updateProfileUI() {
    document.getElementById("profile-chip-avatar").innerHTML = profileAvatarHtml();
    document.getElementById("bp-name").textContent = state.profile.name;
    document.getElementById("bp-avatar").innerHTML = profileAvatarHtml();
  }

