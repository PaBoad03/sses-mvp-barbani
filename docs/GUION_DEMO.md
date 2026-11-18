# Guion de la presentación comercial — 5 minutos

Estructura: **dolor → solución → demo → qué compra el Ministerio → cierre**. Técnica *Tell–Show–Tell*: se anuncia lo que se va a ver, se muestra y se resume en beneficios.

## Antes de entrar al salón
- [ ] Abrir el MVP **local** (`index.html` con doble clic). No depender del wifi del salón.
- [ ] Pulsar **Reiniciar demo**. Verificar que diga *En línea*.
- [ ] Zoom del navegador al 110–125 % para que se lea desde el fondo.
- [ ] Diapositivas abiertas en otra pestaña. Alt+Tab ensayado.
- [ ] Una persona habla y otra maneja el computador (más fluido).

## Minuto a minuto

| Tiempo | Qué se ve | Qué se dice (idea, no leer) |
|---|---|---|
| 0:00–0:40 | Diapositivas 1–2: el problema | "Hoy el seguimiento de las actividades extracurriculares del país vive en hojas de cálculo compartidas: la misma entidad escrita dos veces, cupos superados y nadie sabe quién cambió qué. El Ministerio no puede decidir con eso." |
| 0:40–1:10 | Diapositiva 3: la solución y la hipótesis | "BARBANI propone SSES. Trajimos un MVP que prueba una sola cosa: que el Ministerio puede dejar las hojas y tener las reglas del pliego aplicadas solas. Se lo mostramos con los tres actores." |
| 1:10–1:20 | MVP: portada | "Esta es la hoja de hoy. Y estos son los tres actores. Entramos sin contraseña: el login no es lo que el Ministerio necesita ver." |
| 1:20–2:10 | **Coordinador**: Estrategias → *Semillero de lectura en voz alta* (vacía) → *Vincular estudiantes* → marcar 3 → *Vincular 3 estudiantes* | "Cada estrategia muestra su cupo. Los estudiantes ya están cargados: solo se buscan y se marcan. El sistema no deja pasar del cupo." |
| 2:10–2:40 | **El momento clave**: *Editar estrategia* → aparece el bloqueo rojo → señalar *Crear nueva versión* | "Ahora que tiene estudiantes, intento editarla… y no me deja. Es la regla del pliego: a quien ya se inscribió no se le cambian las condiciones. Si necesito cambiarla, creo una nueva versión y la original queda intacta." |
| 2:40–3:25 | **Tutor**: pulsar *En línea* → *Sin conexión* → *Semana 3* (borde punteado) → escribir una actividad, avance *Alto* → *Guardar seguimiento* → semana en amarillo *Pendiente de sincronizar* → pulsar de nuevo para volver *En línea* → *Sincronizado* | "El tutor está en Leticia, sin señal. Igual registra la semana: queda guardada en su equipo y, cuando vuelve internet, se envía sola. El pliego pide funcionar con conectividad limitada: esto es eso." |
| 3:25–3:50 | **Analista**: *Desempeño de tutores* → Laura pasa de 67 % a **83 %** → abrir el detalle | "Lo que el tutor registró hace 30 segundos ya está en el reporte. Ordenado de menor a mayor cumplimiento: el Ministerio ve primero a quién apoyar. Y lo descarga en Excel." |
| 3:50–4:30 | Diapositiva 4: qué compra el Ministerio | "Esto es el MVP. El piloto completo son 5 meses, 30 sesiones con tutores en 5 regiones, pruebas con 1.000 usuarios concurrentes y 2 millones de registros, y tres informes para decidir. Todo por $198,4 millones, bajo el presupuesto." |
| 4:30–5:00 | Diapositiva 5: cierre | "Sin hojas compartidas, con reglas que se cumplen solas y evidencia real para decidir. BARBANI está listo para empezar el 1 de diciembre." |

## Preguntas probables del jurado
- **"¿Esto es un MVP o un prototipo?"** → Un MVP tipo *Wizard of Oz*: la interfaz es real y la lógica se simula, para validar la hipótesis con el cliente con el menor esfuerzo (Eric Ries). No está montado en Azure a propósito.
- **"¿Por qué no tiene login?"** → No prueba la hipótesis ni diferencia la propuesta; además está fuera de la línea base (CU-17). Se construye en los sprints.
- **"¿Y los millones de registros?"** → Es una restricción del piloto, no del MVP. Está cubierta por RNF-01 y las pruebas CP-34 a CP-36 (volumen, carga y estrés).
- **"¿Qué pasa si desvinculo a todos los estudiantes?"** → La estrategia vuelve a ser editable (supuesto 3.5.3). Se puede mostrar en vivo.
- **"¿Dónde está el ente de control?"** → Fuera del MVP (sección 2.8): se construye en el sprint 4 con acceso de solo lectura.

## Plan B
- Si el navegador falla: tener el MVP en el celular (GitHub Pages) y las capturas en las diapositivas.
- Si algo queda en un estado raro: **Reiniciar demo** y seguir desde el actor que se iba a mostrar.
