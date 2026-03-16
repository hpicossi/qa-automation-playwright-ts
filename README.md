# QA Automation Framework | Playwright + TypeScript

Framework de automatización profesional con CPOM, API testing, visual regression, sesión autenticada reusable, preparación AI-ready y CI/CD.

## Branding para GitHub

- **Nombre del repo:** `qa-automation-playwright-ts`
- **Descripción corta:** `Senior-style QA Automation Framework with Playwright + TypeScript, CPOM, API validation, visual regression, reusable auth sessions, Allure, and GitHub Actions.`
- **Topics:** `playwright`, `typescript`, `qa-automation`, `e2e-testing`, `api-testing`, `visual-regression`, `allure-report`, `github-actions`, `sdet`, `test-automation`

## Valor profesional

- Arquitectura CPOM con páginas y componentes reutilizables.
- Flujos híbridos UI + API + visual.
- Validación de contratos API con JWT y JSON Schema.
- Sesión autenticada reusable con `storageState` generado por setup.
- Ejecución cross-browser y mobile emulation.
- CI/CD con reportes HTML y Allure.

## Estructura

```text
/tests
  /api
  /e2e
    authenticated-account.spec.ts
    hybrid-ui-api-visual.spec.ts
  /setup
    auth.setup.ts
  /visual
/pages
  /components
    account-menu.component.ts
    navbar.component.ts
    search-bar.component.ts
  base.page.ts
  home.page.ts
  login.page.ts
/data
  /schemas
/utils
  /ai
  /api
  /visual
/.github/workflows
playwright.config.ts
docker-compose.yml
```

## Setup

```bash
npm install
npx playwright install --with-deps
npm run prepare
copy .env.example .env
```

## Entorno recomendado

- `BASE_URL=http://localhost:3000`
- `API_BASE_URL=http://localhost:3000`
- `AUTH_EMAIL=qa.portfolio@example.com`
- `AUTH_PASSWORD=Password123!`

## Levantar app local

Prerequisito: Docker Desktop iniciado.

```bash
npm run app:up
```

Abrir en `http://localhost:3000`.

Para apagar:

```bash
npm run app:down
```

## Comandos principales

```bash
npm test
npm run test:local
npm run test:auth
npm run test:mobile
npm run test:api
npm run test:visual
```

## Comandos recomendados por escenario

### Demo en vivo del flujo híbrido

```bash
npx playwright test --project=chromium --headed --grep "hybrid flow"
```

### Demo autenticada con sesión reusable

```bash
npm run test:auth -- --headed
```

### Ejecución tipo CI / local headless

```bash
npx playwright test --project=chromium --grep "hybrid flow"
```

### Regenerar baseline visual

```bash
npm run test:update-snapshots
```

### Abrir reporte HTML

```bash
npx playwright show-report
```

## Fallback temporal

Si Docker no está disponible:

- `BASE_URL=https://demo.owasp-juice.shop`
- `API_BASE_URL=https://demo.owasp-juice.shop`

## Appium

La integración para pruebas nativas se separa en `mobile/appium/` como capa paralela al framework de Playwright.

## CI/CD (GitHub Actions)

Pipeline configurado en [main.yml](.github/workflows/main.yml):

- **Quality gate:** `lint` + `format:check` + `typecheck`.
- **Ejecución paralela por suites:** `api`, `hybrid`, `auth`.
- **Infra en CI:** levanta Juice Shop con `docker compose up -d`.
- **Artefactos:** `playwright-report`, `test-results`, `allure-results` por suite.

Nota sobre visual en CI:

- En CI se ejecuta con `ENABLE_VISUAL=false` para evitar falsos positivos cross-OS.
- Para validar visual en CI, activar `ENABLE_VISUAL=true` y mantener baselines del runner objetivo.

## Commits recomendados por partes

1. `chore: bootstrap framework base (config + ts + lint)`
2. `feat: implement CPOM (pages + reusable components)`
3. `feat: add API base client with JWT + schema validation`
4. `feat: add visual + AI-ready locator strategy`
5. `feat: integrate local Juice Shop hybrid flow`
6. `feat: add HomePage and SearchBar CPOM`
7. `feat: add reusable authenticated session with storageState`
8. `ci: add github actions + allure artifacts`
9. `ci: add quality gate + local app orchestration + parallel suites`

## Texto listo para LinkedIn

Hoy terminé un proyecto de automatización QA con enfoque Senior usando Playwright + TypeScript.

Qué implementé:
- Arquitectura Component Page Object Model (CPOM).
- Flujos híbridos E2E: UI + API (JWT + JSON Schema) + Visual Regression.
- Sesión autenticada reusable generada por setup vía API y `storageState`.
- Ejecución cross-browser + mobile emulation.
- CI con GitHub Actions y reportes Allure.

Este proyecto me ayudó a reforzar buenas prácticas de diseño de framework, mantenibilidad y observabilidad de pruebas.

Repo: [pega aquí tu URL]

#QA #SDET #Playwright #TypeScript #TestAutomation #E2E #APItesting #QualityEngineering
