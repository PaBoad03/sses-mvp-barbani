# Guion de la presentación comercial — 15 minutos, 6 voces

Estructura: **dolor → solución → por qué nosotros → cómo está construido → cómo se ejecuta (metodología, cronograma, pilotaje, riesgos) → oferta → demo en vivo → cierre**. Técnica *Tell–Show–Tell* en la demo: se anuncia lo que se va a ver, se muestra y se resume en beneficios.

> Reparto propuesto: cámbienlo si quieren, pero que **cada integrante hable**. Los textos son una guía: díganlos con sus palabras, no los lean. A ritmo normal, unas 130 palabras son un minuto. Los cambios de persona se hacen sin presentarse ni pasarse la palabra: el siguiente da un paso al frente y empieza.

## Reparto

| Integrante | Qué dice | Diapositivas | Tiempo |
|---|---|---|---|
| **Juan David Henao Osorio** | Quiénes somos, el problema y la solución | 1, 2, 3 | 0:00–2:30 |
| **Andrés Felipe Sánchez García** | Por qué BARBANI y la arquitectura | 4, 5 | 2:30–4:30 |
| **Santiago Bazzani Rincón** | Metodología y cronograma con línea base | 6, 7 | 4:30–6:45 |
| **Daniel David Gómez Britto** | Pilotaje y riesgos; en la demo, el coordinador | 8, 9, 11 | 6:45–8:45 y 9:30–11:30 |
| **Cristian Manuel Castañeda** | La oferta; en la demo, el tutor, el analista y el resumen | 10, 11 | 8:45–9:30 y 11:30–14:00 |
| **Pablo Boada Rozo** | **Maneja el computador** en la demo y da el cierre | 12 | 14:00–14:30 |

Quedan **30 segundos de margen**. Mientras alguien habla, el resto mira al jurado o a la pantalla, nunca al celular. Las notas de cada diapositiva (tecla **N** en el visor) tienen el nombre de quien habla y su texto.

## Antes de entrar al salón (responsable: Pablo)
- [ ] MVP abierto: GitHub Pages si hay buen internet (se ve con animaciones), o `index.html` local con doble clic si no.
- [ ] **Reiniciar demo** y verificar que diga *En línea*.
- [ ] Zoom del navegador al 110–125 % para que se lea desde el fondo.
- [ ] Diapositivas abiertas en otra ventana: `presentacion/index.html`. Alt+Tab ensayado entre las dos.
- [ ] Respaldo: el MVP abierto en un celular.
- [ ] Un cronómetro visible para quien presenta (el celular de alguien en la mesa, boca arriba).

---

## Parte 1 · El problema y la solución — Juan David (0:00–2:30)

### 0:00–0:30 · Diapositiva 1, Portada
> "Buenos días. Somos BARBANI. Construimos y operamos el piloto que saca el seguimiento extracurricular del Ministerio de las hojas de cálculo."

### 0:30–1:30 · Diapositiva 2, El problema
> "Imaginen a un coordinador del Ministerio. Abre la hoja y encuentra la misma institución escrita dos veces, más inscritos que cupos y un cambio que nadie sabe quién hizo. Multipliquen eso por millones de registros y todas las regiones del país. Con eso no se decide llevar un sistema a escala nacional. El pliego lo nombra: falta trazabilidad, integridad, control y disponibilidad de los datos."

### 1:30–2:30 · Diapositiva 3, La solución
> "Nuestra respuesta: SSES hace cumplir las reglas del pliego por sí solo. Trajimos un MVP que prueba una sola hipótesis: que el Ministerio puede dejar las hojas sin perder el control. Funciona con los tres actores que lo usan: el coordinador crea estrategias sin pasar del cupo, el tutor registra cada semana con o sin internet, y el analista ve el cumplimiento al instante. Es un MVP tipo *Wizard of Oz*: la interfaz es real y la lógica se simula, con datos ficticios. No trajimos un login ni pantallas genéricas: trajimos lo que el Ministerio pidió."

## Parte 2 · Por qué BARBANI y cómo está construido — Andrés Felipe (2:30–4:30)

### 2:30–3:30 · Diapositiva 4, Por qué BARBANI
> "BARBANI responde a lo que el pliego valora especialmente. Conectividad limitada: el tutor registra sin internet, y lo van a ver en la demo. Alta concurrencia: probamos con mil usuarios al tiempo y dos millones de registros. Pilotaje con usuarios reales: treinta sesiones con tutores en las cinco regiones."

### 3:30–4:30 · Diapositiva 5, Arquitectura
> "Así está construido. El tutor usa el celular o el computador y puede registrar sin señal. Todo entra por Front Door, que lo acerca a cada región. La lógica corre en dos zonas de Azure con autoescalado, para aguantar la concurrencia. Los datos van en PostgreSQL, que es lo que garantiza la regla de no editar una estrategia con estudiantes. Las cargas grandes y los reportes pesados corren aparte, para no frenar a nadie, y todo queda monitoreado durante el pilotaje."

