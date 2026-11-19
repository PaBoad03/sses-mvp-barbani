"""Construye presentacion/index.html (visor sin internet) y el PDF a partir de presentacion/fuente/.
Uso:  python presentacion/construir.py          (solo el visor)
      python presentacion/construir.py --pdf    (visor + PDF; requiere Playwright y Chrome)"""
import html, json, pathlib, re, sys
B = pathlib.Path(__file__).resolve().parent
d = json.loads((B / 'fuente/deck.json').read_text(encoding='utf-8'))
css = (B / 'fuente/deck.css').read_text(encoding='utf-8')
slots = []
for i in d['order']:
    h = (B / f'fuente/slides/{i}.html').read_text(encoding='utf-8').strip()
    m = re.search(r'<aside>(.*?)</aside>', h, re.S)
    note = m.group(1).strip() if m else ''
    h = re.sub(r'<aside>.*?</aside>\s*', '', h, flags=re.S)
    slots.append(f'<div class="slot" data-note="{html.escape(note)}">{h}</div>')
TPL = (B / 'visor.tpl.html').read_text(encoding='utf-8')
out = TPL.replace('{{TITLE}}', html.escape(d['title'])).replace('{{CSS}}', css).replace('{{SLIDES}}', '\n'.join(slots))
(B / 'index.html').write_text(out, encoding='utf-8')
print('index.html:', len(slots), 'diapositivas')
if '--pdf' in sys.argv:
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(); pg.goto((B / 'index.html').as_uri()); pg.wait_for_timeout(800); pg.emulate_media(media='print')
        pg.pdf(path=str(B / 'SSES_Piloto_Pitch_BARBANI.pdf'), width='1920px', height='1080px', print_background=True,
               margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'})
        b.close()
    print('PDF listo')
