"use strict";
/* Icon set (inline SVG, 24x24, 2px stroke). Self-hosted: no external requests.
   Usage: UTNIcons.svg("target")  ->  '<svg class="icon">…</svg>'
   Avatars: UTNIcons.avatar(value) accepts an icon name OR a legacy emoji saved
   before the redesign (so existing Firestore profiles keep working). */
(function () {
  var P = {
    "home": '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
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

  /* Illustrated avatars: [pastel disc color, svg body] on a 64x64 canvas. */
  var ART = {
    "fox": ['#FFE6CC', '<path d="M11 14l12 11h18l12-11 1 25Q32 60 10 39z" fill="#F08A24"/><path d="M14 19l7 7-6 3zM50 19l-7 7 6 3z" fill="#7a3d0e"/><path d="M10 39Q22 40 32 50q10-10 22-11Q46 54 32 56 18 54 10 39z" fill="#fff"/><circle cx="23" cy="33" r="2.6" fill="#1f2937"/><circle cx="41" cy="33" r="2.6" fill="#1f2937"/><circle cx="23.9" cy="32.1" r=".9" fill="#fff"/><circle cx="41.9" cy="32.1" r=".9" fill="#fff"/><ellipse cx="32" cy="47" rx="3.2" ry="2.4" fill="#1f2937"/>'],
    "owl": ['#E4ECF8', '<path d="M14 22L18 8l12 9zM50 22L46 8 34 17z" fill="#7A5230"/><ellipse cx="32" cy="35" rx="19" ry="21" fill="#8B5E3C"/><ellipse cx="32" cy="46" rx="11" ry="9" fill="#E3C39F"/><circle cx="24" cy="31" r="8.5" fill="#fff"/><circle cx="40" cy="31" r="8.5" fill="#fff"/><circle cx="24" cy="31" r="4" fill="#1f2937"/><circle cx="40" cy="31" r="4" fill="#1f2937"/><circle cx="25.2" cy="29.8" r="1.2" fill="#fff"/><circle cx="41.2" cy="29.8" r="1.2" fill="#fff"/><path d="M28.5 38h7L32 45z" fill="#F5B301"/>'],
    "panda": ['#E6F5EA', '<circle cx="17" cy="17" r="7.5" fill="#1f2937"/><circle cx="47" cy="17" r="7.5" fill="#1f2937"/><circle cx="32" cy="35" r="20" fill="#fff" stroke="#d6dbe1" stroke-width="1"/><ellipse cx="23" cy="32" rx="5.5" ry="7" transform="rotate(20 23 32)" fill="#1f2937"/><ellipse cx="41" cy="32" rx="5.5" ry="7" transform="rotate(-20 41 32)" fill="#1f2937"/><circle cx="23.5" cy="32" r="2" fill="#fff"/><circle cx="40.5" cy="32" r="2" fill="#fff"/><ellipse cx="32" cy="42" rx="3.6" ry="2.6" fill="#1f2937"/><path d="M28 47q4 3 8 0" stroke="#1f2937" stroke-width="1.8" fill="none" stroke-linecap="round"/>'],
    "cat": ['#F1E7FA', '<path d="M14 30V9l15 11zM50 30V9L35 20z" fill="#7C8AA5"/><path d="M18 24v-8l7 5zM46 24v-8l-7 5z" fill="#F4A6BB"/><ellipse cx="32" cy="37" rx="20" ry="18" fill="#8E9BB5"/><ellipse cx="24" cy="34" rx="3.4" ry="4" fill="#B7E36B"/><ellipse cx="40" cy="34" rx="3.4" ry="4" fill="#B7E36B"/><ellipse cx="24" cy="34" rx="1.2" ry="3.2" fill="#1f2937"/><ellipse cx="40" cy="34" rx="1.2" ry="3.2" fill="#1f2937"/><path d="M29.5 41h5l-2.5 3z" fill="#F4A6BB"/><path d="M32 44q-3 4-6 2M32 44q3 4 6 2" stroke="#1f2937" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M8 38l11 2M8 44l11-2M56 38l-11 2M56 44l-11-2" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>'],
    "frog": ['#E5F6E8', '<ellipse cx="32" cy="40" rx="23" ry="17" fill="#4FB35A"/><circle cx="20" cy="25" r="10" fill="#4FB35A"/><circle cx="44" cy="25" r="10" fill="#4FB35A"/><circle cx="20" cy="25" r="6.5" fill="#fff"/><circle cx="44" cy="25" r="6.5" fill="#fff"/><circle cx="21" cy="25.5" r="3.3" fill="#1f2937"/><circle cx="43" cy="25.5" r="3.3" fill="#1f2937"/><path d="M20 45q12 9 24 0" stroke="#1f2937" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="15" cy="42" r="3" fill="#F7A3B5" opacity=".8"/><circle cx="49" cy="42" r="3" fill="#F7A3B5" opacity=".8"/>'],
    "bear": ['#F7ECDD', '<circle cx="16" cy="19" r="8" fill="#9A6A44"/><circle cx="48" cy="19" r="8" fill="#9A6A44"/><circle cx="16" cy="19" r="4" fill="#E3B58C"/><circle cx="48" cy="19" r="4" fill="#E3B58C"/><circle cx="32" cy="36" r="21" fill="#A97650"/><ellipse cx="32" cy="43" rx="10" ry="8" fill="#E8CBA7"/><circle cx="23" cy="32" r="2.6" fill="#1f2937"/><circle cx="41" cy="32" r="2.6" fill="#1f2937"/><circle cx="23.9" cy="31.1" r=".9" fill="#fff"/><circle cx="41.9" cy="31.1" r=".9" fill="#fff"/><ellipse cx="32" cy="40" rx="3.6" ry="2.6" fill="#1f2937"/><path d="M32 42.6v3M28.5 47q3.5 3 7 0" stroke="#1f2937" stroke-width="1.6" fill="none" stroke-linecap="round"/>'],
    "rabbit": ['#FCE8F0', '<ellipse cx="23" cy="15" rx="6" ry="14" fill="#fff" stroke="#e1e5ea"/><ellipse cx="41" cy="15" rx="6" ry="14" fill="#fff" stroke="#e1e5ea"/><ellipse cx="23" cy="16" rx="2.8" ry="9" fill="#F7B3C8"/><ellipse cx="41" cy="16" rx="2.8" ry="9" fill="#F7B3C8"/><circle cx="32" cy="41" r="17" fill="#fff" stroke="#e1e5ea"/><circle cx="24" cy="39" r="2.6" fill="#1f2937"/><circle cx="40" cy="39" r="2.6" fill="#1f2937"/><circle cx="24.9" cy="38.1" r=".9" fill="#fff"/><circle cx="40.9" cy="38.1" r=".9" fill="#fff"/><path d="M29.8 44h4.4L32 46.5z" fill="#F08AA6"/><path d="M32 46.5q-2.5 3-5 1.5M32 46.5q2.5 3 5 1.5" stroke="#1f2937" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="21" cy="45" r="3" fill="#F7B3C8" opacity=".7"/><circle cx="43" cy="45" r="3" fill="#F7B3C8" opacity=".7"/>'],
    "penguin": ['#E1F0FB', '<ellipse cx="32" cy="35" rx="19" ry="22" fill="#24344F"/><ellipse cx="32" cy="41" rx="12" ry="15" fill="#fff"/><circle cx="25" cy="30" r="3.4" fill="#fff"/><circle cx="39" cy="30" r="3.4" fill="#fff"/><circle cx="25.4" cy="30.4" r="1.7" fill="#1f2937"/><circle cx="38.6" cy="30.4" r="1.7" fill="#1f2937"/><path d="M27.5 35h9L32 41z" fill="#F59E0B"/><path d="M12 38q-4 8 2 14M52 38q4 8-2 14" stroke="#24344F" stroke-width="4" fill="none" stroke-linecap="round"/>'],
    "lion": ['#FFF1D1', '<circle cx="32" cy="34" r="25" fill="#C77822"/><circle cx="32" cy="35" r="17" fill="#F6C46B"/><circle cx="19" cy="22" r="5" fill="#F6C46B"/><circle cx="45" cy="22" r="5" fill="#F6C46B"/><circle cx="25" cy="33" r="2.6" fill="#1f2937"/><circle cx="39" cy="33" r="2.6" fill="#1f2937"/><circle cx="25.9" cy="32.1" r=".9" fill="#fff"/><circle cx="39.9" cy="32.1" r=".9" fill="#fff"/><path d="M29 40h6l-3 3.5z" fill="#7a3d0e"/><path d="M32 43.5q-3 4-6.5 1.5M32 43.5q3 4 6.5 1.5" stroke="#1f2937" stroke-width="1.6" fill="none" stroke-linecap="round"/>'],
    "koala": ['#EBEEF3', '<circle cx="13" cy="25" r="11" fill="#9AA5B4"/><circle cx="51" cy="25" r="11" fill="#9AA5B4"/><circle cx="13" cy="25" r="6" fill="#E9EDF2"/><circle cx="51" cy="25" r="6" fill="#E9EDF2"/><ellipse cx="32" cy="37" rx="19" ry="19" fill="#AEB8C5"/><circle cx="23" cy="33" r="2.6" fill="#1f2937"/><circle cx="41" cy="33" r="2.6" fill="#1f2937"/><circle cx="23.9" cy="32.1" r=".9" fill="#fff"/><circle cx="41.9" cy="32.1" r=".9" fill="#fff"/><ellipse cx="32" cy="40" rx="5.4" ry="7" fill="#1f2937"/><ellipse cx="30.4" cy="37.5" rx="1.4" ry="1.8" fill="#fff" opacity=".6"/>'],
    "dog": ['#FBEEE0', '<ellipse cx="14" cy="33" rx="7" ry="14" transform="rotate(12 14 33)" fill="#6B4A2E"/><ellipse cx="50" cy="33" rx="7" ry="14" transform="rotate(-12 50 33)" fill="#6B4A2E"/><circle cx="32" cy="35" r="19" fill="#D9A56B"/><ellipse cx="32" cy="43" rx="11" ry="8.5" fill="#F8EBDA"/><circle cx="24" cy="31" r="2.6" fill="#1f2937"/><circle cx="40" cy="31" r="2.6" fill="#1f2937"/><circle cx="24.9" cy="30.1" r=".9" fill="#fff"/><circle cx="40.9" cy="30.1" r=".9" fill="#fff"/><ellipse cx="32" cy="39.5" rx="4" ry="2.8" fill="#1f2937"/><path d="M32 42v3.5M27.5 46q4.5 3.5 9 0" stroke="#1f2937" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M29 49q3 5 6 0z" fill="#F28DA0"/>'],
    "pig": ['#FDE8EE', '<path d="M13 22l4-12 12 8zM51 22l-4-12-12 8z" fill="#F29AB0"/><circle cx="32" cy="36" r="20" fill="#F8B4C4"/><ellipse cx="32" cy="42" rx="9" ry="7" fill="#F29AB0"/><ellipse cx="28.5" cy="42" rx="1.7" ry="2.4" fill="#C95F7C"/><ellipse cx="35.5" cy="42" rx="1.7" ry="2.4" fill="#C95F7C"/><circle cx="23" cy="31" r="2.6" fill="#1f2937"/><circle cx="41" cy="31" r="2.6" fill="#1f2937"/><circle cx="23.9" cy="30.1" r=".9" fill="#fff"/><circle cx="41.9" cy="30.1" r=".9" fill="#fff"/><circle cx="16" cy="40" r="3" fill="#F29AB0"/><circle cx="48" cy="40" r="3" fill="#F29AB0"/>'],
    "tiger": ['#FFEBD2', '<circle cx="16" cy="19" r="7" fill="#F28A1E"/><circle cx="48" cy="19" r="7" fill="#F28A1E"/><circle cx="16" cy="19" r="3.4" fill="#fff"/><circle cx="48" cy="19" r="3.4" fill="#fff"/><circle cx="32" cy="36" r="20" fill="#F59A2E"/><path d="M32 17v7M24 18l2 6M40 18l-2 6M12 33l8 1.5M12 40l8-1M52 33l-8 1.5M52 40l-8-1" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="32" cy="45" rx="10" ry="7.5" fill="#fff"/><circle cx="24" cy="33" r="2.6" fill="#1f2937"/><circle cx="40" cy="33" r="2.6" fill="#1f2937"/><circle cx="24.9" cy="32.1" r=".9" fill="#fff"/><circle cx="40.9" cy="32.1" r=".9" fill="#fff"/><path d="M29 41h6l-3 3.5z" fill="#1f2937"/><path d="M32 44.5q-3 4-6 1.5M32 44.5q3 4 6 1.5" stroke="#1f2937" stroke-width="1.5" fill="none" stroke-linecap="round"/>'],
    "monkey": ['#F5EADF', '<circle cx="12" cy="34" r="8" fill="#7B5332"/><circle cx="52" cy="34" r="8" fill="#7B5332"/><circle cx="12" cy="34" r="4.2" fill="#E8C7A2"/><circle cx="52" cy="34" r="4.2" fill="#E8C7A2"/><circle cx="32" cy="32" r="20" fill="#8A5C38"/><path d="M32 26q-14-8-20 2 0 14 12 18 8 3 16 0 12-4 12-18-6-10-20-2z" fill="#F0D2AE"/><circle cx="25" cy="34" r="2.6" fill="#1f2937"/><circle cx="39" cy="34" r="2.6" fill="#1f2937"/><circle cx="25.9" cy="33.1" r=".9" fill="#fff"/><circle cx="39.9" cy="33.1" r=".9" fill="#fff"/><ellipse cx="32" cy="42" rx="2.6" ry="1.6" fill="#7B5332"/><path d="M26 47q6 5 12 0" stroke="#1f2937" stroke-width="1.8" fill="none" stroke-linecap="round"/>'],
    "octopus": ['#EEE6FA', '<path d="M12 40q-2 14 6 14M22 44q0 12 6 10M42 44q0 12-6 10M52 40q2 14-6 14" stroke="#8B5CD6" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M12 36Q12 8 32 8t20 28q0 10-20 10T12 36z" fill="#9B6BE0"/><circle cx="24" cy="30" r="3" fill="#1f2937"/><circle cx="40" cy="30" r="3" fill="#1f2937"/><circle cx="24.9" cy="29.1" r=".9" fill="#fff"/><circle cx="40.9" cy="29.1" r=".9" fill="#fff"/><path d="M26 39q6 5 12 0" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="19" cy="36" r="3" fill="#F7A3C4" opacity=".8"/><circle cx="45" cy="36" r="3" fill="#F7A3C4" opacity=".8"/><circle cx="24" cy="18" r="2" fill="#fff" opacity=".5"/>'],
    "turtle": ['#E3F5E8', '<circle cx="32" cy="14" r="8" fill="#8CCB6B"/><circle cx="29" cy="13" r="1.8" fill="#1f2937"/><circle cx="35.5" cy="13" r="1.8" fill="#1f2937"/><path d="M29 17q3 2.5 6 0" stroke="#1f2937" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="13" cy="42" rx="6" ry="4" fill="#8CCB6B"/><ellipse cx="51" cy="42" rx="6" ry="4" fill="#8CCB6B"/><ellipse cx="32" cy="38" rx="21" ry="18" fill="#4E9F4A"/><path d="M32 22l9 6v10l-9 6-9-6V28zM32 22v-2M41 28l8-3M41 38l8 4M32 44v8M23 38l-8 4M23 28l-8-3" stroke="#2F7A32" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>']
  };

  /* Avatars a student can pick. */
  var AVATAR_ICONS = ["fox", "owl", "panda", "cat", "frog", "bear", "rabbit", "penguin",
                      "lion", "koala", "dog", "pig", "tiger", "monkey", "octopus", "turtle"];

  /* Legacy emoji avatars -> icon (profiles saved before the redesign). */
  var LEGACY = {
    "🎓": "graduation-cap", "🦉": "owl", "🦅": "owl", "🐺": "fox", "🦊": "fox", "🐢": "turtle", "🌵": "frog", "⭐": "star",
    "🐼": "panda", "🐸": "frog", "🐵": "monkey", "🦁": "lion", "🐯": "tiger", "🐨": "koala",
    "🐰": "rabbit", "🐧": "penguin", "🦄": "cat", "🐙": "octopus", "🦖": "dog", "🐝": "bear", "🐬": "penguin",
    "🙂": "fox"
  };

  function svg(name, cls) {
    var body = P[name];
    if (!body) return "";
    return '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  function art(name) {
    var a = ART[name];
    if (!a) return "";
    return '<svg class="avatar-art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<circle cx="32" cy="32" r="31" fill="' + a[0] + '"/>' + a[1] + "</svg>";
  }

  function avatar(value) {
    var name = (ART[value] || P[value]) ? value : (LEGACY[value] || "fox");
    return ART[name] ? art(name) : svg(name);
  }

  /* Fotos de perfil: JPEG pequeno guardado como data URL. Solo se aceptan data URLs con el
     formato exacto que genera la app (evita inyectar HTML desde datos de otros usuarios). */
  var PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/;
  function photoOk(v) { return typeof v === "string" && v.length < 60000 && PHOTO_RE.test(v); }
  function photo(v) { return photoOk(v) ? '<img class="avatar-photo" src="' + v + '" alt="" draggable="false">' : ""; }

  window.UTNIcons = { photo: photo, photoOk: photoOk, svg: svg, avatar: avatar, avatars: AVATAR_ICONS, legacy: LEGACY, has: function (n) { return !!(P[n] || ART[n]); } };
})();
