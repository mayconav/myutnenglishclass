"use strict";
/* Certificado de finalizacion y modal de felicitacion (app.js original: L798-L902) */
  /* ============ CERTIFICATE ============ */
  function drawCertificate() {
    var canvas = document.getElementById("certificate-canvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;

    ctx.fillStyle = "#FAFBFA";
    ctx.fillRect(0, 0, w, h);

    /* top tricolor stripe */
    var stripeH = 16;
    ctx.fillStyle = "#0C4EB8"; ctx.fillRect(0, 0, w / 3, stripeH);
    ctx.fillStyle = "#E2141B"; ctx.fillRect(w / 3, 0, w / 3, stripeH);
    ctx.fillStyle = "#0C9C61"; ctx.fillRect((w / 3) * 2, 0, w / 3, stripeH);
    ctx.fillStyle = "#0C4EB8"; ctx.fillRect(0, h - stripeH, w / 3, stripeH);
    ctx.fillStyle = "#E2141B"; ctx.fillRect(w / 3, h - stripeH, w / 3, stripeH);
    ctx.fillStyle = "#0C9C61"; ctx.fillRect((w / 3) * 2, h - stripeH, w / 3, stripeH);

    /* border */
    ctx.strokeStyle = "#121212";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 40, w - 48, h - 80);

    /* circular seal */
    var cx = w - 140, cy = h - 160, r = 70;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = "#0C4EB8"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.78, 0, Math.PI * 2); ctx.fillStyle = "#FAFBFA"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.78, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = "#E2141B"; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.fillStyle = "#0C9C61"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2); ctx.fillStyle = "#FAFBFA"; ctx.fill();
    ctx.fillStyle = "#0C4EB8";
    ctx.font = "bold 22px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("UT", cx, cy + 2);

    /* texts */
    ctx.fillStyle = "#565B5E";
    ctx.font = "13px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL · ACADEMIC EXCELLENCE", w / 2, 90);

    ctx.fillStyle = "#0C4EB8";
    ctx.font = "bold 40px 'Space Grotesk', sans-serif";
    ctx.fillText("Certificate of Completion", w / 2, 150);

    ctx.fillStyle = "#16181A";
    ctx.font = "17px 'Source Serif 4', Georgia, serif";
    ctx.fillText("This certifies that", w / 2, 230);

    ctx.fillStyle = "#E2141B";
    ctx.font = "bold 34px 'Space Grotesk', sans-serif";
    ctx.fillText(state.profile.name, w / 2, 285);

    ctx.fillStyle = "#16181A";
    ctx.font = "17px 'Source Serif 4', Georgia, serif";
    wrapText(ctx, "has successfully completed the MyUTNEnglishClass English program,", w / 2, 335, w - 200, 24);
    wrapText(ctx, "completing all six levels of the Common European Framework, from A1 to C2.", w / 2, 359, w - 200, 24);

    ctx.fillStyle = "#565B5E";
    ctx.font = "14px 'Space Grotesk', sans-serif";
    var today = new Date();
    var fecha = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillText("Issued on " + fecha, w / 2, 430);

    ctx.textAlign = "left";
    ctx.fillStyle = "#16181A";
    ctx.font = "13px 'Space Grotesk', sans-serif";
    ctx.fillText("Social Service Program", 70, h - 100);
    ctx.fillText("Education, Arts, Culture and Sports", 70, h - 80);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";
    var lines = [];
    words.forEach(function (word) {
      var test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        lines.push(line);
        line = word + " ";
      } else {
        line = test;
      }
    });
    lines.push(line);
    lines.forEach(function (l, i) { ctx.fillText(l.trim(), x, y + i * lineHeight); });
  }

  document.getElementById("certificate-btn").addEventListener("click", function () {
    drawCertificate();
    var canvas = document.getElementById("certificate-canvas");
    var link = document.createElement("a");
    link.download = "Certificate-MyUTNEnglishClass-" + state.profile.name.replace(/\s+/g, "_") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  /* ============ CONGRATULATIONS MODAL ============ */
  function openCongratsModal() { document.getElementById("congrats-modal").hidden = false; }
  function closeCongratsModal() { document.getElementById("congrats-modal").hidden = true; }
  document.getElementById("congrats-close").addEventListener("click", function () {
    closeCongratsModal();
    goto("progreso");
  });

