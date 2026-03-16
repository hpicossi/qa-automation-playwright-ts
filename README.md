# QA Automation Framework | Playwright + TypeScript

Framework de automatización profesional con CPOM, API testing, visual regression, preparación AI-ready y CI/CD.

## Branding para GitHub (recomendado)

- **Nombre del repo:** `qa-automation-playwright-ts`
- **Descripción corta (About):** `Senior-style QA Automation Framework with Playwright + TypeScript, CPOM, API validation, visual regression, Allure, and GitHub Actions.`
- **Topics (tags):** `playwright`, `typescript`, `qa-automation`, `e2e-testing`, `api-testing`, `visual-regression`, `allure-report`, `github-actions`, `sdet`, `test-automation`

## Valor profesional (para reclutadores)

- Arquitectura CPOM (páginas + componentes reutilizables).
- Pruebas híbridas UI + API + visual en un mismo flujo E2E.
- Contratos API con JWT y validación JSON Schema.
- Ejecución paralela multi-browser y mobile emulation.
- CI/CD con artefactos de reporte para debugging.

## Estructura

```text
/tests
  /e2e
  /api
  /visual
/pages
  /components
  /base.page.ts
/data
/utils
  /api
  /ai
  /visual
/.github/workflows
playwright.config.ts
```

## Flujo por partes (commits recomendados)

1. `chore: bootstrap framework base (config + ts + lint)`
2. `feat: implement CPOM (pages + reusable components)`
3. `feat: add API base client with JWT + schema validation`
4. `feat: add visual + AI-ready locator strategy`
5. `ci: add github actions + allure artifacts`
6. `test: add hybrid e2e sample (ui + api + visual)`

## Setup

```bash
npm install
npx playwright install --with-deps
npm run prepare
copy .env.example .env
```

## Target real recomendado (Parte 2)

- `BASE_URL=https://demo.owasp-juice.shop`
- `API_BASE_URL=https://demo.owasp-juice.shop`

El flujo híbrido usa endpoint público de productos para que puedas ejecutar demo sin credenciales privadas.

## Ejecución

```bash
npm test
npm run test:mobile
npm run test:api
npm run test:visual
npx playwright test tests/e2e/hybrid-ui-api-visual.spec.ts --project=chromium --headed
```

## Appium (integración conceptual)

La integración para pruebas nativas se separa en `mobile/appium/` como capa paralela al framework de Playwright.

## Texto listo para LinkedIn (copy/paste)

Hoy terminé un proyecto de automatización QA con enfoque Senior usando Playwright + TypeScript.

Qué implementé:
- Arquitectura Component Page Object Model (CPOM).
- Flujos híbridos E2E: UI + API (JWT + JSON Schema) + Visual Regression.
- Ejecución cross-browser + mobile emulation.
- CI con GitHub Actions y reportes Allure.

Este proyecto me ayudó a reforzar buenas prácticas de diseño de framework, mantenibilidad y observabilidad de pruebas.

Repo: [pega aquí tu URL]

#QA #SDET #Playwright #TypeScript #TestAutomation #E2E #APItesting #QualityEngineering
