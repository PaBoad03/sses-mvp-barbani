# Plan del MVP — SSES Piloto

## 1. Tipo de MVP

**Mock-up navegable (Wizard of Oz):** interfaz completa y funcional en el navegador, con datos ficticios en memoria. No hay backend, base de datos ni despliegue en Azure; la lógica de negocio (validaciones, cupo, bloqueo de edición, sincronización) se simula en JavaScript.

**Hipótesis:** el MEN puede reemplazar las hojas de cálculo compartidas por un sistema centralizado que aplica las reglas del pliego automáticamente.

**Métrica de éxito en la sustentación:** el jurado ve, en menos de 3 minutos, el flujo completo *estrategia → estudiantes → bloqueo → seguimiento → reporte*, sin errores.

## 2. Alcance (MoSCoW)

### Must Have — comprometido en la propuesta (sección 2.8)
| Funcionalidad | Necesidad | CU | HU |
|---|---|---|---|
| Crear estrategia asociada a entidad | N-02 | CU-02 | HU-01 |
| Vincular estudiantes precargados | N-02 | CU-05 | HU-03 |
| Bloqueo de edición con estudiantes vinculados | N-03 | CU-03 | HU-02 |
| Registrar seguimiento semanal | N-04 | CU-09 | HU-06 |
| Reporte básico de actividades | N-06 | CU-12 | HU-07, HU-08 |

Soporte: consulta de estrategias (CU-04) y selector de rol (portada).

### Should Have — agregado por su valor de venta
| Funcionalidad | Por qué |
|---|---|
| *Crear nueva versión* (flujo alterno 1 de CU-03) | Responde "¿y si necesito cambiarla?" sin romper la regla |
| *Simular sin conexión* en el registro del tutor (flujo alterno 2 de CU-09) | El pliego "valorará especialmente" las limitaciones de conectividad |

### Won't Have (en este MVP)
| Excluido | Razón |
|---|---|
| Login, 2FA, recuperar contraseña (CU-17) | No vende; fuera de línea base. Se reemplaza por un **selector de rol** sin contraseña |
| Administración de usuarios y roles (CU-16) | Fuera de línea base |
| Carga masiva (CU-01) | Los datos ya vienen precargados |
| Reportes de ley (CU-13), ente de control (CU-14), bitácora (CU-15) | Se construyen en el sprint 4 del proyecto |
| Exportar PDF/Excel real, notificaciones | El botón simula la acción (Wizard of Oz) |
| Backend, Azure, PostgreSQL | El MVP no se monta en la plataforma final |

## 3. Datos ficticios
- 3 entidades, 2 estrategias precargadas, 30 estudiantes, 6 docentes, 2 tutores.
- **Estrategia A** con 18 estudiantes → para demostrar el **bloqueo**.
- **Estrategia B** sin estudiantes → para demostrar **edición permitida** y **vinculación**.
- Acompañamientos de noviembre con algunas semanas ya registradas → el reporte no arranca vacío.

## 4. Pantallas
0. Portada + selector de rol (Coordinador · Tutor · Analista)
1. Coordinador › Estrategias (lista, filtro por entidad, barra de cupo)
2. Coordinador › Nueva estrategia (validaciones)
3. Coordinador › Detalle de estrategia › Vincular estudiantes
4. Coordinador › Editar → bloqueo + *Crear nueva versión*
5. Tutor › Mis acompañamientos › Registrar semana (+ interruptor sin conexión)
6. Analista › Desempeño de tutores (tabla + gráfica, botón descargar simulado)

## 5. Decisiones técnicas
- HTML + CSS + JavaScript puro, sin dependencias ni build → corre con doble clic y sin internet.
- Estado en `localStorage` (con respaldo en memoria) + botón *Reiniciar demo*.
- Marca propia **SSES Piloto · BARBANI**; no se usan logos oficiales del MEN. Franja permanente "Demo – datos ficticios".

## 6. Hitos de versión
| Versión | Contenido |
|---|---|
| v0.1 | Repo, README, plan, teoría |
| v0.5 | Coordinador completo (1–4) |
| v0.8 | Tutor y Analista (5–6) |
| v1.0 | Probado de punta a punta + guion de demo → **sustentación** |
