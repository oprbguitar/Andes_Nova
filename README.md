# AndesNova

Portal corporativo de AndesNova, construido con React, Vite, TypeScript, Framer Motion y Lucide React.

## Demo en GitHub Pages

Sitio publicado: [https://oprbguitar.github.io/Andes_Nova/](https://oprbguitar.github.io/Andes_Nova/)

La publicación se realiza con GitHub Actions mediante `.github/workflows/pages.yml`. Cada push a `main` ejecuta `npm run build:github` y publica el artefacto `docs/` con GitHub Pages.

## Características

- Portal corporativo responsive en español.
- Identidad visual AndesNova con paleta navy, dorado y teal.
- Grid de servicios con detalle modal.
- Chatbot simulado AndesNova IA+ con respuestas rápidas.
- Secciones de metodología, paquetes, coordinación interna, clientes ficticios, CTA y footer.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run build:github
npm run preview
npm run typecheck
```

Use `npm run build` para Vercel y `npm run build:github` para GitHub Pages.
