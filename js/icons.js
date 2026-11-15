"use strict";
/* Icon set (inline SVG, 24x24, 2px stroke). Self-hosted: no external requests.
   Usage: UTNIcons.svg("target")  ->  '<svg class="icon">…</svg>'
   Avatars: UTNIcons.avatar(value) accepts an icon name OR a legacy emoji saved
   before the redesign (so existing Firestore profiles keep working). */
(function () {
  var P = {
    "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    "x-circle": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    "alert": '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z"/><path d="M12 9v4M12 17h.01"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    "eye-off": '<path d="M9.9 4.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.2"/><path d="M6.6 6.6A16.8 16.8 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="m2 2 20 20"/>',
    "moon": '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    "graduation-cap": '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    "refresh": '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/>',
    "play": '<path d="M6 4l14 8-14 8z"/>',
    "pause": '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    "lightbulb": '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    "list": '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    "book": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    "pencil": '<path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    "message": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
    "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "headphones": '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    "mic": '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>',
    "volume": '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    "zap": '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    "flame": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    "map": '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "palette": '<circle cx="13.5" cy="6.5" r=".6"/><circle cx="17.5" cy="10.5" r=".6"/><circle cx="8.5" cy="7.5" r=".6"/><circle cx="6.5" cy="12.5" r=".6"/><path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 2-2c0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4a2 2 0 0 1 2-2h2.4a5 5 0 0 0 5-5C22 6 17.5 2 12 2z"/>',
    "trophy": '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.7V17c0 .6-.5 1-1.2 1.2C7.8 18.5 7 20 7 22M14 14.7V17c0 .6.5 1 1.2 1.2 1 .3 1.8 1.8 1.8 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/>',
    "award": '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
    "star": '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1z"/>',
    "lock": '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    "bookmark": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    "video": '<path d="m22 8-6 4 6 4z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    "gamepad": '<path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/><rect x="2" y="6" width="20" height="12" rx="4"/>',
    "plane": '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    "arrow-left": '<path d="m12 19-7-7 7-7M19 12H5"/>',
    "clipboard-check": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    "globe": '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    "flag": '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
    "layers": '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    "thumbs-up": '<path d="M7 10v12"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.5l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z"/>',
    "crown": '<path d="m2 6 5 5 5-8 5 8 5-5-2 13H4z"/>'
  };

  /* Avatars a student can pick (icon names). */
  var AVATAR_ICONS = ["graduation-cap", "book-open", "award", "star", "target", "globe", "lightbulb", "flag",
                      "pencil", "headphones", "mic", "trophy", "plane", "map", "zap", "users"];

  /* Legacy emoji avatars -> icon (profiles saved before the redesign). */
  var LEGACY = {
    "🎓": "graduation-cap", "🦉": "book-open", "🦅": "plane", "🐺": "target", "🦊": "flag", "🐢": "map",
    "🌵": "lightbulb", "⭐": "star",
    "🐼": "book-open", "🐸": "pencil", "🐵": "headphones", "🦁": "award", "🐯": "trophy", "🐨": "mic",
    "🐰": "zap", "🐧": "globe", "🦄": "star", "🐙": "users", "🦖": "flag", "🐝": "target", "🐬": "plane",
    "🙂": "user"
  };

  function svg(name, cls) {
    var body = P[name];
    if (!body) return "";
    return '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  function avatar(value) {
    var name = P[value] ? value : (LEGACY[value] || "user");
    return svg(name);
  }

  window.UTNIcons = { svg: svg, avatar: avatar, avatars: AVATAR_ICONS, legacy: LEGACY, has: function (n) { return !!P[n]; } };
})();
