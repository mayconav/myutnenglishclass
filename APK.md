# APK de Android — MyUTN English Class

La app Android es un envoltorio (Capacitor) que abre tu sitio https://myutnenglishclass.vercel.app.
Por eso **los cambios que subas al sitio se ven en la app sin generar otro APK**.
Solo necesitas un APK nuevo si cambias algo dentro de `android/`, `capacitor.config.json` o `package.json`.

## Cómo se genera el APK (GitHub lo compila por ti)
1. Sube el proyecto a GitHub (`git add .`, `git commit`, `git push`).
2. En GitHub: pestaña **Actions** → **Build APK** → **Run workflow** (la primera vez también corre sola).
3. Espera ~5 min. El workflow guarda el APK en `download/MyUTNEnglishClass.apk` y Vercel lo publica.
4. Desde el celular abre: https://myutnenglishclass.vercel.app/descargar.html

## Importante
- Antes de tu siguiente `git push`, haz `git pull`: el workflow agrega un commit con el APK.
- `android/app/release.keystore` es la llave de firma. **No la borres ni la cambies**: si cambia, Android no deja actualizar la app instalada (habría que desinstalarla).
- iPhone no puede instalar APK; ahí se usa "Agregar a pantalla de inicio" (el sitio ya es PWA).
