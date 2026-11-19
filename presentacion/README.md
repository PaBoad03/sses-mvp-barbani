# Presentación comercial (15 minutos, demo incluida)

| Archivo | Para qué |
|---|---|
| `index.html` | Visor para presentar. Doble clic, sin internet. **← →** avanzar, **N** notas del orador, **F** pantalla completa |
| `SSES_Piloto_Pitch_BARBANI.pdf` | Para enviar o imprimir (12 páginas) |
| `construir.py`, `visor.tpl.html` | Regeneran el visor y el PDF desde `fuente/`: `python presentacion/construir.py --pdf` |
| `fuente/` | Archivos fuente de las diapositivas (`deck.json`, `deck.css`, `slides/*.html`), tal como están en Claude Slides |

Orden: Portada → Problema → Solución → Por qué BARBANI → Arquitectura → Metodología → Cronograma → Pilotaje → Riesgos → Oferta → **Demo en vivo** → Cierre. Las notas de cada diapositiva dicen quién habla.
El guion minuto a minuto está en [`../docs/GUION_DEMO.md`](../docs/GUION_DEMO.md) y la teoría aplicada en [`../docs/TEORIA_PITCH.md`](../docs/TEORIA_PITCH.md).

> La versión editable está en Claude Slides; desde allí también se exporta a PowerPoint o PDF con las fuentes Funnel exactas. El PDF de esta carpeta se generó con fuentes del sistema.
