/* SSES Piloto · MVP (mock-up navegable, tipo Wizard of Oz)
   Toda la lógica corre en el navegador; no hay servidor. */
(function () {
  'use strict';

  const CLAVE = 'sses-mvp-estado-v1';
  let app = document.getElementById('otra');
  const vistas = { coordinador: document.getElementById('coordinador'), tutor: document.getElementById('tutor'), analista: document.getElementById('analista'), '': document.getElementById('otra') };
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clonar = o => JSON.parse(JSON.stringify(o));

  // ---------- estado ----------
  let memoria = null;
  function cargar() {
    try { const s = localStorage.getItem(CLAVE); if (s) return JSON.parse(s); } catch (e) { /* sin storage */ }
    return memoria || inicial();
  }
  function inicial() { const d = clonar(window.SSES_DATOS_INICIALES); d.offline = false; d.tutorActivo = 'T1'; return d; }
  function guardar() { memoria = db; try { localStorage.setItem(CLAVE, JSON.stringify(db)); } catch (e) { /* sin storage */ } }
  let db = cargar();

  const entidad = id => db.entidades.find(e => e.id === id);
  const estudiante = id => db.estudiantes.find(e => e.id === id);
  const docente = id => db.docentes.find(e => e.id === id);
  const tutor = id => db.tutores.find(e => e.id === id);
  const estrategia = id => db.estrategias.find(e => e.id === id);

  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const fecha = iso => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MESES[m - 1]} ${y}`; };
  const fechaCorta = iso => { const [, m, d] = iso.split('-').map(Number); return `${d} ${MESES[m - 1]}`; };

  // ---------- iconos ----------
  const I = {
    lock: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    wifi: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></svg>',
    wifiOff: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M3 3l18 18M9 15.5a5 5 0 0 1 6 0M5.5 12a10 10 0 0 1 4-2.3M14.5 9.7a10 10 0 0 1 4 2.3M2 8.5a15 15 0 0 1 4.5-2.9"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></svg>',
    sync: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 0 1-14.3 4.9M4 12a8 8 0 0 1 14.3-4.9"/><path d="M18.5 3v4.2h-4.2M5.5 21v-4.2h4.2"/></svg>',
    chev: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    mark: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 18V6M4 18h16M8 14l3-4 3 2 5-6"/></svg>'
  };

  // ---------- toast ----------
  function toast(msg, tipo) {
    const t = document.createElement('div');
    t.className = 'toast' + (tipo === 'warn' ? ' toast--warn' : '');
    t.setAttribute('role', 'status');
    t.innerHTML = (tipo === 'warn' ? I.wifiOff : I.check) + '<span>' + esc(msg) + '</span>';
    const cont = $('#toasts');
    while (cont.children.length >= 2) cont.firstElementChild.remove();
    cont.appendChild(t);
    setTimeout(() => t.remove(), 3600);
  }

  // ---------- componentes ----------
  function cupoBar(e, grande) {
    const usados = e.estudiantes.length, pct = Math.min(100, Math.round(usados / e.cupo * 100));
    const libre = e.cupo - usados;
    return `<div class="cupo${grande ? ' cupo--lg' : ''}">
      <div class="cupo__bar" role="img" aria-label="${usados} de ${e.cupo} cupos usados"><div class="cupo__fill${libre === 0 ? ' full' : ''}" style="width:${pct}%"></div></div>
      <div class="cupo__txt">${usados} de ${e.cupo} cupos usados, ${libre} disponibles</div></div>`;
  }
  function tagEstado(e) {
    if (e.estado === 'cerrada') return '<span class="tag">Cerrada a nuevos estudiantes</span>';
    if (e.estudiantes.length) return `<span class="tag tag--danger">${I.lock.replace(/28/g, '13')} Con estudiantes, no editable</span>`;
    return '<span class="tag tag--ok">Activa, editable</span>';
  }
  function cabecera(titulo, sub, acciones, migas) {
    return `${migas ? `<nav class="crumbs" aria-label="Ruta">${migas}</nav>` : ''}
      <div class="pagehead"><div><h1 class="view-title">${titulo}</h1>${sub ? `<p class="view-sub">${sub}</p>` : ''}</div>${acciones || ''}</div>`;
  }

  // ---------- métricas del reporte ----------
  function vencida(sem) { return sem.fecha <= db.hoy; }
  function metricasTutor(tid) {
    const acs = db.acompanamientos.filter(a => a.tutorId === tid);
    let vencidas = 0, registradas = 0, reprog = 0, pendSync = 0;
    const docs = new Set();
    acs.forEach(a => {
      a.docentes.forEach(d => docs.add(d));
      a.semanas.forEach((s, i) => {
        const r = a.registros[i];
        if (vencida(s)) vencidas++;
        if (r.estado === 'registrada' && r.sync === 'ok') registradas++;
        if (r.estado === 'registrada' && r.sync === 'pendiente') pendSync++;
        if (r.estado === 'reprogramada') reprog++;
      });
    });
    return { acs: acs.length, docentes: docs.size, vencidas, registradas, reprog, pendSync, pct: vencidas ? Math.round(registradas / vencidas * 100) : 0 };
  }
  const colorPct = p => p >= 80 ? 'var(--ok)' : p >= 50 ? 'var(--accent)' : 'var(--danger)';
  const pendientesSync = () => db.acompanamientos.reduce((n, a) => n + a.registros.filter(r => r.sync === 'pendiente').length, 0);

  // =====================================================================
  // VISTAS
  // =====================================================================

  // ---------- coordinador ----------
  function vEstrategias(q) {
    document.title = 'Estrategias · SSES Piloto';
    const filtro = q.get('entidad') || '';
    const lista = db.estrategias.filter(e => !filtro || e.entidadId === filtro);
    const filas = lista.map(e => {
      const en = entidad(e.entidadId);
      return `<tr class="rowlink" data-href="#coordinador/estrategia/${e.id}">
        <td><a href="#coordinador/estrategia/${e.id}">${esc(e.nombre)}</a>${e.version > 1 ? ` <span class="tag tag--accent">Versión ${e.version}</span>` : ''}
          <div class="small muted">${fecha(e.inicio)} al ${fecha(e.fin)}</div></td>
        <td>${esc(en.nombre)}<div class="small muted">${esc(en.municipio)}, ${esc(en.region)}</div></td>
        <td>${cupoBar(e)}</td>
        <td>${tagEstado(e)}</td>
      </tr>`;
    }).join('');
    return `${cabecera('Estrategias estudiantiles', 'Todas las estrategias del piloto, con su cupo y su estado.', '<a class="btn btn--primary" href="#coordinador/nueva">Crear estrategia</a>')}
      <div class="box">
        <div class="toolbar">
          <div class="fld" style="max-width:320px"><label for="f-ent">Entidad</label>
            <select id="f-ent"><option value="">Todas las entidades</option>
              ${db.entidades.map(en => `<option value="${en.id}" ${filtro === en.id ? 'selected' : ''}>${esc(en.nombre)}</option>`).join('')}
            </select></div>
          <p class="small" style="padding-bottom:12px">${lista.length} ${lista.length === 1 ? 'estrategia' : 'estrategias'}</p>
        </div>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>Estrategia</th><th>Entidad</th><th>Cupo</th><th>Estado</th></tr></thead>
          <tbody>${filas || '<tr><td colspan="4" class="muted">Esta entidad aún no tiene estrategias. Cree la primera con el botón de arriba.</td></tr>'}</tbody>
        </table></div>
      </div>`;
  }
  function bEstrategias() {
    $('#f-ent').addEventListener('change', ev => { location.hash = '#coordinador' + (ev.target.value ? '?entidad=' + ev.target.value : ''); });
    $$('.rowlink').forEach(tr => tr.addEventListener('click', ev => { if (!ev.target.closest('a')) location.hash = tr.dataset.href; }));
  }

  function formEstrategia(modo, e) {
    // modo: 'nueva' | 'editar' | 'version'
    const v = e || { entidadId: '', nombre: '', objetivo: '', inicio: '', fin: '', cupo: '' };
    const titulo = { nueva: 'Crear estrategia', editar: 'Editar estrategia', version: 'Crear nueva versión' }[modo];
    const boton = { nueva: 'Crear estrategia', editar: 'Guardar cambios', version: 'Publicar nueva versión' }[modo];
    const sub = {
      nueva: 'La entidad se elige de la lista de entidades ya registradas, así no queda escrita de dos formas.',
      editar: 'Esta estrategia no tiene estudiantes vinculados, por eso todavía se puede corregir.',
      version: `Se crea una copia sin estudiantes. «${esc(e && e.nombre)}» se conserva igual para los ${e ? e.estudiantes.length : 0} estudiantes que ya participan y se cierra a nuevos estudiantes.`
    }[modo];
    const volver = e ? `#coordinador/estrategia/${e.id}` : '#coordinador';
    const migas = `<a href="#coordinador">Estrategias</a>${e ? ` / <a href="${volver}">${esc(e.nombre)}</a>` : ''} / ${titulo}`;
    return `${cabecera(titulo, sub, '', migas)}
      <form class="box frm" id="f-estr" novalidate data-modo="${modo}" ${e ? `data-id="${e.id}"` : ''}>
        <div class="fld"><label for="i-ent">Entidad</label>
          <select id="i-ent" name="entidadId" ${modo === 'editar' ? '' : ''}>
            <option value="">Seleccione una entidad</option>
            ${db.entidades.map(en => `<option value="${en.id}" ${v.entidadId === en.id ? 'selected' : ''}>${esc(en.nombre)} (${esc(en.municipio)})</option>`).join('')}
          </select></div>
        <div class="fld"><label for="i-nom">Nombre de la estrategia</label>
          <input id="i-nom" name="nombre" value="${esc(modo === 'version' ? v.nombre : v.nombre)}" autocomplete="off" placeholder="Por ejemplo: Club de ciencias"></div>
        <div class="fld"><label for="i-obj">Objetivo</label>
          <textarea id="i-obj" name="objetivo">${esc(v.objetivo)}</textarea></div>
        <div class="frm__row">
          <div class="fld"><label for="i-ini">Fecha de inicio</label><input id="i-ini" name="inicio" type="date" value="${esc(v.inicio)}"></div>
          <div class="fld"><label for="i-fin">Fecha de fin</label><input id="i-fin" name="fin" type="date" value="${esc(v.fin)}"></div>
        </div>
        <div class="fld" style="max-width:220px"><label for="i-cupo">Cupo máximo de estudiantes</label>
          <input id="i-cupo" name="cupo" type="number" min="1" max="500" inputmode="numeric" value="${esc(v.cupo)}"></div>
        <div class="btn-row"><button class="btn btn--primary" type="submit">${boton}</button><a class="btn btn--secondary" href="${volver}">Cancelar</a></div>
      </form>`;
  }
  function bFormEstrategia() {
    const f = $('#f-estr');
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      $$('.fld', f).forEach(x => { x.classList.remove('has-error'); const er = $('.error', x); if (er) er.remove(); });
      const d = Object.fromEntries(new FormData(f));
      d.nombre = d.nombre.trim(); d.objetivo = d.objetivo.trim(); d.cupo = Number(d.cupo);
      const modo = f.dataset.modo, original = f.dataset.id ? estrategia(f.dataset.id) : null;
      const errores = {};
      if (!d.entidadId) errores.entidadId = 'Elija la entidad a la que pertenece la estrategia.';
      if (!d.nombre) errores.nombre = 'Escriba el nombre de la estrategia.';
      else if (db.estrategias.some(x => x.entidadId === d.entidadId && x.nombre.toLowerCase() === d.nombre.toLowerCase() && x !== original && x.estado !== 'cerrada'))
        errores.nombre = 'Esta entidad ya tiene una estrategia activa con ese nombre.';
      if (!d.objetivo) errores.objetivo = 'Escriba el objetivo de la estrategia.';
      if (!d.inicio) errores.inicio = 'Elija la fecha de inicio.';
      if (!d.fin) errores.fin = 'Elija la fecha de fin.';
      else if (d.inicio && d.fin <= d.inicio) errores.fin = 'La fecha de fin debe ser posterior a la de inicio.';
      if (!d.cupo || d.cupo < 1) errores.cupo = 'El cupo debe ser de al menos 1 estudiante.';
      else if (d.cupo > 500) errores.cupo = 'El cupo máximo es 500 estudiantes.';
      else if (modo === 'editar' && original && d.cupo < original.estudiantes.length) errores.cupo = 'El cupo no puede ser menor que los estudiantes vinculados.';
      const campos = Object.keys(errores);
      if (campos.length) {
        campos.forEach(k => { const el = f.elements[k]; const fl = el.closest('.fld'); fl.classList.add('has-error'); el.setAttribute('aria-invalid', 'true'); fl.insertAdjacentHTML('beforeend', `<p class="error">${errores[k]}</p>`); });
        f.elements[campos[0]].focus();
        return;
      }
      if (modo === 'nueva') {
        const id = 'ES' + (db.estrategias.length + 1);
        db.estrategias.push({ id, version: 1, versionDe: null, ...d, estado: 'activa', estudiantes: [], docentes: [] });
        guardar(); toast('Estrategia creada y activa. Ya puede vincular estudiantes.');
        location.hash = '#coordinador/estrategia/' + id;
      } else if (modo === 'editar') {
        if (original.estudiantes.length) { location.hash = `#coordinador/estrategia/${original.id}/editar`; return; }
        Object.assign(original, d); guardar(); toast('Cambios guardados.');
        location.hash = '#coordinador/estrategia/' + original.id;
      } else {
        const id = 'ES' + (db.estrategias.length + 1);
        db.estrategias.push({ id, version: original.version + 1, versionDe: original.id, ...d, estado: 'activa', estudiantes: [], docentes: original.docentes.slice() });
        original.estado = 'cerrada'; original.reemplazadaPor = id;
        guardar(); toast(`Versión ${original.version + 1} publicada. La versión anterior conserva a sus estudiantes.`);
        location.hash = '#coordinador/estrategia/' + id;
      }
    });
  }

  function vDetalle(id) {
    const e = estrategia(id); if (!e) return vNoEncontrado();
    document.title = e.nombre + ' · SSES Piloto';
    const en = entidad(e.entidadId);
    const anterior = e.versionDe ? estrategia(e.versionDe) : null;
    const nueva = e.reemplazadaPor ? estrategia(e.reemplazadaPor) : null;
    const acciones = `<div class="btn-row">
      <a class="btn btn--secondary" href="#coordinador/estrategia/${e.id}/editar">Editar estrategia</a>
      ${e.estado === 'cerrada' ? '' : `<a class="btn btn--primary" href="#coordinador/estrategia/${e.id}/vincular">Vincular estudiantes</a>`}</div>`;
    const estudiantes = e.estudiantes.map(estudiante);
    return `${cabecera(esc(e.nombre) + (e.version > 1 ? ` <span class="tag tag--accent" style="vertical-align:middle">Versión ${e.version}</span>` : ''), `${esc(en.nombre)}, ${esc(en.municipio)}. ${fecha(e.inicio)} al ${fecha(e.fin)}.`, acciones, '<a href="#coordinador">Estrategias</a> / ' + esc(e.nombre))}
      ${nueva ? `<p class="note">Esta versión está cerrada a nuevos estudiantes. Los ${e.estudiantes.length} vinculados conservan sus condiciones. La versión vigente es <a href="#coordinador/estrategia/${nueva.id}">${esc(nueva.nombre)} (versión ${nueva.version})</a>.</p>` : ''}
      ${anterior ? `<p class="note">Nueva versión de <a href="#coordinador/estrategia/${anterior.id}">${esc(anterior.nombre)} (versión ${anterior.version})</a>.</p>` : ''}
      <div class="grid2">
        <div class="box">
          <div class="pagehead" style="margin-bottom:12px"><h2>Estudiantes vinculados</h2>${tagEstado(e)}</div>
          ${estudiantes.length ? `<ul class="list scroll">${estudiantes.map(s => `<li><div class="grow">${esc(s.nombre)}<div class="doc">TI ${s.documento}, grado ${s.grado}</div></div>
            ${e.estado === 'cerrada' ? '' : `<button class="btn btn--secondary btn--sm" data-desv="${s.id}" type="button">Desvincular</button>`}</li>`).join('')}</ul>`
            : `<p class="muted">Todavía no hay estudiantes. ${e.estado === 'cerrada' ? '' : `<a href="#coordinador/estrategia/${e.id}/vincular">Vincule los primeros</a>.`}</p>`}
        </div>
        <div>
          <div class="box"><h2 style="margin-bottom:var(--s-4)">Cupo</h2>${cupoBar(e, true)}</div>
          <div class="box"><h2 style="margin-bottom:var(--s-2)">Objetivo</h2><p>${esc(e.objetivo)}</p></div>
          <div class="box"><h2 style="margin-bottom:var(--s-2)">Docentes asociados</h2>
            ${e.docentes.length ? `<ul class="list">${e.docentes.map(docente).map(d => `<li><div class="grow">${esc(d.nombre)}<div class="doc">${esc(d.area)}, tutor: ${esc(tutor(d.tutorId).nombre)}</div></div></li>`).join('')}</ul>` : '<p class="muted">Sin docentes asociados.</p>'}
          </div>
        </div>
      </div>`;
  }
  function bDetalle(id) {
    $$('[data-desv]').forEach(b => b.addEventListener('click', () => {
      const e = estrategia(id), s = estudiante(b.dataset.desv);
      e.estudiantes = e.estudiantes.filter(x => x !== s.id); guardar();
      toast(e.estudiantes.length ? `${s.nombre} desvinculado.` : `${s.nombre} desvinculado. La estrategia ya no tiene estudiantes y se puede editar de nuevo.`);
      render();
    }));
  }

  function vEditar(id) {
    const e = estrategia(id); if (!e) return vNoEncontrado();
    document.title = 'Editar ' + e.nombre + ' · SSES Piloto';
    if (e.estado === 'cerrada') {
      return `${cabecera('Editar estrategia', '', '', `<a href="#coordinador">Estrategias</a> / <a href="#coordinador/estrategia/${e.id}">${esc(e.nombre)}</a> / Editar`)}
        <div class="lock" role="alert"><div class="lock__icon">${I.lock}</div><div>
          <h2>Esta versión ya fue reemplazada</h2>
          <p>Está cerrada a nuevos estudiantes y sus condiciones no cambian. Los ajustes se hacen sobre la versión vigente.</p>
          <div class="btn-row"><a class="btn btn--primary" href="#coordinador/estrategia/${e.reemplazadaPor}">Ir a la versión vigente</a></div></div></div>`;
    }
    if (!e.estudiantes.length) return formEstrategia('editar', e);
    const n = e.estudiantes.length;
    return `${cabecera('Editar estrategia', '', '', `<a href="#coordinador">Estrategias</a> / <a href="#coordinador/estrategia/${e.id}">${esc(e.nombre)}</a> / Editar`)}
      <div class="lock" role="alert" aria-labelledby="h-lock">
        <div class="lock__icon">${I.lock}</div>
        <div>
          <h2 id="h-lock">No se puede editar: ${n} estudiantes ya están vinculados</h2>
          <p>Una estrategia solo se puede modificar mientras no tenga estudiantes. Así, a quienes ya se inscribieron no se les cambian las condiciones que se les ofrecieron.</p>
          <p class="small">Regla del pliego, sección Alcance del objeto. Caso de uso CU-03.</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="#coordinador/estrategia/${e.id}/version">Crear nueva versión</a>
            <a class="btn btn--secondary" href="#coordinador/estrategia/${e.id}">Ver estudiantes vinculados</a>
          </div>
        </div>
      </div>`;
  }

  function vVersion(id) {
    const e = estrategia(id); if (!e) return vNoEncontrado();
    if (!e.estudiantes.length || e.estado === 'cerrada') { location.hash = `#coordinador/estrategia/${id}/editar`; return ''; }
    return formEstrategia('version', e);
  }

  let seleccion = new Set();
  function vVincular(id, q) {
    const e = estrategia(id); if (!e) return vNoEncontrado();
    if (e.estado === 'cerrada') { location.hash = '#coordinador/estrategia/' + id; return ''; }
    document.title = 'Vincular estudiantes · SSES Piloto';
    const en = entidad(e.entidadId);
    const texto = (q.get('q') || '').toLowerCase();
    const todas = q.get('todas') === '1';
    const candidatos = db.estudiantes.filter(s => (todas || s.entidadId === e.entidadId) &&
      (!texto || s.nombre.toLowerCase().includes(texto) || s.documento.includes(texto)));
    const libres = e.cupo - e.estudiantes.length;
    return `${cabecera('Vincular estudiantes', `A «${esc(e.nombre)}». Los estudiantes ya están cargados en el sistema: solo se buscan y se seleccionan.`, '', `<a href="#coordinador">Estrategias</a> / <a href="#coordinador/estrategia/${e.id}">${esc(e.nombre)}</a> / Vincular`)}
      <div class="box">
        <div class="toolbar">
          <div class="fld"><label for="q">Buscar por nombre o documento</label><input id="q" type="search" value="${esc(q.get('q') || '')}" placeholder="Por ejemplo: Rojas o 1098700"></div>
          <label class="check"><input type="checkbox" id="todas" ${todas ? 'checked' : ''}> Incluir estudiantes de otras entidades</label>
        </div>
        ${cupoBar(e, true)}
        <p class="small" style="margin:16px 0 4px">${candidatos.length} estudiantes encontrados${todas ? '' : ' en ' + esc(en.nombre)}</p>
        <ul class="list scroll" id="cands">
          ${candidatos.map(s => {
            const ya = e.estudiantes.includes(s.id);
            return `<li class="${ya ? 'is-disabled' : ''}"><label><input type="checkbox" value="${s.id}" ${ya ? 'checked disabled' : ''} ${seleccion.has(s.id) ? 'checked' : ''}>
              <span class="grow">${esc(s.nombre)}<span class="doc" style="display:block">TI ${s.documento}, grado ${s.grado}, ${esc(entidad(s.entidadId).nombre)}</span></span></label>
              ${ya ? '<span class="tag tag--ok">Ya vinculado</span>' : ''}</li>`;
          }).join('') || '<li class="muted">Ningún estudiante coincide con la búsqueda. Revise el nombre o el número de documento.</li>'}
        </ul>
        <div class="stickybar" aria-live="polite">
          <span class="grow" id="sel-txt"></span>
          <button class="btn btn--primary" id="b-vinc" type="button">Vincular estudiantes</button>
        </div>
        <p class="small" style="margin-top:10px">Cupo disponible antes de esta vinculación: ${libres}.</p>
      </div>`;
  }
  function bVincular(id) {
    const e = estrategia(id);
    const libres = () => e.cupo - e.estudiantes.length;
    const pintar = () => {
      const n = seleccion.size, l = libres();
      $('#sel-txt').textContent = n ? `${n} seleccionados, quedarían ${l - n} cupos libres` : (l ? `Seleccione hasta ${l} estudiantes` : 'La estrategia ya no tiene cupos disponibles');
      $('#b-vinc').disabled = !n;
      $('#b-vinc').textContent = n ? `Vincular ${n} ${n === 1 ? 'estudiante' : 'estudiantes'}` : 'Vincular estudiantes';
      $$('#cands input:not([disabled])').forEach(c => { c.closest('li').classList.toggle('is-disabled', !c.checked && n >= l); c.dataset.full = (!c.checked && n >= l) ? '1' : ''; });
    };
    $$('#cands input:not([disabled])').forEach(c => c.addEventListener('change', () => {
      if (c.checked && seleccion.size >= libres()) { c.checked = false; toast(`Cupo completo: la estrategia admite ${e.cupo} estudiantes.`, 'warn'); return; }
      c.checked ? seleccion.add(c.value) : seleccion.delete(c.value); pintar();
    }));
    let t;
    $('#q').addEventListener('input', ev => { clearTimeout(t); t = setTimeout(() => { navegarQ({ q: ev.target.value }); }, 250); });
    $('#todas').addEventListener('change', ev => navegarQ({ todas: ev.target.checked ? '1' : '' }));
    $('#b-vinc').addEventListener('click', () => {
      const n = seleccion.size; if (!n) return;
      e.estudiantes.push(...seleccion); seleccion = new Set(); guardar();
      toast(`${n} ${n === 1 ? 'estudiante vinculado' : 'estudiantes vinculados'}. La estrategia ya no se puede editar.`);
      location.hash = '#coordinador/estrategia/' + e.id;
    });
    pintar();
  }
  function navegarQ(cambios) {
    const [ruta, qs] = location.hash.split('?'); const p = new URLSearchParams(qs || '');
    Object.entries(cambios).forEach(([k, v]) => v ? p.set(k, v) : p.delete(k));
    const nuevo = ruta + (p.toString() ? '?' + p : '');
    history.replaceState(null, '', nuevo); render(true);
  }

  // ---------- tutor ----------
  function claseSemana(a, i) {
    const r = a.registros[i], s = a.semanas[i];
    if (r.estado === 'registrada') return r.sync === 'pendiente' ? 'sync' : 'done';
    if (r.estado === 'reprogramada') return 'resched';
    return vencida(s) ? 'due' : 'future';
  }
  const textoSemana = { done: 'Registrada', sync: 'Pendiente de sincronizar', resched: 'Reprogramada', due: 'Por registrar', future: 'Próxima' };

  function vTutor() {
    const t = tutor(db.tutorActivo);
    document.title = 'Mis acompañamientos · SSES Piloto';
    const acs = db.acompanamientos.filter(a => a.tutorId === t.id);
    const pend = acs.reduce((n, a) => n + a.registros.filter(r => r.sync === 'pendiente').length, 0);
    return `${cabecera('Mis acompañamientos de noviembre', `Tutor: ${esc(t.nombre)}, región ${esc(t.region)}. Toque una semana para registrar el seguimiento.`,
      `<div class="seg" role="group" aria-label="Ver como tutor">${db.tutores.map(x => `<a href="#tutor" data-tutor="${x.id}" ${x.id === t.id ? 'aria-current="page"' : ''}>${esc(x.nombre)}</a>`).join('')}</div>`)}
      ${pend ? `<div class="note note--warn syncbar">${db.offline ? I.wifiOff : `<span class="spin" style="display:inline-flex">${I.sync}</span>`}
        <span>${pend} ${pend === 1 ? 'registro guardado' : 'registros guardados'} en este equipo. ${db.offline ? 'Se enviarán solos cuando vuelva la conexión.' : 'Sincronizando…'}</span></div>` : ''}
      ${acs.map(a => `
        <article class="acomp">
          <div class="acomp__head">
            <div><h2>${a.tipo === 'Grupal' ? 'Acompañamiento grupal' : 'Acompañamiento individual'}</h2>
              <p class="small">${a.docentes.map(d => esc(docente(d).nombre)).join(' y ')}, ${esc(estrategia(a.estrategiaId).nombre)}</p></div>
            <span class="tag">${a.registros.filter(r => r.estado === 'registrada').length} de 4 semanas registradas</span>
          </div>
          <div class="weeks">
            ${a.semanas.map((s, i) => {
              const c = claseSemana(a, i), clickable = c === 'due' || c === 'done' || c === 'sync';
              const tagName = clickable ? 'button' : 'div';
              return `<${tagName} class="week week--${c}" ${clickable ? `type="button" data-sem="${a.id}:${i}"` : ''}>
                <span class="week__n">Semana ${s.n}</span><span class="week__d">${fechaCorta(s.fecha)}</span>
                <span class="tag ${c === 'done' ? 'tag--ok' : c === 'sync' ? 'tag--warn' : c === 'due' ? 'tag--accent' : ''}" style="margin-top:auto;align-self:flex-start">${c === 'done' ? I.check : ''}${textoSemana[c]}</span>
              </${tagName}>`;
            }).join('')}
          </div>
        </article>`).join('')}`;
  }
  function bTutor() {
    $$('[data-tutor]').forEach(a => a.addEventListener('click', ev => { ev.preventDefault(); db.tutorActivo = a.dataset.tutor; guardar(); render(); }));
    $$('[data-sem]').forEach(b => b.addEventListener('click', () => { const [aid, i] = b.dataset.sem.split(':'); location.hash = `#tutor/${aid}/${Number(i) + 1}`; }));
  }

  function vSemana(aid, n) {
    const a = db.acompanamientos.find(x => x.id === aid); if (!a) return vNoEncontrado();
    const i = Number(n) - 1, s = a.semanas[i], r = a.registros[i]; if (!s) return vNoEncontrado();
    document.title = `Semana ${s.n} · SSES Piloto`;
    const hecho = r.estado === 'registrada';
    return `${cabecera(`Seguimiento de la semana ${s.n}`, `${a.tipo === 'Grupal' ? 'Acompañamiento grupal' : 'Acompañamiento individual'}, semana del ${fecha(s.fecha)}.`, '', `<a href="#tutor">Mis acompañamientos</a> / Semana ${s.n}`)}
      ${db.offline ? `<p class="note note--warn">Está sin conexión. Puede registrar igual: el seguimiento se guarda en este equipo y se envía cuando vuelva internet.</p>` : ''}
      ${hecho ? `<p class="note">Esta semana ya está registrada${r.sync === 'pendiente' ? ' y espera sincronizarse' : ''}. Puede revisar lo que se guardó.</p>` : ''}
      <form class="box frm" id="f-sem" novalidate>
        <fieldset class="fld" style="border:0;padding:0;margin:0"><legend style="font-weight:500;font-size:.92rem;margin-bottom:6px">Asistencia</legend>
          ${a.docentes.map(d => `<label class="check"><input type="checkbox" name="as_${d}" ${hecho ? (r.asistencia[d] ? 'checked' : '') : 'checked'} ${hecho ? 'disabled' : ''}> ${esc(docente(d).nombre)} <span class="muted small">${esc(docente(d).area)}</span></label>`).join('')}
        </fieldset>
        <div class="fld"><label for="s-act">Actividades realizadas</label><textarea id="s-act" name="actividades" ${hecho ? 'disabled' : ''} placeholder="Qué se trabajó con el docente esta semana">${hecho ? esc(r.actividades) : ''}</textarea></div>
        <div class="fld"><label for="s-obs">Observaciones</label><textarea id="s-obs" name="observaciones" ${hecho ? 'disabled' : ''}>${hecho ? esc(r.observaciones) : ''}</textarea></div>
        <div class="fld" style="max-width:260px"><label for="s-av">Avance del docente</label>
          <select id="s-av" name="avance" ${hecho ? 'disabled' : ''}><option value="">Seleccione</option>${['Bajo', 'Medio', 'Alto'].map(x => `<option ${hecho && r.avance === x ? 'selected' : ''}>${x}</option>`).join('')}</select></div>
        <div class="btn-row">${hecho ? '<a class="btn btn--primary" href="#tutor">Volver a mis acompañamientos</a>' : `<button class="btn btn--primary" type="submit">Guardar seguimiento</button><a class="btn btn--secondary" href="#tutor">Cancelar</a>`}</div>
      </form>`;
  }
  function bSemana(aid, n) {
    const f = $('#f-sem'); if (!f || !$('button[type=submit]', f)) return;
    const a = db.acompanamientos.find(x => x.id === aid), i = Number(n) - 1;
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      $$('.fld', f).forEach(x => { x.classList.remove('has-error'); const er = $('.error', x); if (er) er.remove(); });
      const act = f.elements.actividades.value.trim(), av = f.elements.avance.value;
      const err = [];
      if (!act) err.push(['actividades', 'Describa al menos una actividad realizada.']);
      if (!av) err.push(['avance', 'Elija el avance del docente.']);
      if (err.length) { err.forEach(([k, m]) => { const fl = f.elements[k].closest('.fld'); fl.classList.add('has-error'); fl.insertAdjacentHTML('beforeend', `<p class="error">${m}</p>`); }); f.elements[err[0][0]].focus(); return; }
      const asistencia = {}; a.docentes.forEach(d => { asistencia[d] = f.elements['as_' + d].checked; });
      a.registros[i] = { estado: 'registrada', asistencia, actividades: act, observaciones: f.elements.observaciones.value.trim(), avance: av, sync: db.offline ? 'pendiente' : 'ok' };
      guardar();
      db.offline ? toast('Guardado en este equipo. Se enviará cuando vuelva la conexión.', 'warn') : toast(`Semana ${n} registrada. El Ministerio ya la puede ver.`);
      location.hash = '#tutor';
    });
  }

  // ---------- analista ----------
  let abiertos = new Set();
  function vAnalista() {
    document.title = 'Desempeño de tutores · SSES Piloto';
    const filas = db.tutores.map(t => ({ t, m: metricasTutor(t.id) })).sort((x, y) => x.m.pct - y.m.pct);
    const vinc = db.estrategias.reduce((n, e) => n + e.estudiantes.length, 0);
    const tot = filas.reduce((o, { m }) => ({ v: o.v + m.vencidas, r: o.r + m.registradas }), { v: 0, r: 0 });
    const pend = pendientesSync();
    return `${cabecera('Desempeño de tutores', 'Acompañamientos de noviembre de 2026, con corte al ' + fecha(db.hoy) + '. El cumplimiento compara las semanas registradas con las que ya debían estar registradas.',
      '<button class="btn btn--secondary" id="b-csv" type="button">Descargar en Excel</button>')}
      <div class="kpis">
        <div class="kpi"><strong>${db.estrategias.filter(e => e.estado === 'activa').length}</strong><span>estrategias activas</span></div>
        <div class="kpi"><strong>${vinc}</strong><span>estudiantes vinculados</span></div>
        <div class="kpi"><strong>${db.acompanamientos.length}</strong><span>acompañamientos en el mes</span></div>
        <div class="kpi"><strong>${tot.v ? Math.round(tot.r / tot.v * 100) : 0}%</strong><span>cumplimiento general</span></div>
      </div>
      ${pend ? `<p class="note note--warn">${pend} ${pend === 1 ? 'registro está' : 'registros están'} en el equipo de un tutor sin conexión. Aparecerán aquí cuando se sincronicen.</p>` : ''}
      <div class="box"><div class="table-wrap"><table class="table">
        <thead><tr><th>Tutor</th><th class="num">Docentes</th><th class="num">Semanas vencidas</th><th class="num">Registradas</th><th class="num">Reprogramadas</th><th>Cumplimiento</th></tr></thead>
        <tbody>${filas.map(({ t, m }) => `
          <tr><td><button class="expander" type="button" data-exp="${t.id}" aria-expanded="${abiertos.has(t.id)}">${I.chev}${esc(t.nombre)}</button><div class="small muted" style="padding-left:22px">${esc(t.region)}</div></td>
            <td class="num">${m.docentes}</td><td class="num">${m.vencidas}</td><td class="num">${m.registradas}</td><td class="num">${m.reprog}</td>
            <td><div class="pct"><div class="pct__bar"><div class="pct__fill" style="width:${m.pct}%;background:${colorPct(m.pct)}"></div></div><b>${m.pct}%</b></div></td></tr>
          ${abiertos.has(t.id) ? `<tr class="detail"><td colspan="6">${db.acompanamientos.filter(a => a.tutorId === t.id).map(a => `
            <p class="small" style="margin:6px 0 8px"><b>${a.tipo}</b>: ${a.docentes.map(d => esc(docente(d).nombre)).join(' y ')}</p>
            <div class="weeks">${a.semanas.map((s, i) => { const c = claseSemana(a, i), r = a.registros[i]; return `<div class="week week--${c}"><span class="week__n">Semana ${s.n}</span>
              <span class="week__d">${r.estado === 'registrada' ? esc(r.actividades) : r.estado === 'reprogramada' ? esc(r.motivo) : textoSemana[c]}</span></div>`; }).join('')}</div>`).join('')}</td></tr>` : ''}`).join('')}
        </tbody></table></div>
        <p class="small" style="margin-top:12px">Ordenado de menor a mayor cumplimiento, para ver primero a quién apoyar.</p>
      </div>`;
  }
  function bAnalista() {
    $$('[data-exp]').forEach(b => b.addEventListener('click', () => { const id = b.dataset.exp; abiertos.has(id) ? abiertos.delete(id) : abiertos.add(id); render(true); }));
    $('#b-csv').addEventListener('click', () => {
      const filas = [['Tutor', 'Región', 'Docentes', 'Semanas vencidas', 'Registradas', 'Reprogramadas', 'Cumplimiento %']];
      db.tutores.forEach(t => { const m = metricasTutor(t.id); filas.push([t.nombre, t.region, m.docentes, m.vencidas, m.registradas, m.reprog, m.pct]); });
      const csv = '﻿' + filas.map(f => f.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      a.download = 'SSES_desempeno_tutores_nov2026.csv'; document.body.appendChild(a); a.click(); a.remove();
      toast('Reporte descargado.');
    });
  }

  function vNoEncontrado() {
    return `${cabecera('No encontramos esa página', 'El enlace puede haber cambiado al reiniciar la demo.')}<a class="btn btn--primary" href="#top">Volver al inicio</a>`;
  }

  // =====================================================================
  // ENRUTADOR
  // =====================================================================
  function rutas(h) {
    const [ruta, qs] = h.replace(/^#\/?/, '').split('?');
    const q = new URLSearchParams(qs || ''); const p = ruta.split('/').filter(Boolean);
    if (!p.length || p[0] === 'top' || p[0] === 'contacto') return { rol: '', portada: true };
    if (p[0] === 'coordinador') {
      if (p.length === 1) return { rol: 'coordinador', html: vEstrategias(q), bind: bEstrategias };
      if (p[1] === 'nueva') return { rol: 'coordinador', html: formEstrategia('nueva'), bind: bFormEstrategia };
      if (p[1] === 'estrategia' && p[2]) {
        if (!p[3]) return { rol: 'coordinador', html: vDetalle(p[2]), bind: () => bDetalle(p[2]) };
        if (p[3] === 'editar') return { rol: 'coordinador', html: vEditar(p[2]), bind: () => $('#f-estr') && bFormEstrategia() };
        if (p[3] === 'version') return { rol: 'coordinador', html: vVersion(p[2]), bind: () => $('#f-estr') && bFormEstrategia() };
        if (p[3] === 'vincular') return { rol: 'coordinador', html: vVincular(p[2], q), bind: () => bVincular(p[2]) };
      }
    }
    if (p[0] === 'tutor') {
      if (p.length === 1) return { rol: 'tutor', html: vTutor(), bind: bTutor };
      if (p[2]) return { rol: 'tutor', html: vSemana(p[1], p[2]), bind: () => bSemana(p[1], p[2]) };
    }
    if (p[0] === 'analista') return { rol: 'analista', html: vAnalista(), bind: bAnalista };
    return { rol: '', html: vNoEncontrado() };
  }

  let ultimaRuta = '';
  const portada = $$('[data-portada]');
  function render(mantenerFoco) {
    const h = location.hash || '#top';
    const base = h.split('?')[0];
    if (!base.includes('/vincular')) seleccion = new Set();
    const activo = document.activeElement && document.activeElement.id;
    const caret = activo && document.activeElement.selectionStart;
    const r = rutas(h);
    const enPortada = !!r.portada;
    portada.forEach(el => { el.hidden = !enPortada; });
    Object.values(vistas).forEach(v => { v.hidden = true; v.innerHTML = ''; });
    app = vistas[r.rol] || vistas[''];
    app.hidden = enPortada;
    if (enPortada) {
      document.title = 'SSES Piloto: seguimiento extracurricular para el MEN · BARBANI';
      if (ultimaRuta && ultimaRuta !== base) { window.scrollTo(0, 0); window.dispatchEvent(new Event('resize')); }
    } else {
      app.innerHTML = '<div class="wrap">' + r.html + '<p class="view-foot">SSES Piloto, MVP académico de BARBANI S.A.S. Todos los nombres y documentos son ficticios.</p></div>';
    }
    $$('.nav__links a[data-rol]').forEach(a => { if (a.dataset.rol === r.rol) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (r.bind) r.bind();
    if (!enPortada && mantenerFoco && activo && document.getElementById(activo)) {
      const el = document.getElementById(activo); el.focus();
      try { if (caret != null) el.setSelectionRange(caret, caret); } catch (e) { /* no aplica */ }
    } else if (!enPortada && base !== ultimaRuta) {
      window.scrollTo(0, 0);
      const h1 = $('h1', app); if (h1 && ultimaRuta) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
    ultimaRuta = base;
    pintarRed();
  }

  // Respaldo del menú en pantallas angostas cuando los módulos del kit no cargan (abriendo el archivo con doble clic).
  setTimeout(() => {
    if (document.documentElement.dataset.tone) return; // system.js ya lo maneja
    const nav = $('.nav'), t = $('.nav__toggle');
    if (!nav || !t) return;
    t.addEventListener('click', () => { const o = !nav.classList.contains('is-open'); nav.classList.toggle('is-open', o); t.setAttribute('aria-expanded', String(o)); });
    $$('.nav__links a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); t.setAttribute('aria-expanded', 'false'); }));
  }, 1500);

  // ---------- conexión simulada ----------
  function pintarRed() {
    const b = $('#b-net');
    b.setAttribute('aria-pressed', String(db.offline));
    $('.net__dot', b).innerHTML = db.offline ? I.wifiOff : I.wifi;
    $('.net__label', b).textContent = db.offline ? 'Sin conexión (simulada)' : 'En línea';
  }
  $('#b-net').addEventListener('click', () => {
    db.offline = !db.offline; guardar();
    if (db.offline) { toast('Modo sin conexión simulado. Los registros se guardarán en este equipo.', 'warn'); render(true); return; }
    const n = pendientesSync();
    render(true);
    if (n) {
      setTimeout(() => {
        db.acompanamientos.forEach(a => a.registros.forEach(r => { if (r.sync === 'pendiente') r.sync = 'ok'; }));
        guardar(); toast(`${n} ${n === 1 ? 'registro sincronizado' : 'registros sincronizados'}. Ya aparecen en los reportes.`); render(true);
      }, 1600);
    } else toast('Conexión restablecida.');
  });

  $('#b-reset').addEventListener('click', () => {
    db = inicial(); seleccion = new Set(); abiertos = new Set(); guardar();
    toast('Demo reiniciada con los datos iniciales.');
    if (location.hash && location.hash !== '#top') location.hash = '#top'; else render();
  });

  window.addEventListener('hashchange', () => render());
  render();
})();
