# Portfolio Evidence Checklist

## Goal

Show technical depth + reliable execution in a single walkthrough.

## 1) Run local app

1. npm run app:up
2. Open http://localhost:3000

## 2) Execute demo tests

1. npm run test:demo
2. npm run test:ci:api

## 3) Generate reports

1. npx playwright show-report
2. Optional Allure (requires Allure CLI):
   - npm run allure:generate
   - npm run allure:open

## 4) Screenshots to capture

1. Terminal with green run for hybrid flow.
2. Terminal with green run for authenticated flow.
3. HTML report summary.
4. GitHub Actions workflow run (quality gate + parallel suites).
5. Repository tree showing CPOM structure.

## 5) What to highlight in interview

1. CPOM with reusable components (search bar, account menu, navbar).
2. Hybrid E2E combining API contract + UI + visual validation.
3. Reusable authenticated session using setup and storageState.
4. CI pipeline with quality gate, local app orchestration, and artifacts.

## 6) Final verification before posting

1. npm run typecheck
2. npm run lint
3. npm run test:demo
4. git status clean
