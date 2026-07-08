(function () {
  "use strict";

  /* ============ HELPERS ============ */
  function $(id) { return document.getElementById(id); }
  function show(el) { el.hidden = false; }
  function hide(el) { el.hidden = true; }

  function defaultProgress(nombre) {
    return {
      currentLevelIndex: 0,
      completedLessons: [],
      stamps: [],
      profile: { name: nombre || "Estudiante UTN", avatar: "🎓" },
      congratsShown: false
    };
  }

  function normalizeEmail(v) { return (v || "").trim().toLowerCase(); }

  function emailDomainOk(email) {
    if (!ALLOWED_EMAIL_DOMAIN) return true;
    var domain = ALLOWED_EMAIL_DOMAIN.toLowerCase().replace(/^@/, "");
    return normalizeEmail(email).endsWith("@" + domain);
  }

  /* ============ AUTH-GATE UI ============ */
  var gate = $("auth-gate");
  var gateError = $("auth-error");
  var gateConfigWarning = $("auth-config-warning");
  var loginForm = $("login-form");
  var registerForm = $("register-form");
  var tabLogin = $("auth-tab-login");
  var tabRegister = $("auth-tab-register");
  var isAuthedStudent = false;
  var pendingView = null;
  var suppressNextNullReset = false;

  if (!window.__UTN_FIREBASE_READY__) {
    show(gateConfigWarning);
  }

  function setGateError(msg) {
    if (!msg) { hide(gateError); gateError.textContent = ""; return; }
    gateError.textContent = msg;
    show(gateError);
  }

  function switchTab(which) {
    setGateError("");
    var isLogin = which === "login";
    tabLogin.classList.toggle("active", isLogin);
    tabRegister.classList.toggle("active", !isLogin);
    loginForm.hidden = !isLogin;
    registerForm.hidden = isLogin;
  }
  tabLogin.addEventListener("click", function () { switchTab("login"); });
  tabRegister.addEventListener("click", function () { switchTab("register"); });

  function openGate(tab, pendingTarget) {
    pendingView = pendingTarget || null;
    switchTab(tab || "login");
    show(gate);
  }
  $("auth-open-btn").addEventListener("click", function () { openGate("login"); });
  $("auth-close").addEventListener("click", function () { hide(gate); });
  gate.addEventListener("click", function (e) { if (e.target === gate) hide(gate); });

  /* La página de inicio queda pública. Solo pedimos cuenta al intentar entrar
     a Niveles, Lección o Progreso (o a los botones del hero que llevan ahí). */
  var PROTECTED_VIEWS = ["niveles", "leccion", "progreso"];
  document.addEventListener("click", function (e) {
    if (isAuthedStudent) return;
    var navLink = e.target.closest(".main-nav a[data-nav]");
    var gotoBtn = e.target.closest("[data-goto]");
    var target = navLink ? navLink.dataset.nav : (gotoBtn ? gotoBtn.dataset.goto : null);
    if (target && PROTECTED_VIEWS.indexOf(target) !== -1) {
      e.preventDefault();
      openGate("login", target);
    }
  });

  /* ============ NAVEGACIÓN PÚBLICA (Inicio / Material de apoyo) ============
     js/app.js (que controla la navegación completa) solo se carga después de
     iniciar sesión, porque maneja el progreso del estudiante. Eso significaba
     que, sin sesión, el enlace "Material de apoyo" no hacía nada. Este router
     ligero permite mostrar Inicio y Material de apoyo sin sesión ni registro,
     sin cargar la lógica de lecciones/progreso que sí requiere cuenta. */
  var PUBLIC_VIEWS = ["inicio", "material"];
  var publicViewEls = document.querySelectorAll(".view");
  var publicNavLinks = document.querySelectorAll("[data-nav]");

  function showPublicView(name) {
    publicViewEls.forEach(function (v) { v.hidden = v.dataset.view !== name; });
    publicNavLinks.forEach(function (a) { a.classList.toggle("active", a.dataset.nav === name); });
    window.scrollTo({ top: 0, behavior: "smooth" });
    var mainNav = $("main-nav");
    if (mainNav) mainNav.classList.remove("open");
    var navToggleBtn = $("nav-toggle");
    if (navToggleBtn) navToggleBtn.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", function (e) {
    if (isAuthedStudent) return; // con sesión, js/app.js controla la navegación
    var navLink = e.target.closest("[data-nav]");
    var gotoBtn = e.target.closest("[data-goto]");
    var target = navLink ? navLink.dataset.nav : (gotoBtn ? gotoBtn.dataset.goto : null);
    if (!target || PUBLIC_VIEWS.indexOf(target) === -1) return;
    e.preventDefault();
    showPublicView(target);
  });

  /* Si la página se abre directamente con un hash público (ej. #material),
     muestra esa vista desde el inicio. */
  (function () {
    var initialHash = (location.hash || "").replace("#", "");
    if (!isAuthedStudent && PUBLIC_VIEWS.indexOf(initialHash) !== -1) {
      showPublicView(initialHash);
    }
  })();

  function friendlyAuthError(err) {
    var code = err && err.code;
    var map = {
      "auth/invalid-email": "El correo no tiene un formato válido.",
      "auth/user-not-found": "No existe una cuenta con ese correo.",
      "auth/wrong-password": "Contraseña incorrecta.",
      "auth/invalid-credential": "Correo o contraseña incorrectos.",
      "auth/email-already-in-use": "Ya existe una cuenta registrada con ese correo.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
      "auth/too-many-requests": "Demasiados intentos. Espera un momento e intenta de nuevo."
    };
    return (map[code]) || "Ocurrió un error. Intenta de nuevo.";
  }

  /* ============ MOSTRAR/OCULTAR CONTRASEÑA ============ */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".password-toggle");
    if (!btn) return;
    var input = $(btn.dataset.target);
    if (!input) return;
    var showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.textContent = showing ? "👁" : "🙈";
    btn.setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
  });

  /* ============ LOGIN ============ */
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    setGateError("");
    if (!window.__UTN_FIREBASE_READY__) { show(gateConfigWarning); return; }
    var email = normalizeEmail($("login-email").value);
    var pass = $("login-password").value;
    if (!email || !pass) { setGateError("Completa correo y contraseña."); return; }

    var btn = $("login-submit");
    btn.disabled = true; btn.textContent = "Entrando…";

    auth.signInWithEmailAndPassword(email, pass)
      .catch(function (err) {
        setGateError(friendlyAuthError(err));
      })
      .finally(function () {
        btn.disabled = false; btn.textContent = "Iniciar sesión";
      });
  });

  $("forgot-password").addEventListener("click", function (e) {
    e.preventDefault();
    var email = normalizeEmail($("login-email").value);
    if (!email) { setGateError("Escribe tu correo arriba y vuelve a presionar 'Olvidé mi contraseña'."); return; }
    auth.sendPasswordResetEmail(email)
      .then(function () { setGateError("Te enviamos un correo para restablecer tu contraseña."); })
      .catch(function (err) { setGateError(friendlyAuthError(err)); });
  });

  /* ============ REGISTRO (solo estudiantes) ============ */
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    setGateError("");
    if (!window.__UTN_FIREBASE_READY__) { show(gateConfigWarning); return; }
    var nombre = $("reg-nombre").value.trim();
    var email = normalizeEmail($("reg-email").value);
    var boleta = $("reg-boleta").value.trim();
    var pass = $("reg-password").value;
    var pass2 = $("reg-password2").value;

    if (!nombre || !email || !boleta || !pass) { setGateError("Completa todos los campos."); return; }
    if (pass.length < 6) { setGateError("La contraseña debe tener al menos 6 caracteres."); return; }
    if (pass !== pass2) { setGateError("Las contraseñas no coinciden."); return; }
    if (normalizeEmail(email) === normalizeEmail(ADMIN_EMAIL)) { setGateError("Ese correo está reservado para el administrador."); return; }
    if (!emailDomainOk(email)) { setGateError("Usa tu correo institucional (@" + ALLOWED_EMAIL_DOMAIN + ")."); return; }

    var btn = $("register-submit");
    btn.disabled = true; btn.textContent = "Creando cuenta…";

    auth.createUserWithEmailAndPassword(email, pass)
      .then(function (cred) {
        return db.collection("students").doc(cred.user.uid).set({
          nombre: nombre,
          correo: email,
          boleta: boleta,
          grupo: "",
          disabled: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          progress: defaultProgress(nombre)
        });
      })
      .catch(function (err) {
        setGateError(friendlyAuthError(err));
      })
      .finally(function () {
        btn.disabled = false; btn.textContent = "Crear cuenta";
      });
  });

  /* ============ LOGOUT ============ */
  function wireLogout(id) {
    var btn = $(id);
    if (btn) btn.addEventListener("click", function () {
      auth.signOut().finally(function () { location.reload(); });
    });
  }
  wireLogout("logout-btn");
  wireLogout("admin-logout-btn");

  /* ============ SYNC DE PROGRESO (estudiante) ============ */
  var syncTimer = null;
  function makeSync(uid) {
    return function (progress) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(function () {
        db.collection("students").doc(uid).update({
          progress: progress,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function () { /* se reintentará en el próximo cambio */ });
      }, 800);
    };
  }

  function loadAppScriptOnce(callback) {
    var existing = document.getElementById("utn-app-script");
    if (existing) { existing.parentNode.removeChild(existing); }
    var s = document.createElement("script");
    s.id = "utn-app-script";
    s.src = "js/app.js";
    s.onload = callback;
    document.body.appendChild(s);
  }

  function startStudentSession(uid, data) {
    isAuthedStudent = true;
    hide(gate);
    hide($("admin-shell"));
    show($("app-header"));
    show($("main"));
    show($("header-authed-actions"));
    hide($("auth-open-btn"));
    $("nav-student-name").textContent = data.nombre || "Estudiante UTN";

    if (window.__UTN_UID__ === uid && document.getElementById("utn-app-script")) {
      goToPendingView();
      return;
    }
    window.__UTN_UID__ = uid;
    window.__UTN_SYNC__ = makeSync(uid);
    try {
      localStorage.setItem("myutn_progress_v2_" + uid, JSON.stringify(data.progress || defaultProgress(data.nombre)));
    } catch (e) {}
    loadAppScriptOnce(function () { goToPendingView(); });
  }

  function goToPendingView() {
    if (!pendingView) return;
    var link = document.querySelector('.main-nav a[data-nav="' + pendingView + '"]');
    if (link) link.click();
    pendingView = null;
  }

  function resetToGuestUI() {
    isAuthedStudent = false;
    hide($("header-authed-actions"));
    show($("auth-open-btn"));
    hide($("admin-shell"));
    show($("app-header"));
    show($("main"));
  }

  /* ============ SESIÓN ============ */
  auth.onAuthStateChanged(function (user) {
    if (suppressNextNullReset && !user) { suppressNextNullReset = false; return; }

    if (!user) {
      resetToGuestUI();
      return;
    }

    if (normalizeEmail(user.email) === normalizeEmail(ADMIN_EMAIL)) {
      isAuthedStudent = false;
      hide(gate);
      hide($("header-authed-actions"));
      show($("auth-open-btn"));
      hide($("app-header"));
      hide($("main"));
      show($("admin-shell"));
      $("admin-name").textContent = user.email;
      initAdminPanel();
      return;
    }

    db.collection("students").doc(user.uid).get().then(function (doc) {
      if (!doc.exists) {
        setGateError("No encontramos tu registro de estudiante. Contacta a tu profesor.");
        show(gate);
        suppressNextNullReset = true;
        auth.signOut();
        return;
      }
      var data = doc.data();
      if (data.disabled) {
        setGateError("Tu cuenta fue deshabilitada por el profesor. Contacta a tu profesor.");
        show(gate);
        suppressNextNullReset = true;
        auth.signOut();
        return;
      }
      startStudentSession(user.uid, data);
    }).catch(function () {
      setGateError("No se pudo verificar tu cuenta. Revisa tu conexión e intenta de nuevo.");
      show(gate);
      suppressNextNullReset = true;
      auth.signOut();
    });
  });

  /* ============ PANEL DE ADMINISTRADOR ============ */
  var LEVEL_CODES = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var allStudents = [];

  function fmtDate(ts) {
    if (!ts || !ts.toDate) return "—";
    return ts.toDate().toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "numeric" });
  }

  function studentRowHtml(id, d) {
    var progress = d.progress || {};
    var nivel = LEVEL_CODES[progress.currentLevelIndex || 0] || "A1";
    var sellos = (progress.stamps || []).length;
    return (
      '<tr data-id="' + id + '">' +
      '<td>' + (d.disabled ? '<span class="admin-badge disabled">Deshabilitado</span> ' : '') + escapeHtml(d.nombre || "") + "</td>" +
      "<td>" + escapeHtml(d.correo || "") + "</td>" +
      "<td>" + escapeHtml(d.boleta || "") + "</td>" +
      '<td><select class="group-select" data-id="' + id + '" aria-label="Grupo de ' + escapeHtml(d.nombre || "el estudiante") + '">' + groupOptionsHtml(d.grupo || "") + "</select></td>" +
      "<td>" + nivel + "</td>" +
      "<td>" + sellos + "/6</td>" +
      "<td>" + fmtDate(d.createdAt) + "</td>" +
      '<td class="admin-actions">' +
      '<button class="btn-mini" data-action="view">Ver</button>' +
      '<button class="btn-mini" data-action="edit">Editar</button>' +
      '<button class="btn-mini" data-action="toggle">' + (d.disabled ? "Habilitar" : "Deshabilitar") + "</button>" +
      "</td></tr>"
    );
  }

  function collectGroups() {
    var set = {};
    allStudents.forEach(function (s) {
      var g = (s.data.grupo || "").trim();
      if (g) set[g] = true;
    });
    return Object.keys(set).sort();
  }

  function groupOptionsHtml(selected) {
    var groups = collectGroups();
    var html = '<option value=""' + (selected ? "" : " selected") + '>Sin asignar</option>';
    groups.forEach(function (g) {
      html += '<option value="' + escapeHtml(g) + '"' + (g === selected ? " selected" : "") + '>' + escapeHtml(g) + "</option>";
    });
    html += '<option value="__new__">+ Nuevo grupo…</option>';
    return html;
  }

  function refreshGroupFilterOptions() {
    var sel = $("admin-group-filter");
    if (!sel) return;
    var current = sel.value;
    var groups = collectGroups();
    var html = '<option value="">Todos los grupos</option><option value="__none__">Sin asignar</option>';
    groups.forEach(function (g) {
      html += '<option value="' + escapeHtml(g) + '">' + escapeHtml(g) + "</option>";
    });
    sel.innerHTML = html;
    var stillExists = false;
    for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === current) stillExists = true;
    sel.value = stillExists ? current : "";
  }

  function renderAdminStats(list) {
    var wrap = $("admin-stats");
    if (!wrap) return;
    var total = list.length;
    var activos = list.filter(function (s) { return !s.data.disabled; }).length;
    var totalStamps = 0;
    list.forEach(function (s) { totalStamps += ((s.data.progress && s.data.progress.stamps) || []).length; });
    var avgStamps = total ? (totalStamps / total).toFixed(1) : "0.0";
    var grupos = collectGroups().length;
    wrap.innerHTML =
      '<div class="admin-stat-card"><span class="admin-stat-num">' + total + '</span><span class="admin-stat-label">Estudiantes</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-num">' + activos + '</span><span class="admin-stat-label">Activos</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-num">' + avgStamps + '</span><span class="admin-stat-label">Sellos promedio</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-num">' + grupos + '</span><span class="admin-stat-label">Grupos asignados</span></div>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function renderStudentTable(list) {
    var tbody = $("admin-table-body");
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">No hay estudiantes registrados todavía.</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (s) { return studentRowHtml(s.id, s.data); }).join("");
  }

  function refreshStudents() {
    var tbody = $("admin-table-body");
    tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">Cargando…</td></tr>';
    db.collection("students").orderBy("nombre").get().then(function (snap) {
      allStudents = [];
      snap.forEach(function (doc) { allStudents.push({ id: doc.id, data: doc.data() }); });
      renderAdminStats(allStudents);
      refreshGroupFilterOptions();
      applyFilter();
    }).catch(function () {
      tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">No se pudo cargar la lista. Revisa las reglas de Firestore.</td></tr>';
    });
  }

  function applyFilter() {
    var q = normalizeEmail($("admin-search").value);
    var groupFilterEl = $("admin-group-filter");
    var groupFilter = groupFilterEl ? groupFilterEl.value : "";
    var filtered = allStudents.filter(function (s) {
      var d = s.data;
      var matchesQuery = !q || (
        (d.nombre || "").toLowerCase().indexOf(q) !== -1 ||
        (d.correo || "").toLowerCase().indexOf(q) !== -1 ||
        (d.boleta || "").toLowerCase().indexOf(q) !== -1
      );
      var matchesGroup = true;
      if (groupFilter === "__none__") matchesGroup = !((d.grupo || "").trim());
      else if (groupFilter) matchesGroup = (d.grupo || "") === groupFilter;
      return matchesQuery && matchesGroup;
    });
    renderStudentTable(filtered);
  }

  var searchInput = $("admin-search");
  if (searchInput) searchInput.addEventListener("input", applyFilter);
  var groupFilterSelect = $("admin-group-filter");
  if (groupFilterSelect) groupFilterSelect.addEventListener("change", applyFilter);

  function findStudent(id) {
    for (var i = 0; i < allStudents.length; i++) if (allStudents[i].id === id) return allStudents[i];
    return null;
  }

  /* --- Ver progreso --- */
  var viewModal = $("admin-view-modal");
  function openViewModal(id) {
    var s = findStudent(id);
    if (!s) return;
    var d = s.data, p = d.progress || {};
    $("admin-view-title").textContent = d.nombre || "Estudiante";
    var nivel = LEVEL_CODES[p.currentLevelIndex || 0] || "A1";
    var stamps = p.stamps || [];
    var body =
      "<p><strong>Correo:</strong> " + escapeHtml(d.correo || "") + "</p>" +
      "<p><strong>Matrícula:</strong> " + escapeHtml(d.boleta || "") + "</p>" +
      "<p><strong>Grupo:</strong> " + escapeHtml(d.grupo || "Sin asignar") + "</p>" +
      "<p><strong>Nivel actual:</strong> " + nivel + "</p>" +
      "<p><strong>Sellos obtenidos:</strong> " + stamps.length + " de 6 (" + (stamps.join(", ") || "ninguno") + ")</p>" +
      "<p><strong>Lecciones completadas:</strong> " + ((p.completedLessons || []).length) + "</p>" +
      "<p><strong>Certificado disponible:</strong> " + (stamps.length === 6 ? "Sí" : "No") + "</p>";
    $("admin-view-body").innerHTML = body;
    show(viewModal);
  }
  $("admin-view-close").addEventListener("click", function () { hide(viewModal); });
  viewModal.addEventListener("click", function (e) { if (e.target === viewModal) hide(viewModal); });

  /* --- Editar --- */
  var editModal = $("admin-edit-modal");
  var editingId = null;

  function openEditModal(id) {
    var s = findStudent(id);
    if (!s) return;
    editingId = id;
    $("edit-nombre").value = s.data.nombre || "";
    $("edit-boleta").value = s.data.boleta || "";
    $("edit-grupo").value = s.data.grupo || "";
    $("edit-correo-display").textContent = s.data.correo || "";
    show(editModal);
  }
  $("admin-edit-cancel").addEventListener("click", function () { hide(editModal); });
  editModal.addEventListener("click", function (e) { if (e.target === editModal) { hide(editModal); } });
  $("admin-edit-save").addEventListener("click", function () {
    if (!editingId) return;
    var nombre = $("edit-nombre").value.trim();
    var boleta = $("edit-boleta").value.trim();
    var grupo = $("edit-grupo").value.trim();
    if (!nombre) { return; }
    var s = findStudent(editingId);
    var updates = { nombre: nombre, boleta: boleta, grupo: grupo };
    if (s && s.data.progress) {
      updates["progress.profile.name"] = nombre;
    }
    db.collection("students").doc(editingId).update(updates).then(function () {
      hide(editModal);
      refreshStudents();
    });
  });

  /* --- Deshabilitar --- */
  /* Las cuentas de estudiantes nunca se eliminan, ni desde este panel ni desde
     ningún otro lugar. La única acción disponible para restringir el acceso
     de un estudiante es deshabilitar su cuenta (ver toggleDisabled). */
  function toggleDisabled(id) {
    var s = findStudent(id);
    if (!s) return;
    db.collection("students").doc(id).update({ disabled: !s.data.disabled }).then(refreshStudents);
  }

  $("admin-table-body").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-action]");
    if (!btn) return;
    var id = btn.closest("tr").dataset.id;
    var action = btn.dataset.action;
    if (action === "view") openViewModal(id);
    else if (action === "edit") openEditModal(id);
    else if (action === "toggle") toggleDisabled(id);
  });

  $("admin-table-body").addEventListener("change", function (e) {
    var sel = e.target.closest("select.group-select");
    if (!sel) return;
    var id = sel.dataset.id;
    var s = findStudent(id);
    var val = sel.value;
    if (val === "__new__") {
      var nuevo = prompt("Escribe el nombre del nuevo grupo (ej. IDS-501):");
      if (!nuevo || !nuevo.trim()) { sel.value = (s && s.data.grupo) || ""; return; }
      val = nuevo.trim();
    }
    db.collection("students").doc(id).update({ grupo: val }).then(refreshStudents);
  });

  function initAdminPanel() {
    refreshStudents();
  }
})();
