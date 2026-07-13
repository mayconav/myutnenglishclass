(function () {
  "use strict";

  /* ============ HELPERS ============ */
  function $(id) { return document.getElementById(id); }
  function show(el) { el.hidden = false; }
  function hide(el) { el.hidden = true; }

  function defaultProgress(name) {
    return {
      currentLevelIndex: 0,
      completedLessons: [],
      stamps: [],
      profile: { name: name || "UTN Student", avatar: "🎓" },
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

  function openGate(tab) {
    switchTab(tab || "login");
    show(gate);
  }
  window.__UTN_OPEN_GATE__ = function (tab) { openGate(tab || "login"); };
  $("auth-open-btn").addEventListener("click", function () { openGate("login"); });
  $("auth-close").addEventListener("click", function () { hide(gate); });
  gate.addEventListener("click", function (e) { if (e.target === gate) hide(gate); });

  /* ============ ALL SECTIONS ARE PUBLIC ============
     Anyone can browse and view Home, Levels, Lesson, Skills,
     Progress, Support Material, and Grammar without logging in or registering.
     js/app.js is always loaded and controls full navigation (for
     guests it uses localStorage under the "local" key; for students,
     under their UID). The only thing that still requires an account is SOLVING
     or SUBMITTING an activity (quiz, skill exercise, certificate):
     see the "ACTIVITY GATE" block below. */

  /* ============ ACTIVITY GATE (solve/submit) ============
     Intercepts in the capture phase -before app.js's own handlers
     run- any click on a control that "solves" an
     activity. If there is no student session, it cancels the click and opens
     login/register instead of processing the answer. Navigation between
     sections is NOT affected: only the solving action is blocked. */
  var ACTIVITY_SELECTORS = [
    ".quiz-option",          // multiple-choice option (lesson and reading)
    ".fill-check",           // check fill-in-the-blank answer
    ".match-item",           // matching exercise
    "#quiz-next-btn",        // stamp progress and continue
    "#builder-check",        // check sentence (writing)
    ".speak-btn.record",     // practice pronunciation (speaking)
    "#speaking-finish",      // stamp speaking skill
    "#letter-check",         // check letter
    "#certificate-btn"       // download certificate
  ].join(", ");

  document.addEventListener("click", function (e) {
    if (isAuthedStudent) return;
    var target = e.target.closest(ACTIVITY_SELECTORS);
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    openGate("login");
    setGateError("Log in or sign up to complete this activity.");
  }, true);

  function friendlyAuthError(err) {
    var code = err && err.code;
    var map = {
      "auth/invalid-email": "The email format is not valid.",
      "auth/user-not-found": "No account exists with that email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/email-already-in-use": "An account with that email already exists.",
      "auth/weak-password": "The password must be at least 6 characters long.",
      "auth/too-many-requests": "Too many attempts. Wait a moment and try again."
    };
    return (map[code]) || "An error occurred. Please try again.";
  }

  /* ============ SHOW/HIDE PASSWORD ============ */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".password-toggle");
    if (!btn) return;
    var input = $(btn.dataset.target);
    if (!input) return;
    var showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.textContent = showing ? "👁" : "🙈";
    btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });

  /* ============ LOGIN ============ */
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    setGateError("");
    if (!window.__UTN_FIREBASE_READY__) { show(gateConfigWarning); return; }
    var email = normalizeEmail($("login-email").value);
    var pass = $("login-password").value;
    if (!email || !pass) { setGateError("Fill in email and password."); return; }

    var btn = $("login-submit");
    btn.disabled = true; btn.textContent = "Logging in…";

    auth.signInWithEmailAndPassword(email, pass)
      .catch(function (err) {
        setGateError(friendlyAuthError(err));
      })
      .finally(function () {
        btn.disabled = false; btn.textContent = "Log In";
      });
  });

  $("forgot-password").addEventListener("click", function (e) {
    e.preventDefault();
    var email = normalizeEmail($("login-email").value);
    if (!email) { setGateError("Enter your email above and press 'Forgot my password' again."); return; }
    auth.sendPasswordResetEmail(email)
      .then(function () { setGateError("We sent you an email to reset your password."); })
      .catch(function (err) { setGateError(friendlyAuthError(err)); });
  });

  /* ============ REGISTRATION (students only) ============ */
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    setGateError("");
    if (!window.__UTN_FIREBASE_READY__) { show(gateConfigWarning); return; }
    var name = $("reg-nombre").value.trim();
    var email = normalizeEmail($("reg-email").value);
    var studentId = $("reg-boleta").value.trim();
    var pass = $("reg-password").value;
    var pass2 = $("reg-password2").value;

    if (!name || !email || !studentId || !pass) { setGateError("Fill in all fields."); return; }
    if (pass.length < 6) { setGateError("The password must be at least 6 characters long."); return; }
    if (pass !== pass2) { setGateError("Passwords do not match."); return; }
    if (normalizeEmail(email) === normalizeEmail(ADMIN_EMAIL)) { setGateError("That email is reserved for the administrator."); return; }
    if (!emailDomainOk(email)) { setGateError("Use your institutional email (@" + ALLOWED_EMAIL_DOMAIN + ")."); return; }

    var btn = $("register-submit");
    btn.disabled = true; btn.textContent = "Creating account…";

    auth.createUserWithEmailAndPassword(email, pass)
      .then(function (cred) {
        return db.collection("students").doc(cred.user.uid).set({
          nombre: name,
          correo: email,
          boleta: studentId,
          grupo: "",
          disabled: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          progress: defaultProgress(name)
        });
      })
      .catch(function (err) {
        setGateError(friendlyAuthError(err));
      })
      .finally(function () {
        btn.disabled = false; btn.textContent = "Create Account";
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

  /* ============ PROGRESS SYNC (student) ============ */
  var syncTimer = null;
  function makeSync(uid) {
    return function (progress) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(function () {
        db.collection("students").doc(uid).update({
          progress: progress,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function () { /* will retry on the next change */ });
      }, 800);
    };
  }

  function startStudentSession(uid, data) {
    isAuthedStudent = true;
    hide(gate);
    hide($("admin-shell"));
    show($("app-header"));
    show($("main"));
    show($("header-authed-actions"));
    hide($("auth-open-btn"));
    $("nav-student-name").textContent = data.nombre || "UTN Student";

    if (window.__UTN_UID__ === uid) return; // this student's state was already loaded

    window.__UTN_UID__ = uid;
    window.__UTN_SYNC__ = makeSync(uid);
    try {
      localStorage.setItem("myutn_progress_v2_" + uid, JSON.stringify(data.progress || defaultProgress(data.nombre)));
    } catch (e) {}
    /* app.js is already loaded (it served the content as a guest). We ask it
       to reread progress, now under the real student's key. */
    if (typeof window.__UTN_APP_RELOAD__ === "function") window.__UTN_APP_RELOAD__();
  }

  function resetToGuestUI() {
    isAuthedStudent = false;
    hide($("header-authed-actions"));
    show($("auth-open-btn"));
    hide($("admin-shell"));
    show($("app-header"));
    show($("main"));
  }

  /* ============ SESSION ============ */
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
        setGateError("We could not find your student record. Contact your teacher.");
        show(gate);
        suppressNextNullReset = true;
        auth.signOut();
        return;
      }
      var data = doc.data();
      if (data.disabled) {
        setGateError("Your account was disabled by the teacher. Contact your teacher.");
        show(gate);
        suppressNextNullReset = true;
        auth.signOut();
        return;
      }
      startStudentSession(user.uid, data);
    }).catch(function () {
      setGateError("We could not verify your account. Check your connection and try again.");
      show(gate);
      suppressNextNullReset = true;
      auth.signOut();
    });
  });

  /* ============ ADMIN PANEL ============ */
  var LEVEL_CODES = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var allStudents = [];

  function fmtDate(ts) {
    if (!ts || !ts.toDate) return "—";
    return ts.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function studentRowHtml(id, d) {
    var progress = d.progress || {};
    var level = LEVEL_CODES[progress.currentLevelIndex || 0] || "A1";
    var stamps = (progress.stamps || []).length;
    return (
      '<tr data-id="' + id + '">' +
      '<td>' + (d.disabled ? '<span class="admin-badge disabled">Disabled</span> ' : '') + escapeHtml(d.nombre || "") + "</td>" +
      "<td>" + escapeHtml(d.correo || "") + "</td>" +
      "<td>" + escapeHtml(d.boleta || "") + "</td>" +
      '<td><select class="group-select" data-id="' + id + '" aria-label="Group for ' + escapeHtml(d.nombre || "the student") + '">' + groupOptionsHtml(d.grupo || "") + "</select></td>" +
      "<td>" + level + "</td>" +
      "<td>" + stamps + "/6</td>" +
      "<td>" + fmtDate(d.createdAt) + "</td>" +
      '<td class="admin-actions">' +
      '<button class="btn-mini" data-action="view">View</button>' +
      '<button class="btn-mini" data-action="edit">Edit</button>' +
      '<button class="btn-mini" data-action="toggle">' + (d.disabled ? "Enable" : "Disable") + "</button>" +
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
    var html = '<option value=""' + (selected ? "" : " selected") + '>Unassigned</option>';
    groups.forEach(function (g) {
      html += '<option value="' + escapeHtml(g) + '"' + (g === selected ? " selected" : "") + '>' + escapeHtml(g) + "</option>";
    });
    html += '<option value="__new__">+ New group…</option>';
    return html;
  }

  function refreshGroupFilterOptions() {
    var sel = $("admin-group-filter");
    if (!sel) return;
    var current = sel.value;
    var groups = collectGroups();
    var html = '<option value="">All groups</option><option value="__none__">Unassigned</option>';
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
      '<div class="admin-stat-card"><span class="admin-stat-num">' + total + '</span><span class="admin-stat-label">Students</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-num">' + activos + '</span><span class="admin-stat-label">Active</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-num">' + avgStamps + '</span><span class="admin-stat-label">Average Stamps</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-num">' + grupos + '</span><span class="admin-stat-label">Groups Assigned</span></div>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function renderStudentTable(list) {
    var tbody = $("admin-table-body");
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">No students registered yet.</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (s) { return studentRowHtml(s.id, s.data); }).join("");
  }

  function refreshStudents() {
    var tbody = $("admin-table-body");
    tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">Loading…</td></tr>';
    db.collection("students").orderBy("nombre").get().then(function (snap) {
      allStudents = [];
      snap.forEach(function (doc) { allStudents.push({ id: doc.id, data: doc.data() }); });
      renderAdminStats(allStudents);
      refreshGroupFilterOptions();
      applyFilter();
    }).catch(function () {
      tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">Could not load the list. Check your Firestore rules.</td></tr>';
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

  /* --- View progress --- */
  var viewModal = $("admin-view-modal");
  function openViewModal(id) {
    var s = findStudent(id);
    if (!s) return;
    var d = s.data, p = d.progress || {};
    $("admin-view-title").textContent = d.nombre || "Student";
    var level = LEVEL_CODES[p.currentLevelIndex || 0] || "A1";
    var stamps = p.stamps || [];
    var body =
      "<p><strong>Email:</strong> " + escapeHtml(d.correo || "") + "</p>" +
      "<p><strong>Student ID:</strong> " + escapeHtml(d.boleta || "") + "</p>" +
      "<p><strong>Group:</strong> " + escapeHtml(d.grupo || "Unassigned") + "</p>" +
      "<p><strong>Current Level:</strong> " + level + "</p>" +
      "<p><strong>Stamps Earned:</strong> " + stamps.length + " of 6 (" + (stamps.join(", ") || "none") + ")</p>" +
      "<p><strong>Lessons Completed:</strong> " + ((p.completedLessons || []).length) + "</p>" +
      "<p><strong>Certificate Available:</strong> " + (stamps.length === 6 ? "Yes" : "No") + "</p>";
    $("admin-view-body").innerHTML = body;
    show(viewModal);
  }
  $("admin-view-close").addEventListener("click", function () { hide(viewModal); });
  viewModal.addEventListener("click", function (e) { if (e.target === viewModal) hide(viewModal); });

  /* --- Edit --- */
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
    var name = $("edit-nombre").value.trim();
    var studentId = $("edit-boleta").value.trim();
    var grupo = $("edit-grupo").value.trim();
    if (!name) { return; }
    var s = findStudent(editingId);
    var updates = { nombre: name, boleta: studentId, grupo: grupo };
    if (s && s.data.progress) {
      updates["progress.profile.name"] = name;
    }
    db.collection("students").doc(editingId).update(updates).then(function () {
      hide(editModal);
      refreshStudents();
    });
  });

  /* --- Disable --- */
  /* Student accounts are never deleted, either from this panel or from
     anywhere else. The only action available to restrict a student's
     access is disabling their account (see toggleDisabled). */
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
      var nuevo = prompt("Enter the new group's name (e.g. IDS-501):");
      if (!nuevo || !nuevo.trim()) { sel.value = (s && s.data.grupo) || ""; return; }
      val = nuevo.trim();
    }
    db.collection("students").doc(id).update({ grupo: val }).then(refreshStudents);
  });

  function initAdminPanel() {
    refreshStudents();
  }
})();
