# Fundamento teórico del MVP

Resumen (en palabras propias) de las fuentes consultadas y de cómo se aplican al MVP de SSES.

## 1. ¿Qué es un MVP?
- Eric Ries (*The Lean Startup*) lo define como la versión de un producto que permite aprender lo máximo posible de los clientes con el menor esfuerzo. Su propósito es el **aprendizaje validado**, no entregar un producto pequeño terminado.
- Un MVP debe partir de una **hipótesis**: si no se puede decir qué se está probando y qué resultado haría cambiar de rumbo, es solo "un producto pequeño".
- **Mínimo** = solo lo esencial para probar la hipótesis. **Viable** = lo que se muestra tiene que funcionar; un MVP que falla da evidencia sobre la implementación, no sobre el valor.
- No confundir con el MMP/MMF (Minimum Marketable Product/Feature), cuyo foco es salir al mercado.

**Aplicación:** nuestra hipótesis es que el MEN puede reemplazar las hojas de cálculo por SSES con las reglas del pliego automatizadas. La presentación "vende" mostrando que esa hipótesis se cumple.

## 2. Tipos de MVP
- **Landing page / video:** describen el producto sin construirlo.
- **Concierge:** el servicio se presta manualmente y el usuario lo sabe.
- **Wizard of Oz:** el usuario ve una interfaz que parece automática, pero detrás no hay sistema real (o lo opera una persona).
- **Mock-up / prototipo navegable:** interfaz gráfica con poco o nada funcionando detrás.

**Aplicación:** usamos un **mock-up navegable tipo Wizard of Oz**: la interfaz es real, la lógica se simula en el navegador y no hay infraestructura.

## 3. Qué incluir y qué no
- El error más común es **sobrecargar** el MVP con funcionalidades.
- Priorizar con **MoSCoW** (Must / Should / Could / Won't) e incluir solo los *Must*. En la práctica, 3 a 5 funcionalidades centrales.
- Cada funcionalidad debe estar ligada a un beneficio real del cliente.
- Dejar fuera lo genérico que "hace cualquiera" (login, administración de usuarios, configuración) y lo avanzado que no prueba la hipótesis.

**Aplicación:** 5 *Must* (los comprometidos en la sección 2.8 de la propuesta) + 2 *Should* de alto valor de venta. Sin login (criterio del profesor; además CU-17 está fuera de la línea base).

## 4. Cómo presentarlo
- **Dolor → solución:** abrir con el problema del cliente (hojas compartidas sin trazabilidad), luego mostrar cómo se resuelve.
- **El cliente es el héroe:** contar la historia desde el coordinador, el tutor y el analista, no desde las funcionalidades.
- **Tell–Show–Tell:** anunciar lo que se va a ver, mostrarlo, y cerrar resumiendo en beneficios.
- Ensayar la demo y tener plan B (versión local sin internet, botón de reinicio).

## Fuentes
- Ries, E. *What is an MVP?* — https://leanstartup.co/what-is-an-mvp/
- Agile Alliance. *Minimum Viable Product (MVP)* — https://agilealliance.org/?p=8031702
- Switas. *Minimum viable product* — https://www.switas.com/glossary/minimum-viable-product
- Userlytics. *Minimum Viable Product (MVP)* — https://www.userlytics.com/resources/glossary/minimum-viable-product-mvp/
- Codebridge. *Common Mistakes in the MVP Process* — https://codebridge.tech/articles/common-mistakes-in-the-mvp-process-and-how-to-avoid-them
- Asper Brothers. *MVP Scope Explained* — https://asperbrothers.com/blog/mvp-scope-explained/
- Cesarini, M. *MVP Types* (UniMiB) — https://elearning.unimib.it/mod/resource/view.php?id=496891
- Userpilot. *Types of minimum viable product* — https://userpilot.com/blog/types-of-minimum-viable-product/
- Presales Collective. *Tell-Show-Tell* — https://www.presalescollective.com/content/the-1-most-important-foundational-demo-technique-on-the-planet-tell-show-tell
- Saleo. *Mastering Demo Storytelling* — https://saleo.io/mastering-demo-storytelling-for-presales-teams/