## Parte 3 · Cómo se ejecuta — Santiago (4:30–6:45) y Daniel (6:45–8:45)

### 4:30–5:30 · Diapositiva 6, Metodología — **Santiago**
> "Usamos una metodología híbrida. El plazo es perentorio, así que planeación, diseño, pruebas, pilotaje y cierre van con plan fijo. La construcción va en Scrum: cuatro sprints de dos semanas, con una revisión con el Ministerio al final de cada uno. El Product Owner es el coordinador del MEN, y cada quince días hay comité de seguimiento. Cualquier cambio a la línea base pasa por control de cambios. El equipo son trece personas."

### 5:30–6:45 · Diapositiva 7, Cronograma — **Santiago**
> "Este es el cronograma, del 1 de diciembre al 30 de abril. En las primeras tres semanas validamos con el Ministerio lo que ya está en la propuesta y lo congelamos como línea base el 18 de diciembre. Después, diseño hasta el 15 de enero, construcción hasta el 12 de marzo, pruebas y salida a producción el 2 de abril, y el pilotaje del 5 al 23 de abril. La línea base es lo que responde a las necesidades: estrategias, acompañamientos, reportes, pruebas y pilotaje. Si eso se atrasa, se atrasa el proyecto, por eso la protegemos. El login y la administración de usuarios quedan por fuera, con holgura: si se demoran, no mueven el cierre."

### 6:45–7:45 · Diapositiva 8, Pilotaje — **Daniel**
> "El pilotaje dura tres semanas: treinta sesiones, seis por región, con diez a quince tutores cada una. Los tutores hacen tareas reales: programar un acompañamiento y registrar el seguimiento, mientras monitoreamos el sistema y la mesa de soporte atiende en vivo. La última sesión de cada región es simultánea, para medir la concurrencia de verdad. De ahí salen los tres entregables que pide el pliego: el registro y el desempeño, la voz de los tutores y el informe integral."

### 7:45–8:45 · Diapositiva 9, Riesgos — **Daniel**
> "Solo incluimos los riesgos que, si pasan, corren una fecha de la línea base. El más probable: que el coordinador del Ministerio no tenga tiempo de validar en diciembre, por el cierre de año; por eso agendamos esas sesiones desde el acta de inicio. Si se retira un desarrollador, hay código revisado en pares y dos candidatos listos. Si llegan pocos tutores, hay convocatoria oficial y una sesión de reserva por región. Y si el sistema no aguanta, lo sabremos desde el sprint 1, porque probamos con dos millones de registros. La reserva de contingencia cubre todo esto."

## Parte 4 · La oferta — Cristian (8:45–9:30)

### 8:45–9:30 · Diapositiva 10, La oferta
> "El valor total es de ciento noventa y ocho coma cuatro millones, impuestos incluidos. La mayor parte es el equipo; la infraestructura en Azure se costeó con la calculadora oficial, y hay una reserva del cinco por ciento para los riesgos. Quedamos un millón seiscientos por debajo del presupuesto. Ahora se lo mostramos funcionando."

## Parte 5 · Demo en vivo — Daniel y Cristian narran, Pablo maneja (9:30–14:00)

### 9:30–9:45 · Diapositiva 11, Demo (*Tell*) — **Daniel**
> "Van a ver tres reglas cumplidas: una estrategia con estudiantes no se puede editar, un registro sin internet no se pierde, y el reporte cambia en el momento."

*(Pablo pasa al navegador, que está en la portada del MVP.)*

### 9:45–11:30 · Coordinador — **Daniel narra, Pablo hace los clics**

| Pablo hace | Daniel dice |
|---|---|
| Muestra la portada (el collage cambia solo) | "Esta es la hoja de hoy, con sus errores, y esto es SSES." |
| Clic en **Coordinador** | "Entramos como coordinador, sin contraseña: eso no es lo que el Ministerio necesita ver." |
| **Crear estrategia** → elige **IE Selva Verde**, nombre *Huerta escolar*, un objetivo, fecha de fin **antes** que la de inicio, cupo 5 → **Crear estrategia** | "La entidad se elige de una lista, así no queda escrita de dos formas. Y si me equivoco en las fechas…" |
| Aparece el error bajo la fecha → corrige la fecha → **Crear estrategia** | "…el sistema me lo dice antes de guardar. Ahora sí: la estrategia queda activa." |
| **Vincular estudiantes** → marca 5 → intenta marcar el sexto | "Los estudiantes ya están cargados: solo se buscan y se marcan. Y el sistema no deja pasar del cupo." |
| **Vincular 5 estudiantes** → **Editar estrategia** → aviso rojo | "Ahora que tiene estudiantes intento editarla… y no me deja. Es la regla del pliego: a quien ya se inscribió no se le cambian las condiciones." |
| **Crear nueva versión** → cambia el nombre a *Huerta escolar 2027* → **Publicar nueva versión** | "Si de verdad hay que cambiarla, se publica una nueva versión. La original queda cerrada, y los cinco estudiantes conservan lo que se les ofreció." |

### 11:30–12:45 · Tutor — **Cristian narra, Pablo hace los clics**

