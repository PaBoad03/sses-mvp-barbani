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
| 0:15–0:40 | 2. El problema | Contar el dolor desde el coordinador: abre la hoja, alguien la cambió, no sabe quién. |
| 0:40–1:00 | 3. La solución y la hipótesis | "SSES hace cumplir las reglas del pliego por sí solo." |
| 1:00–1:25 | 4. Por qué BARBANI | Criterios que el pliego valora especialmente → respuesta. "El primero lo verán en la demo." |
| 1:25–1:50 | 5. La oferta | 5 meses, $198,4 M, 30 sesiones, 3 informes. "Ahora se lo mostramos funcionando." |
| 1:50–2:00 | 6. Demo (*Tell*) | Anunciar las 3 reglas. Pasar al navegador. |
| 2:00–2:40 | MVP: Coordinador | *Semillero de lectura en voz alta* → *Vincular estudiantes* → marcar 3 → *Vincular*. *Editar estrategia* → bloqueo rojo → señalar *Crear nueva versión*. |
| 2:40–3:35 | MVP: Tutor | *En línea* → *Sin conexión* → *Semana 3* → actividad + avance *Alto* → *Guardar* → *Pendiente de sincronizar* → volver *En línea*. |
| 3:35–4:20 | MVP: Analista | Laura pasa de 67 % a **83 %**; abrir el detalle. |
| 4:20–4:30 | 6. Demo (*Tell* final) | Volver a la diapositiva y resumir: "las tres reglas, cumplidas." |
| 4:30–5:00 | 7. Cierre y petición | "Adjudíquenos el piloto y empezamos el 1 de diciembre. Gracias." Silencio. Preguntas. |

No hay diapositivas con capturas: la demo es siempre en vivo. Si algo falla, **Reiniciar demo** y seguir.

## Preguntas probables del jurado
- **"¿Esto es un MVP o un prototipo?"** → Un MVP tipo *Wizard of Oz*: la interfaz es real y la lógica se simula, para validar la hipótesis con el cliente con el menor esfuerzo (Eric Ries). No está montado en Azure a propósito.
- **"¿Por qué no tiene login?"** → No prueba la hipótesis ni diferencia la propuesta; además está fuera de la línea base (CU-17). Se construye en los sprints.
- **"¿Y los millones de registros?"** → Es una restricción del piloto, no del MVP. Está cubierta por RNF-01 y las pruebas CP-34 a CP-36 (volumen, carga y estrés).
- **"¿Qué pasa si desvinculo a todos los estudiantes?"** → La estrategia vuelve a ser editable (supuesto 3.5.3). Se puede mostrar en vivo.
- **"¿Dónde está el ente de control?"** → Fuera del MVP (sección 2.8): se construye en el sprint 4 con acceso de solo lectura.

## Plan B
- Si el navegador falla: tener el MVP abierto también en el celular (GitHub Pages) o en otro computador.
- Si algo queda en un estado raro: **Reiniciar demo** y seguir desde el actor que se iba a mostrar.
