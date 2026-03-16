# Appium Native Layer (Conceptual Integration)

Este framework usa una estrategia híbrida:

- Playwright para Web Desktop + Mobile Emulation (rápido y estable).
- Appium para escenarios de App Nativa Android/iOS (dispositivo real o cloud).

## Integración recomendada

1. Mantener tests nativos en `mobile/appium/tests`.
2. Compartir data y contratos (`data/` y `utils/api/`) entre capas.
3. Ejecutar suites por pipeline separado o stage adicional en GitHub Actions.

## Comando sugerido

```bash
npm run test:native
```

Agregar ese script cuando conectes el runner real de Appium.