| Pablo hace | Cristian dice |
|---|---|
| Clic en **Tutor** | "Esta es Laura, tutora en la región Andina. Ve sus acompañamientos de noviembre, semana por semana: lo verde está registrado y lo punteado está por registrar." |
| Clic en **En línea** → pasa a *Sin conexión* | "Ahora Laura está en una vereda sin señal." |
| **Semana 3** (borde punteado) del individual → escribe una actividad, avance **Alto** → **Guardar seguimiento** | "Igual registra la semana: la asistencia, lo que hicieron y el avance del docente." |
| Señala la semana en amarillo, *Pendiente de sincronizar* | "Queda guardada en su equipo, no se pierde." |
| Clic en **Sin conexión** → vuelve *En línea* | "Vuelve la señal… y se envía sola. Laura no tiene que repetir nada." |

### 12:45–13:45 · Analista — **Cristian narra, Pablo hace los clics**

| Pablo hace | Cristian dice |
|---|---|
| Clic en **Analista** | "Ahora, el analista del Ministerio, con los indicadores del mes." |
| Señala la barra de Laura: **83 %** | "Laura estaba en 67 % de cumplimiento. Con lo que registró hace un minuto, ya está en 83 %." |
| Clic en **Laura Méndez** (abre el detalle) | "La lista va de menor a mayor, para ver primero a quién apoyar, y se puede revisar semana a semana." |
| **Descargar en Excel** | "Y se descarga en Excel: los números salen siempre de la misma fuente." |

*(Pablo vuelve a las diapositivas: la 11.)*

### 13:45–14:00 · Diapositiva 11, Demo (*Tell* final) — **Cristian**
> "Las tres reglas, cumplidas: sin editar lo que ya tiene estudiantes, sin perder registros y con el reporte al día."

## Parte 6 · Cierre — Pablo (14:00–14:30)

### Diapositiva 12, Cierre
> "Sin hojas compartidas. Reglas que se cumplen solas. Evidencia para decidir. Adjudíquennos el piloto y empezamos el primero de diciembre. Gracias."

*(Silencio. Mirar al jurado. Esperar las preguntas.)*

---

## Si el tiempo se va (en este orden)
1. En la demo del coordinador, saltar la creación de la estrategia: usar *Semillero de lectura en voz alta*, que ya existe, y vincular 3 (ahorra 45 s).
2. En el analista, saltar el detalle y la descarga (ahorra 30 s).
3. En riesgos, decir solo el primero y la reserva (ahorra 30 s).

## Preguntas probables del jurado (quién responde)

| Pregunta | Responde | Respuesta |
|---|---|---|
| "¿Esto es un MVP o un prototipo?" | **Juan David** | Un MVP tipo *Wizard of Oz*: la interfaz es real y la lógica se simula, para validar la hipótesis con el cliente con el menor esfuerzo (Eric Ries). No está montado en Azure a propósito. |
| "¿Por qué no tiene login?" | **Juan David** | No prueba la hipótesis ni diferencia la propuesta; además está fuera de la línea base (CU-17). Se construye con holgura en enero y marzo. |
| "¿Y los millones de registros? ¿Y la concurrencia?" | **Andrés Felipe** | Son restricciones del piloto, no del MVP. Están cubiertas por RNF-01 y RNF-02 y por las pruebas CP-34 a CP-36 (volumen, carga y estrés); producción en 2 zonas con autoescalado. |
| "¿Qué es la línea base? ¿Qué pasa si se atrasan?" | **Santiago** | Las actividades indispensables para responder a las necesidades, aprobadas el 18 de diciembre. Si se atrasan, se atrasa el proyecto; por eso tienen control de cambios. Lo que está fuera (login, usuarios, exportación) tiene holgura. |
| "¿Qué pasa si desvinculo a todos los estudiantes?" | **Daniel** (Pablo lo muestra) | La estrategia vuelve a ser editable (supuesto de la sección 3.5.3). Se puede mostrar en vivo. |
| "¿Cómo miden la percepción de los tutores?" | **Daniel** | Encuesta integrada en el sistema con escala SUS de usabilidad y preguntas abiertas, más 5 entrevistas cortas por región. |
| "¿Dónde está el ente de control? ¿Y los reportes de ley?" | **Cristian** | Fuera del MVP (sección 2.8): se construyen en el sprint 4, el ente de control con acceso de solo lectura. |
| "¿Cómo llegan a $198,4 millones?" | **Cristian** | Equipo de 13 personas por $167,75 M con tarifas de mercado 2026, Azure y herramientas por $21,2 M con la calculadora oficial, y reserva de contingencia del 5 % ($9,45 M). |

Regla: responde quien tiene el tema asignado, sin anunciarlo. Nunca dos personas responden a la vez.

## Plan B (responsable: Pablo)
- Si el navegador falla: seguir la demo en el celular (GitHub Pages) o en otro computador.
- Si algo queda en un estado raro: **Reiniciar demo** y seguir desde el actor que tocaba. El narrador sigue hablando mientras tanto.
