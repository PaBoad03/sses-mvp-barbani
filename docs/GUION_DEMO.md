# Guion de la presentación comercial — 5 minutos

Estructura: **dolor → solución → demo → qué compra el Ministerio → cierre**. Técnica *Tell–Show–Tell*: se anuncia lo que se va a ver, se muestra y se resume en beneficios.

## Antes de entrar al salón
- [ ] Abrir el MVP **local** (`index.html` con doble clic). No depender del wifi del salón.
- [ ] Pulsar **Reiniciar demo**. Verificar que diga *En línea*.
- [ ] Zoom del navegador al 110–125 % para que se lea desde el fondo.
- [ ] Diapositivas abiertas en otra pestaña. Alt+Tab ensayado.
- [ ] Una persona habla y otra maneja el computador (más fluido).

## Minuto a minuto

| Tiempo | Diapositiva / pantalla | Qué se dice (idea, no leer) |
|---|---|---|
| 0:00–0:15 | 1. Portada | "BARBANI construye y opera el piloto que saca el seguimiento extracurricular de las hojas de cálculo." |
| 0:15–0:40 | 2. El problema | Contar el dolor desde el coordinador: abre la hoja, alguien la cambió, no sabe quién. "Con eso no se decide una implementación nacional." |
| 0:40–1:05 | 3. La solución y la hipótesis | "SSES hace cumplir las reglas del pliego por sí solo. Nuestro MVP prueba que el Ministerio puede dejar las hojas sin perder control." |
| 1:05–1:15 | 4. Demo (*Tell*) | Anunciar las 3 reglas que van a ver. Pasar al navegador. |
| 1:15–2:00 | MVP: Coordinador | Estrategias → *Semillero de lectura en voz alta* → *Vincular estudiantes* → marcar 3 → *Vincular 3 estudiantes*. "El sistema no deja pasar del cupo." |
| 2:00–2:30 | MVP: el bloqueo | *Editar estrategia* → bloqueo rojo → señalar *Crear nueva versión*. "Regla del pliego: a quien ya se inscribió no se le cambian las condiciones." |
| 2:30–3:15 | MVP: Tutor | *En línea* → *Sin conexión* → *Semana 3* → actividad + avance *Alto* → *Guardar* → *Pendiente de sincronizar* → volver *En línea* → sincronizado. |
| 3:15–3:35 | MVP: Analista | Laura pasa de 67 % a **83 %**; abrir el detalle. "Lo registrado hace 30 segundos ya está en el reporte." |
| 3:35–3:45 | 4. Demo (*Tell* final) | Volver a la diapositiva y resumir: "las tres reglas, cumplidas." |
| 3:45–4:10 | 5. Por qué BARBANI | Criterios que el pliego valora especialmente → respuesta: sin conexión (lo vieron), 1.000 usuarios y 2 millones de registros, 30 sesiones en 5 regiones. |
| 4:10–4:35 | 6. La oferta | 5 meses, $198,4 M bajo el presupuesto, 30 sesiones, 3 informes. |
| 4:35–5:00 | 7. Cierre y petición | "Adjudíquenos el piloto y empezamos el 1 de diciembre." Silencio. Preguntas. |

Diapositivas 8–10 (respaldo): capturas a pantalla completa, solo si falla el navegador.

## Preguntas probables del jurado
- **"¿Esto es un MVP o un prototipo?"** → Un MVP tipo *Wizard of Oz*: la interfaz es real y la lógica se simula, para validar la hipótesis con el cliente con el menor esfuerzo (Eric Ries). No está montado en Azure a propósito.
- **"¿Por qué no tiene login?"** → No prueba la hipótesis ni diferencia la propuesta; además está fuera de la línea base (CU-17). Se construye en los sprints.
- **"¿Y los millones de registros?"** → Es una restricción del piloto, no del MVP. Está cubierta por RNF-01 y las pruebas CP-34 a CP-36 (volumen, carga y estrés).
- **"¿Qué pasa si desvinculo a todos los estudiantes?"** → La estrategia vuelve a ser editable (supuesto 3.5.3). Se puede mostrar en vivo.
- **"¿Dónde está el ente de control?"** → Fuera del MVP (sección 2.8): se construye en el sprint 4 con acceso de solo lectura.

## Plan B
- Si el navegador falla: tener el MVP en el celular (GitHub Pages) y las capturas en las diapositivas.
- Si algo queda en un estado raro: **Reiniciar demo** y seguir desde el actor que se iba a mostrar.
