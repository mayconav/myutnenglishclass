"use strict";
/* Ilustraciones SVG de los verbos (reemplazan al emoji de VERB_EMOJI en el Bingo y en Memory).
   Clave = infinitivo. Lienzo 64x64, sin disco de fondo (el disco pastel lo pone el CSS).
   Si un verbo no esta aqui, se sigue mostrando su emoji. Para agregar un verbo, basta con
   anadir una linea nueva a VERB_ART. */
var VERB_ART = {
  play: '<rect x="7" y="20" width="50" height="27" rx="13.5" fill="#5B6EE1"/><path d="M20 28v11M14.5 33.5h11" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="43" cy="30" r="3.2" fill="#FFD166"/><circle cx="49" cy="37" r="3.2" fill="#EF476F"/>',
  watch: '<rect x="7" y="12" width="50" height="34" rx="6" fill="#3B4A63"/><rect x="11.5" y="16.5" width="41" height="25" rx="3.5" fill="#8EC5FF"/><path d="M29 23l11 6.5L29 36z" fill="#fff"/><path d="M22 53h20" stroke="#3B4A63" stroke-width="4.5" stroke-linecap="round"/>',
  listen: '<path d="M13 38v-5a19 19 0 0 1 38 0v5" stroke="#3B4A63" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="8" y="35" width="11" height="17" rx="4.5" fill="#EF476F"/><rect x="45" y="35" width="11" height="17" rx="4.5" fill="#EF476F"/>',
  cook: '<rect x="42" y="30" width="19" height="7" rx="3.5" fill="#4B5563"/><circle cx="27" cy="34" r="19" fill="#4B5563"/><circle cx="27" cy="34" r="15" fill="#374151"/><ellipse cx="27" cy="35" rx="10" ry="8.5" fill="#fff"/><circle cx="27" cy="35" r="4.4" fill="#FFB703"/>',
  travel: '<path d="M24 24v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6" stroke="#7A3D0E" stroke-width="3.6" fill="none"/><rect x="9" y="23" width="46" height="31" rx="5.5" fill="#E76F51"/><path d="M9 36h46" stroke="#C4553A" stroke-width="3"/><rect x="28" y="32.5" width="8" height="8" rx="2" fill="#FFD166"/>',
  love: '<path d="M32 55C9 39 7 25 15 17.5c6-5.5 14-3 17 4 3-7 11-9.500 17-4C57 25 55 39 32 55z" fill="#EF476F"/><path d="M16.500 25q1.500-5 6.500-6.500" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>',
  smile: '<circle cx="32" cy="32" r="23" fill="#FFD166"/><circle cx="24" cy="27" r="3.2" fill="#1F2937"/><circle cx="40" cy="27" r="3.2" fill="#1F2937"/><path d="M20.500 36.500q11.500 13 23 0" stroke="#1F2937" stroke-width="3.6" fill="none" stroke-linecap="round"/>',
  cry: '<circle cx="32" cy="32" r="23" fill="#FFD166"/><path d="M18.500 27q4.500-4.500 9 0M36.500 27q4.500-4.500 9 0" stroke="#1F2937" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M23.500 46q8.500-8 17 0" stroke="#1F2937" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M22 31c-4 6.500-4 11 0 11s4-4.500 0-11zM42 31c-4 6.500-4 11 0 11s4-4.500 0-11z" fill="#5BB5F0"/>',
  study: '<rect x="12" y="9" width="34" height="46" rx="4.500" fill="#4D96FF"/><rect x="18" y="9" width="28" height="46" rx="3.500" fill="#fff"/><path d="M24 21h16M24 29h16M24 37h10" stroke="#B8C4D6" stroke-width="3" stroke-linecap="round"/><path d="M42 50l9.500-27 6.500 2.300-9.500 27-8 3z" fill="#FFB703"/><path d="M42 50l-1 6.500 7-3z" fill="#F1C9A0"/>',
  shop: '<path d="M23 29v-8a9 9 0 0 1 18 0v8" stroke="#048A6A" stroke-width="3.8" fill="none" stroke-linecap="round"/><path d="M11 24h42l-3.500 31h-35z" fill="#06D6A0"/><circle cx="25" cy="33" r="2.200" fill="#048A6A"/><circle cx="39" cy="33" r="2.200" fill="#048A6A"/>',
  stop: '<path d="M22 8h20l14 14v20L42 56H22L8 42V22z" fill="#EF476F"/><path d="M17 32h30" stroke="#fff" stroke-width="6.500" stroke-linecap="round"/>',
  like: '<rect x="8" y="28" width="12" height="27" rx="3" fill="#4D96FF"/><path d="M23 30l9.500-18q6.500 0 5.500 8L36 28h16.500q5.500 0 4 6.500l-3.500 17.500q-1 3.500-5 3.500H23z" fill="#FFD166"/>'
};

function verbArtSvg(base) {
  var body = VERB_ART[base];
  return body ? '<svg class="verb-art" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' + body + "</svg>" : "";
}
