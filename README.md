# SSES Piloto · MVP — BARBANI S.A.S.

> **MVP (mock-up navegable, tipo *Wizard of Oz*)** del Sistema de Seguimiento de Actividades Extracurriculares (SSES), propuesto por **BARBANI S.A.S.** al Ministerio de Educación Nacional – Oficina de Tecnología.
> Ejercicio académico — Gestión de Proyectos de Software, Facultad de Ingeniería, Universidad de La Sabana. Profesor: Didier Mauricio Calderón Novoa.
>
> ⚠️ **Todos los datos son ficticios.** Este MVP no está conectado a ninguna base de datos ni a la infraestructura final (Azure). Simula las funcionalidades que tendrá la plataforma.

## 🎯 ¿Qué demuestra?

**Hipótesis que valida:** *El MEN puede dejar las hojas de cálculo compartidas y gestionar estrategias estudiantiles y acompañamientos pedagógicos en un solo lugar, con las reglas del pliego aplicadas automáticamente.*

| # | Funcionalidad | Actor | Necesidad | Caso de uso |
|---|---|---|---|---|
| 1 | Consultar estrategias con cupo usado / disponible | Coordinador | N-02 | CU-04 |
| 2 | Crear estrategia asociada a una entidad predefinida | Coordinador | N-02 | CU-02 |
| 3 | Vincular estudiantes precargados (sin superar el cupo) | Coordinador | N-02 | CU-05 |
| 4 | **Bloqueo de edición** si la estrategia tiene estudiantes + *Crear nueva versión* | Coordinador | N-03 | CU-03 |
| 5 | Registrar seguimiento semanal (con simulación **sin conexión**) | Tutor | N-04, N-08 | CU-09 |
| 6 | Reporte básico de acompañamientos por tutor | Analista MEN | N-05, N-06 | CU-11 / CU-12 |

**No incluye (a propósito):** login, 2FA, administración de usuarios, carga masiva, reportes de ley, vista de ente de control, notificaciones, exportación real, bitácora, backend. Ver [`docs/PLAN.md`](docs/PLAN.md).

## ▶️ Cómo correrlo

- **En línea:** GitHub Pages → `https://paboad03.github.io/sses-mvp-barbani/`
- **Sin internet (recomendado para la sustentación):** descargar el repo y abrir `index.html` con doble clic. No requiere instalar nada. Sin servidor, el navegador no carga los módulos del kit: la app funciona completa, pero el collage del hero queda quieto y el recorrido no se fija al hacer scroll.
- **Reiniciar la demo:** botón *↺ Reiniciar demo* en la barra superior (vuelve a los datos iniciales).

Datos precargados (según la sección 2.8 de la propuesta): **3 entidades, 2 estrategias, 30 estudiantes, 6 docentes, 2 tutores.**

## 🗂️ Estructura

```
├── index.html            ← la app (una sola página): portada + vistas por actor
├── assets/               ← kit de taste-skill 2.5.1 (system.css/js, motion, layout, moments)
├── css/app.css           ← CSS propio de la app, sobre los tokens del kit
├── js/datos.js           ← datos ficticios precargados
├── js/app.js             ← lógica y pantallas
├── .taste-skill/         ← reparto de diseño, historial y exenciones del revisor
├── docs/
│   ├── PLAN.md           ← alcance MoSCoW y trazabilidad N → HU → CU
│   ├── TEORIA_MVP.md     ← fundamento teórico con fuentes
│   ├── GUION_DEMO.md     ← guion de la presentación de 15 minutos, por integrante
│   └── TEORIA_PITCH.md   ← teoría de pitch deck aplicada
├── presentacion/         ← diapositivas: visor HTML, PDF y fuente
└── CHANGELOG.md
```

## 🎨 Diseño

Construido con **taste-skill 2.5.1** (`Leonxlnx/taste-skill`): paleta *cool-white-slate*, tipografía *Funnel*, botones *arrow*, hero *triptych* y momento *pinned-chapters* en el recorrido, todos asignados por los scripts de la skill. Revisión final del gate: `GATE: OPEN`, con las exenciones razonadas en `.taste-skill/waivers.json`.

## 🔀 Control de versiones

- `main` siempre estable (lo que se presenta).
- Ramas por funcionalidad: `feat/<nombre>`; commits con prefijo `feat:`, `fix:`, `docs:`, `chore:`.
- Versiones semánticas con tags: `v0.1` (plan) → `v1.0` (sustentación). Ver [`CHANGELOG.md`](CHANGELOG.md).

## 👥 Equipo BARBANI S.A.S.

| Integrante | Código |
|---|---|
| Pablo Boada Rozo | 314049 |
| Juan David Henao Osorio | 314237 |
| Andrés Felipe Sánchez García | 312803 |
| Santiago Bazzani Rincón | 310457 |
| Daniel David Gómez Britto | 325738 |
| Cristian Manuel Castañeda | 306175 |
