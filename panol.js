// Prototipo Pañol ITR - Figma
// Se corre como plugin (Plugins > Development > New plugin) pegando esto en code.js

const negro = '#0E0E0E';
const lateral = '#141414';
const gris1 = '#1B1B1A';
const gris2 = '#262624';
const borde = '#33332F';
const blanco = '#F5F3EE';
const apagado = '#8D8A82';
const amarillo = '#FFCC00';
const amarillo2 = '#FFE066';
const tinta = '#111111';

// color de letra y de fondo para cada estado
const estados = {
  Disponible: ['#4ADE80', '#15301F'],
  Prestado: ['#7CB0FF', '#172238'],
  Pinchada: ['#FB923C', '#3A2414'],
  Rota: ['#F87171', '#3A1818'],
  Perdida: ['#C4C0B8', '#2B2A27'],
};

const titulo = 'Barlow Condensed';
const cuerpo = 'Barlow';

async function fuentes() {
  const lista = [
    [titulo, 'Black Italic'], [titulo, 'ExtraBold Italic'], [titulo, 'Black'], [titulo, 'Bold'],
    [cuerpo, 'Regular'], [cuerpo, 'Medium'], [cuerpo, 'SemiBold'],
  ];
  for (const [family, style] of lista) await figma.loadFontAsync({ family, style });
}

function color(hex, op) {
  const c = { r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255 };
  const p = { type: 'SOLID', color: c };
  if (op != null) p.opacity = op;
  return [p];
}

function texto(t, o = {}) {
  const n = figma.createText();
  n.fontName = { family: o.f || cuerpo, style: o.s || 'Regular' };
  n.characters = t;
  n.fontSize = o.size || 15;
  n.fills = color(o.c || blanco);
  if (o.ls != null) n.letterSpacing = { unit: 'PERCENT', value: o.ls };
  if (o.lh) n.lineHeight = { unit: 'PIXELS', value: o.lh };
  if (o.mayus) n.textCase = 'UPPER';
  if (o.centro) n.textAlignHorizontal = 'CENTER';
  return n;
}

function autoLayout(dir) {
  const f = figma.createFrame();
  f.layoutMode = dir;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  return f;
}

function padding(f, p) {
  if (p == null) return;
  let a = [p, p, p, p];
  if (Array.isArray(p)) a = p.length == 2 ? [p[0], p[1], p[0], p[1]] : p;
  f.paddingTop = a[0]; f.paddingRight = a[1]; f.paddingBottom = a[2]; f.paddingLeft = a[3];
}

function estilo(f, o) {
  f.fills = o.bg ? color(o.bg) : [];
  if (o.nombre) f.name = o.nombre;
  if (o.gap != null) f.itemSpacing = o.gap;
  padding(f, o.p);
  if (o.r != null) f.cornerRadius = o.r;
  if (o.borde) { f.strokes = color(o.borde); f.strokeWeight = o.grosor || 1; f.strokeAlign = 'INSIDE'; }
  if (o.alinear) f.counterAxisAlignItems = o.alinear;
  if (o.justificar) f.primaryAxisAlignItems = o.justificar;
}

function caja(dir, o = {}) {
  const f = autoLayout(dir);
  estilo(f, o);
  return f;
}

function componente(nombre, dir, o = {}) {
  const c = figma.createComponent();
  c.name = nombre;
  c.layoutMode = dir;
  c.primaryAxisSizingMode = 'AUTO';
  c.counterAxisSizingMode = 'AUTO';
  estilo(c, o);
  return c;
}

// mete un hijo adentro. ancho/alto puede ser 'fill' o un numero
function meter(padre, hijo, ancho, alto) {
  padre.appendChild(hijo);
  if (typeof ancho == 'number' || typeof alto == 'number') {
    hijo.resize(typeof ancho == 'number' ? ancho : hijo.width, typeof alto == 'number' ? alto : hijo.height);
  }
  if (ancho == 'fill') hijo.layoutSizingHorizontal = 'FILL';
  else if (typeof ancho == 'number') hijo.layoutSizingHorizontal = 'FIXED';
  if (alto == 'fill') hijo.layoutSizingVertical = 'FILL';
  else if (typeof alto == 'number') hijo.layoutSizingVertical = 'FIXED';
  return hijo;
}

function textoLargo(padre, t) {
  padre.appendChild(t);
  t.textAutoResize = 'HEIGHT';
  t.layoutSizingHorizontal = 'FILL';
}

function anchoFijo(f, w) {
  f.resize(w, Math.max(f.height, 1));
  if (f.layoutMode == 'VERTICAL') { f.counterAxisSizingMode = 'FIXED'; f.primaryAxisSizingMode = 'AUTO'; }
  else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; }
}

function juntar(lista, nombre, x, y, dir = 'HORIZONTAL') {
  const set = figma.combineAsVariants(lista, figma.currentPage);
  set.name = nombre;
  set.layoutMode = dir;
  set.primaryAxisSizingMode = 'AUTO';
  set.counterAxisSizingMode = 'AUTO';
  set.itemSpacing = 24;
  padding(set, 24);
  set.fills = color(negro);
  set.counterAxisAlignItems = 'MIN';
  set.x = x; set.y = y;
  return set;
}

const iconos = {
  futbol: c => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="19" stroke="${c}" stroke-width="3"/><path d="M24 17L30.66 21.84L28.11 29.66H19.89L17.34 21.84Z" fill="${c}"/><path d="M24 17V6M30.66 21.84L41 18.5M28.11 29.66L34.5 38.5M19.89 29.66L13.5 38.5M17.34 21.84L7 18.5" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  basquet: c => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="19" stroke="${c}" stroke-width="3"/><path d="M24 5V43M5 24H43M11.5 10C18 16 18 32 11.5 38M36.5 10C30 16 30 32 36.5 38" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  voley: c => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="19" stroke="${c}" stroke-width="3"/><path d="M24 24C24 15 28 9 33.5 6.5M24 24C32 28.5 38.5 28 42.5 25M24 24C16 28.5 12.5 35 12.5 40.5M9 12C15 14 20.5 18 24 24" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  paleta: c => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="21" r="13" stroke="${c}" stroke-width="3"/><path d="M29.5 30.5L40 41" stroke="${c}" stroke-width="6" stroke-linecap="round"/><circle cx="39" cy="10" r="4.5" fill="${c}"/></svg>`,
  cono: c => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 5L35 40H13L24 5Z" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M18.5 22.5H29.5M16 31H32M7 41H41" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  grilla: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="5.5" height="5.5" rx="1.5" stroke="${c}" stroke-width="1.8"/><rect x="11.5" y="3" width="5.5" height="5.5" rx="1.5" stroke="${c}" stroke-width="1.8"/><rect x="3" y="11.5" width="5.5" height="5.5" rx="1.5" stroke="${c}" stroke-width="1.8"/><rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.5" stroke="${c}" stroke-width="1.8"/></svg>`,
  flechas: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H15M12 4L15 7L12 10M16 13H5M8 10L5 13L8 16" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  reloj: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" stroke="${c}" stroke-width="1.8"/><path d="M10 6V10L12.5 11.5" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  persona: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="7" r="3.2" stroke="${c}" stroke-width="1.8"/><path d="M4 17C4.8 13.8 7.1 12.2 10 12.2C12.9 12.2 15.2 13.8 16 17" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  tilde: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 10.5L8.5 14.5L15.5 6" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  abajo: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 8L10 12.5L14.5 8" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  flecha: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10H16M11 5L16 10L11 15" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bandera: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 17.5V3.5M5 4H14L12 7.5L14 11H5" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cruz: c => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L15 15M15 5L5 15" stroke="${c}" stroke-width="2" stroke-linecap="round"/></svg>`,
};

function icono(nombre, c, tam) {
  const n = figma.createNodeFromSvg(iconos[nombre](c));
  n.name = 'icono ' + nombre;
  n.fills = [];
  if (tam) n.resize(tam, tam);
  return n;
}

// interacciones
const animar = { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.25 };
const fundido = { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.2 };

function clic(destino, tipo, trans) {
  return { trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: destino, navigation: tipo, transition: trans }] };
}
const cambiar = id => clic(id, 'CHANGE_TO', animar);
const ir = id => clic(id, 'NAVIGATE', fundido);
const abrir = id => clic(id, 'OVERLAY', fundido);
const reemplazar = id => clic(id, 'SWAP', fundido);
const cerrar = { trigger: { type: 'ON_CLICK' }, actions: [{ type: 'CLOSE' }] };

// para los botones que ya tienen hover, se agrega el clic sin borrar lo otro
async function agregarClic(nodo, r) {
  const antes = (nodo.reactions || []).filter(x => x.trigger.type != 'ON_CLICK').map(x => ({ trigger: x.trigger, actions: x.actions }));
  await nodo.setReactionsAsync(antes.concat([r]));
}

function buscar(nombre) {
  return figma.currentPage.findOne(n => n.name == nombre);
}

// el diseño viejo va a otra pagina
async function archivar() {
  const pagina = figma.currentPage;
  let vieja = figma.root.children.find(p => p.name == 'Diseño anterior');
  if (!vieja) {
    vieja = figma.createPage();
    vieja.name = 'Diseño anterior';
  }
  for (const n of [...pagina.children]) vieja.appendChild(n);
  pagina.name = 'Prototipo';
}


// ---------------- COMPONENTES ----------------

async function componentes() {
  await fuentes();
  let y = 1900;

  // etiqueta de estado
  const etiquetas = [];
  for (const k in estados) {
    const [c, fondo] = estados[k];
    const e = componente('Estado=' + k, 'HORIZONTAL', { bg: fondo, r: 999, p: [5, 10], gap: 6, alinear: 'CENTER' });
    const punto = figma.createEllipse();
    punto.resize(7, 7);
    punto.fills = color(c);
    e.appendChild(punto);
    const t = texto(k, { f: titulo, s: 'Bold', size: 12, c: c, ls: 8, mayus: true });
    t.name = 'texto';
    e.appendChild(t);
    etiquetas.push(e);
  }
  const setEstado = juntar(etiquetas, 'Estado', 0, y);
  y += setEstado.height + 40;
  const etiqueta = k => setEstado.children.find(c => c.name == 'Estado=' + k).createInstance();

  // boton con hover
  function hacerBoton(tipo, hover) {
    const prim = tipo == 'Primario';
    let fondo = null;
    if (prim) fondo = hover ? amarillo2 : amarillo;
    else if (hover) fondo = gris2;
    const b = componente('Tipo=' + tipo + ', Estado=' + (hover ? 'Hover' : 'Normal'), 'HORIZONTAL', {
      bg: fondo, r: 12, p: [0, 20], gap: 8, alinear: 'CENTER', justificar: 'CENTER',
      borde: prim ? null : (hover ? blanco : '#4A4A45'), grosor: 1.5,
    });
    const t = texto('Boton', { f: titulo, s: 'Bold', size: 16, c: prim ? tinta : blanco, ls: 6, mayus: true });
    t.name = 'texto';
    b.appendChild(t);
    if (prim) b.appendChild(icono('flecha', tinta, 18));
    b.resize(220, 48);
    b.primaryAxisSizingMode = 'FIXED';
    b.counterAxisSizingMode = 'FIXED';
    return b;
  }
  const setBoton = juntar([hacerBoton('Primario', false), hacerBoton('Primario', true), hacerBoton('Secundario', false), hacerBoton('Secundario', true)], 'Boton', 0, y);
  y += setBoton.height + 40;
  for (const tipo of ['Primario', 'Secundario']) {
    const normal = setBoton.children.find(c => c.name == 'Tipo=' + tipo + ', Estado=Normal');
    const hover = setBoton.children.find(c => c.name == 'Tipo=' + tipo + ', Estado=Hover');
    await normal.setReactionsAsync([{ trigger: { type: 'ON_HOVER' }, actions: [{ type: 'NODE', destinationId: hover.id, navigation: 'CHANGE_TO', transition: animar }] }]);
  }

  // campo del alumno: se completa al tocarlo
  function hacerCampoAlumno(lleno) {
    const c = componente('Estado=' + (lleno ? 'Completo' : 'Vacio'), 'VERTICAL', { gap: 6 });
    anchoFijo(c, 300);
    c.appendChild(texto('Alumno', { f: titulo, s: 'Bold', size: 12, c: apagado, ls: 10, mayus: true }));
    const campo = caja('HORIZONTAL', { bg: gris2, r: 10, p: [0, 12], gap: 10, alinear: 'CENTER', borde: lleno ? amarillo : borde, grosor: lleno ? 1.5 : 1, nombre: 'campo' });
    meter(c, campo, 'fill', 44);
    campo.appendChild(icono('persona', lleno ? amarillo : apagado, 18));
    const t = texto(lleno ? 'Juan Pérez' : 'Tocá para escribir', { s: lleno ? 'SemiBold' : 'Regular', size: 14, c: lleno ? blanco : apagado });
    campo.appendChild(t);
    t.layoutGrow = 1;
    if (lleno) campo.appendChild(icono('tilde', estados.Disponible[0], 18));
    return c;
  }
  const setAlumno = juntar([hacerCampoAlumno(false), hacerCampoAlumno(true)], 'Campo alumno', 0, y);
  y += setAlumno.height + 40;
  const vacio = setAlumno.children[0], completo = setAlumno.children[1];
  await vacio.findOne(n => n.name == 'campo').setReactionsAsync([cambiar(completo.id)]);
  await completo.findOne(n => n.name == 'campo').setReactionsAsync([cambiar(vacio.id)]);

  // listas desplegables
  async function hacerLista(nombre, etiquetaTexto, vacioTexto, ic, opciones) {
    const variantes = ['Vacio', 'Abierto'].concat(opciones);
    const comps = [];
    for (const v of variantes) {
      const abierto = v == 'Abierto';
      const elegido = v != 'Abierto' && v != 'Vacio';
      const c = componente('Estado=' + v, 'VERTICAL', { gap: 6 });
      anchoFijo(c, 300);
      c.appendChild(texto(etiquetaTexto, { f: titulo, s: 'Bold', size: 12, c: apagado, ls: 10, mayus: true }));
      const marcado = abierto || elegido;
      const campo = caja('HORIZONTAL', { bg: gris2, r: 10, p: [0, 12], gap: 10, alinear: 'CENTER', borde: marcado ? amarillo : borde, grosor: marcado ? 1.5 : 1, nombre: 'campo' });
      meter(c, campo, 'fill', 44);
      campo.appendChild(icono(ic, marcado ? amarillo : apagado, 18));
      const t = texto(elegido ? v : vacioTexto, { s: elegido ? 'SemiBold' : 'Regular', size: 14, c: elegido ? blanco : apagado });
      campo.appendChild(t);
      t.layoutGrow = 1;
      campo.appendChild(icono('abajo', abierto ? amarillo : apagado, 18));
      if (abierto) {
        const menu = caja('VERTICAL', { bg: gris2, r: 10, p: 4, gap: 2, borde: borde, nombre: 'opciones' });
        meter(c, menu, 'fill');
        for (const o of opciones) {
          const fila = caja('HORIZONTAL', { r: 8, p: [8, 10], alinear: 'CENTER', nombre: o });
          meter(menu, fila, 'fill');
          fila.appendChild(texto(o, { s: 'Medium', size: 14 }));
        }
      }
      comps.push(c);
    }
    const set = juntar(comps, nombre, 0, y);
    y += set.height + 40;
    const variante = v => set.children.find(c => c.name == 'Estado=' + v);
    for (const v of variantes) {
      const c = variante(v);
      if (v == 'Abierto') {
        for (const o of opciones) await c.findOne(n => n.name == o).setReactionsAsync([cambiar(variante(o).id)]);
        await c.findOne(n => n.name == 'campo').setReactionsAsync([cambiar(variante('Vacio').id)]);
      } else {
        await c.findOne(n => n.name == 'campo').setReactionsAsync([cambiar(variante('Abierto').id)]);
      }
    }
    return set;
  }
  const setDivision = await hacerLista('Campo division', 'Año y división', 'Elegí la división', 'grilla', ['5° 1°', '5° 2°', '6° 1°', '6° 3°']);
  await hacerLista('Campo elemento', 'Elemento', 'Elegí qué se lleva', 'futbol', ['FUT-01 Pelota de fútbol', 'BAS-01 Pelota de básquet', 'VOL-01 Pelota de vóley', 'OTR-01 Conos']);

  // tarjetas de cada elemento
  const elementos = [
    { cod: 'FUT-01', nombre: 'Pelota de fútbol N°5', dep: 'Fútbol', ic: 'futbol', inicio: 'Disponible' },
    { cod: 'FUT-02', nombre: 'Pelota de fútbol N°5', dep: 'Fútbol', ic: 'futbol', inicio: 'Prestado 2', alumno: ['Lautaro Gómez', 'LG', '6° 1° - 10:15'] },
    { cod: 'BAS-01', nombre: 'Pelota de básquet N°7', dep: 'Básquet', ic: 'basquet', inicio: 'Disponible' },
    { cod: 'BAS-02', nombre: 'Pelota de básquet N°7', dep: 'Básquet', ic: 'basquet', inicio: 'Pinchada' },
    { cod: 'VOL-01', nombre: 'Pelota de vóley', dep: 'Vóley', ic: 'voley', inicio: 'Disponible' },
    { cod: 'VOL-02', nombre: 'Pelota de vóley', dep: 'Vóley', ic: 'voley', inicio: 'Prestado 2', alumno: ['Martina Ríos', 'MR', '4° 3° - 10:20'] },
    { cod: 'PPG-01', nombre: 'Paleta de ping pong', dep: 'Ping pong', ic: 'paleta', inicio: 'Rota' },
    { cod: 'OTR-01', nombre: 'Conos de entrenamiento', dep: 'Otros', ic: 'cono', inicio: 'Disponible' },
  ];

  function botonChico(txt, tipo, nombre) {
    let fondo = null, linea = null, letra = blanco;
    if (tipo == 'amarillo') { fondo = amarillo; letra = tinta; }
    else if (tipo == 'borde') linea = '#4A4A45';
    else { letra = estados[tipo][0]; fondo = estados[tipo][1]; linea = letra; }
    const b = caja('HORIZONTAL', { bg: fondo, borde: linea, grosor: 1.5, r: 10, p: [0, 12], gap: 6, alinear: 'CENTER', justificar: 'CENTER', nombre: nombre || txt });
    b.appendChild(texto(txt, { f: titulo, s: 'Bold', size: 14, c: letra, ls: 6, mayus: true }));
    return b;
  }

  function hacerTarjeta(e, v) {
    let est = v;
    if (v == 'Pedir' || v == 'Reportar') est = 'Disponible';
    if (v.startsWith('Prestado') || v.startsWith('Devolver')) est = 'Prestado';
    const fuera = est == 'Pinchada' || est == 'Rota' || est == 'Perdida';
    const editando = v == 'Pedir' || v == 'Reportar' || v.startsWith('Devolver');
    const [c1, c2] = estados[est];

    const t = componente('Estado=' + v, 'VERTICAL', { bg: gris1, r: 18, p: 16, gap: 14, borde: editando ? amarillo : borde, grosor: editando ? 1.5 : 1 });
    anchoFijo(t, 228);
    t.clipsContent = true;

    const arriba = caja('HORIZONTAL', { justificar: 'SPACE_BETWEEN', alinear: 'MIN' });
    meter(t, arriba, 'fill');
    let fondoIcono = c2;
    if (est == 'Disponible') fondoIcono = amarillo;
    if (fuera) fondoIcono = gris2;
    const circulo = caja('HORIZONTAL', { bg: fondoIcono, r: 999, alinear: 'CENTER', justificar: 'CENTER' });
    meter(arriba, circulo, 48, 48);
    let colorIcono = c1;
    if (est == 'Disponible') colorIcono = tinta;
    if (fuera) colorIcono = apagado;
    circulo.appendChild(icono(e.ic, colorIcono, 28));
    arriba.appendChild(etiqueta(est));

    const nombre = caja('VERTICAL', { gap: 2 });
    meter(t, nombre, 'fill');
    textoLargo(nombre, texto(e.nombre, { f: titulo, s: 'Bold', size: 20, lh: 22, mayus: true, c: fuera ? apagado : blanco }));
    nombre.appendChild(texto(e.cod + ' - ' + e.dep, { s: 'Medium', size: 12, c: apagado }));

    const abajo = caja('VERTICAL', { gap: 10 });
    meter(t, abajo, 'fill');
    const subtitulo = s => abajo.appendChild(texto(s, { f: titulo, s: 'Bold', size: 12, c: amarillo, ls: 10, mayus: true }));
    const poner = (padre, b, alto = 40) => meter(padre, b, 'fill', alto);
    const fila = () => meter(abajo, caja('HORIZONTAL', { gap: 8 }), 'fill');
    const b = {};

    if (v == 'Disponible') {
      const f = fila();
      b.pedir = poner(f, botonChico('Pedir', 'amarillo'));
      b.pedir.appendChild(icono('flecha', tinta, 16));
      b.bandera = caja('HORIZONTAL', { bg: gris2, r: 10, alinear: 'CENTER', justificar: 'CENTER', nombre: 'Reportar' });
      meter(f, b.bandera, 40, 40);
      b.bandera.appendChild(icono('bandera', apagado, 18));
    }
    if (v == 'Pedir') {
      subtitulo('Nuevo préstamo');
      meter(abajo, setAlumno.children[0].createInstance(), 'fill');
      meter(abajo, setDivision.children[0].createInstance(), 'fill');
      const f = fila();
      b.cancelar = poner(f, botonChico('Cancelar', 'borde'));
      b.confirmar = poner(f, botonChico('Confirmar', 'amarillo'));
    }
    if (v == 'Prestado' || v == 'Prestado 2') {
      const a = v == 'Prestado 2' ? e.alumno : ['Juan Pérez', 'JP', '5° 2° - 10:32'];
      const quien = caja('HORIZONTAL', { gap: 10, alinear: 'CENTER' });
      meter(abajo, quien, 'fill');
      const av = caja('HORIZONTAL', { bg: estados.Prestado[1], r: 999, alinear: 'CENTER', justificar: 'CENTER' });
      meter(quien, av, 34, 34);
      av.appendChild(texto(a[1], { f: titulo, s: 'Bold', size: 14, c: estados.Prestado[0] }));
      const col = caja('VERTICAL');
      quien.appendChild(col);
      col.layoutGrow = 1;
      col.appendChild(texto(a[0], { s: 'SemiBold', size: 14 }));
      col.appendChild(texto(a[2], { size: 12, c: apagado }));
      b.devolver = poner(abajo, botonChico('Devolver', 'borde'));
    }
    if (v.startsWith('Devolver')) {
      subtitulo('¿Cómo vuelve?');
      const f = fila();
      b.bien = poner(f, botonChico('Bien', 'Disponible'));
      b.bien.insertChild(0, icono('tilde', estados.Disponible[0], 16));
      b.pinchada = poner(f, botonChico('Pinchada', 'Pinchada'));
      b.cancelar = poner(abajo, botonChico('Cancelar', 'borde'), 36);
    }
    if (v == 'Reportar') {
      subtitulo('¿Qué le pasó?');
      b.rPinchada = poner(abajo, botonChico('Pinchada', 'Pinchada'), 36);
      b.rRota = poner(abajo, botonChico('Rota', 'Rota'), 36);
      b.rPerdida = poner(abajo, botonChico('Perdida', 'Perdida'), 36);
      b.cancelar = poner(abajo, botonChico('Cancelar', 'borde'), 36);
    }
    if (fuera) {
      const notas = { Pinchada: 'Pierde aire', Rota: 'Está rota', Perdida: 'No la devolvieron' };
      textoLargo(abajo, texto(notas[v], { s: 'Medium', size: 13, c: c1 }));
      b.arreglar = poner(abajo, botonChico(v == 'Perdida' ? 'Apareció' : 'Ya está arreglada', 'borde'));
    }
    return { t, b };
  }

  const primeras = {};
  let yTarjetas = 1900;
  for (const e of elementos) {
    const lista = ['Disponible', 'Pedir', 'Prestado', 'Devolver', 'Reportar', 'Pinchada', 'Rota', 'Perdida'];
    if (e.alumno) lista.push('Prestado 2', 'Devolver 2');
    const hechas = lista.map(v => Object.assign({ v }, hacerTarjeta(e, v)));
    const set = juntar(hechas.map(h => h.t), 'Tarjeta ' + e.cod, 1400, yTarjetas);
    yTarjetas += set.height + 40;
    const id = v => hechas.find(h => h.v == v).t.id;

    for (const h of hechas) {
      const b = h.b;
      if (b.pedir) await b.pedir.setReactionsAsync([cambiar(id('Pedir'))]);
      if (b.bandera) await b.bandera.setReactionsAsync([cambiar(id('Reportar'))]);
      if (b.confirmar) await b.confirmar.setReactionsAsync([cambiar(id('Prestado'))]);
      if (b.devolver) await b.devolver.setReactionsAsync([cambiar(id(h.v == 'Prestado 2' ? 'Devolver 2' : 'Devolver'))]);
      if (b.bien) await b.bien.setReactionsAsync([cambiar(id('Disponible'))]);
      if (b.pinchada) await b.pinchada.setReactionsAsync([cambiar(id('Pinchada'))]);
      if (b.rPinchada) await b.rPinchada.setReactionsAsync([cambiar(id('Pinchada'))]);
      if (b.rRota) await b.rRota.setReactionsAsync([cambiar(id('Rota'))]);
      if (b.rPerdida) await b.rPerdida.setReactionsAsync([cambiar(id('Perdida'))]);
      if (b.arreglar) await b.arreglar.setReactionsAsync([cambiar(id('Disponible'))]);
      if (b.cancelar) {
        let volver = 'Prestado';
        if (h.v == 'Pedir' || h.v == 'Reportar') volver = 'Disponible';
        if (h.v == 'Devolver 2') volver = 'Prestado 2';
        await b.cancelar.setReactionsAsync([cambiar(id(volver))]);
      }
    }
    primeras[e.cod] = hechas.find(h => h.v == e.inicio).t;
  }

  // inventario con filtros
  const filtros = ['Todos', 'Fútbol', 'Básquet', 'Vóley', 'Ping pong', 'Otros'];
  const vistas = [];
  const chips = [];
  for (const f of filtros) {
    const c = componente('Filtro=' + f, 'VERTICAL', { gap: 18 });
    anchoFijo(c, 960);
    const barra = caja('HORIZONTAL', { gap: 8 });
    c.appendChild(barra);
    for (const g of filtros) {
      const activo = g == f;
      const chip = caja('HORIZONTAL', { bg: activo ? amarillo : gris1, borde: activo ? null : borde, r: 999, p: [8, 16], nombre: g });
      barra.appendChild(chip);
      chip.appendChild(texto(g, { s: 'SemiBold', size: 14, c: activo ? tinta : blanco }));
      if (!activo) chips.push([chip, g]);
    }
    const grilla = caja('HORIZONTAL', { gap: 16, nombre: 'grilla' });
    c.appendChild(grilla);
    grilla.layoutWrap = 'WRAP';
    grilla.counterAxisSpacing = 16;
    grilla.layoutSizingHorizontal = 'FILL';
    for (const e of elementos) {
      if (f == 'Todos' || e.dep == f) grilla.appendChild(primeras[e.cod].createInstance());
    }
    vistas.push(c);
  }
  const inventario = juntar(vistas, 'Inventario', 1400, yTarjetas, 'VERTICAL');
  for (const [chip, g] of chips) {
    const destino = inventario.children.find(c => c.name == 'Filtro=' + g);
    await chip.setReactionsAsync([clic(destino.id, 'CHANGE_TO', fundido)]);
  }
}


// ---------------- PANTALLAS ----------------

async function pantallas() {
  await fuentes();
  const instancia = (set, v) => buscar(set).children.find(c => c.name == v).createInstance();
  const etiqueta = k => instancia('Estado', 'Estado=' + k);
  function boton(tipo, txt, w) {
    const b = instancia('Boton', 'Tipo=' + tipo + ', Estado=Normal');
    b.findOne(n => n.name == 'texto').characters = txt;
    if (w) b.resize(w, 48);
    return b;
  }

  function menuLateral(activo) {
    const lado = caja('VERTICAL', { bg: lateral, p: 24, gap: 26, nombre: 'menu lateral' });
    const marca = caja('HORIZONTAL', { gap: 12, alinear: 'CENTER', nombre: 'logo' });
    lado.appendChild(marca);
    const logo = caja('HORIZONTAL', { bg: amarillo, r: 12, alinear: 'CENTER', justificar: 'CENTER' });
    meter(marca, logo, 46, 46);
    logo.appendChild(texto('ITR', { f: titulo, s: 'Black Italic', size: 21, c: tinta, ls: -2 }));
    const col = caja('VERTICAL');
    marca.appendChild(col);
    col.appendChild(texto('PAÑOL', { f: titulo, s: 'ExtraBold Italic', size: 24, lh: 24 }));
    col.appendChild(texto('Preceptoría', { size: 12, c: apagado }));

    const menu = caja('VERTICAL', { gap: 6 });
    meter(lado, menu, 'fill');
    const items = {};
    for (const [nombre, ic, num] of [['Inventario', 'grilla', ''], ['Préstamos', 'flechas', '2'], ['Historial', 'reloj', '']]) {
      const si = nombre == activo;
      const it = caja('HORIZONTAL', { bg: si ? amarillo : null, r: 12, p: [0, 14], gap: 12, alinear: 'CENTER', nombre: nombre });
      meter(menu, it, 'fill', 44);
      it.appendChild(icono(ic, si ? tinta : apagado, 20));
      const t = texto(nombre, { s: 'SemiBold', size: 15, c: si ? tinta : blanco });
      it.appendChild(t);
      t.layoutGrow = 1;
      if (num) {
        const n = caja('HORIZONTAL', { bg: si ? tinta : gris2, r: 999, p: [2, 8] });
        it.appendChild(n);
        n.appendChild(texto(num, { f: titulo, s: 'Bold', size: 13, c: si ? amarillo : blanco }));
      }
      items[nombre] = it;
    }

    const hueco = figma.createFrame();
    hueco.fills = [];
    lado.appendChild(hueco);
    hueco.layoutGrow = 1;
    hueco.layoutSizingHorizontal = 'FILL';

    const recreo = caja('VERTICAL', { bg: gris2, r: 16, p: 16, gap: 8, nombre: 'recreo' });
    meter(lado, recreo, 'fill');
    recreo.appendChild(texto('Recreo', { f: titulo, s: 'Bold', size: 12, c: amarillo, ls: 10, mayus: true }));
    recreo.appendChild(texto('10:20 a 10:40', { f: titulo, s: 'Black', size: 28, lh: 30 }));
    const barra = figma.createFrame();
    barra.fills = color(borde);
    barra.cornerRadius = 999;
    barra.resize(160, 6);
    const lleno = figma.createRectangle();
    lleno.resize(104, 6);
    lleno.cornerRadius = 999;
    lleno.fills = color(amarillo);
    barra.appendChild(lleno);
    meter(recreo, barra, 'fill');
    recreo.appendChild(texto('Quedan 7 min', { size: 12, c: apagado }));
    return { lado, marca, items };
  }

  function nuevaPantalla(nombre, x) {
    const p = autoLayout('HORIZONTAL');
    p.name = 'Pantalla ' + nombre;
    p.fills = color(negro);
    p.resize(1280, 860);
    p.primaryAxisSizingMode = 'FIXED';
    p.counterAxisSizingMode = 'AUTO';
    p.minHeight = 860;
    p.x = x;
    p.y = 0;
    const m = menuLateral(nombre);
    p.appendChild(m.lado);
    m.lado.resize(240, 860);
    m.lado.layoutSizingHorizontal = 'FIXED';
    m.lado.layoutSizingVertical = 'FILL';
    const cont = caja('VERTICAL', { p: [36, 40, 40, 40], gap: 24, nombre: 'contenido' });
    p.appendChild(cont);
    cont.layoutGrow = 1;
    return { p, cont, menu: m };
  }

  function cabecera(cont, tit, sub, conBoton) {
    const c = caja('HORIZONTAL', { justificar: 'SPACE_BETWEEN', alinear: 'CENTER' });
    meter(cont, c, 'fill');
    const col = caja('VERTICAL', { gap: 4 });
    c.appendChild(col);
    col.appendChild(texto(tit, { f: titulo, s: 'ExtraBold Italic', size: 48, lh: 48 }));
    col.appendChild(texto(sub, { size: 14, c: apagado }));
    if (!conBoton) return null;
    const b = boton('Primario', 'Registrar préstamo', 250);
    c.appendChild(b);
    return b;
  }

  // inventario
  const inv = nuevaPantalla('Inventario', 0);
  const btnInv = cabecera(inv.cont, 'INVENTARIO', 'Viernes 2 de octubre', true);
  const datos = caja('HORIZONTAL', { gap: 16 });
  meter(inv.cont, datos, 'fill');
  const cuadros = {};
  for (const [n, txt, c] of [['4', 'Disponibles', estados.Disponible[0]], ['2', 'Prestados', estados.Prestado[0]], ['2', 'Para arreglar', estados.Pinchada[0]], ['8', 'En total', amarillo]]) {
    const d = caja('HORIZONTAL', { bg: gris1, r: 16, p: [14, 18], gap: 14, alinear: 'CENTER', borde: borde, nombre: txt });
    meter(datos, d, 'fill');
    d.appendChild(texto(n, { f: titulo, s: 'Black', size: 44, lh: 44, c: c }));
    d.appendChild(texto(txt, { f: titulo, s: 'Bold', size: 15, ls: 6, mayus: true }));
    cuadros[txt] = d;
  }
  meter(inv.cont, instancia('Inventario', 'Filtro=Todos'), 'fill');

  // prestamos
  const pre = nuevaPantalla('Préstamos', 1380);
  const btnPre = cabecera(pre.cont, 'PRÉSTAMOS', 'Lo que está afuera ahora', true);

  const yFilas = buscar('Inventario').y + buscar('Inventario').height + 60;
  async function filaPrestamo(cod, nombre, ic, alumno, ini, div, hora, hace, y) {
    function hacer(devuelto) {
      const f = componente('Estado=' + (devuelto ? 'Devuelto' : 'Prestado'), 'HORIZONTAL', { bg: gris1, r: 16, p: [14, 18], gap: 16, alinear: 'CENTER', borde: devuelto ? estados.Disponible[0] : borde, grosor: devuelto ? 1.5 : 1 });
      anchoFijo(f, 960);
      const av = caja('HORIZONTAL', { bg: estados.Prestado[1], r: 999, alinear: 'CENTER', justificar: 'CENTER' });
      meter(f, av, 42, 42);
      av.appendChild(texto(ini, { f: titulo, s: 'Bold', size: 16, c: estados.Prestado[0] }));
      const quien = caja('VERTICAL');
      meter(f, quien, 190);
      quien.appendChild(texto(alumno, { s: 'SemiBold', size: 16, c: devuelto ? apagado : blanco }));
      quien.appendChild(texto(div, { size: 13, c: apagado }));
      const el = caja('HORIZONTAL', { gap: 12, alinear: 'CENTER' });
      f.appendChild(el);
      el.layoutGrow = 1;
      const circ = caja('HORIZONTAL', { bg: devuelto ? amarillo : estados.Prestado[1], r: 999, alinear: 'CENTER', justificar: 'CENTER' });
      meter(el, circ, 42, 42);
      circ.appendChild(icono(ic, devuelto ? tinta : estados.Prestado[0], 24));
      const col = caja('VERTICAL');
      el.appendChild(col);
      col.appendChild(texto(nombre, { f: titulo, s: 'Bold', size: 19, mayus: true, c: devuelto ? apagado : blanco }));
      col.appendChild(texto(cod, { size: 12, c: apagado }));
      const h = caja('VERTICAL', { alinear: 'MAX' });
      f.appendChild(h);
      if (devuelto) {
        h.appendChild(texto('Devuelta 10:41', { s: 'Medium', size: 14, c: estados.Disponible[0] }));
      } else {
        h.appendChild(texto('Desde las ' + hora, { s: 'Medium', size: 14 }));
        h.appendChild(texto(hace, { size: 12, c: estados.Pinchada[0] }));
      }
      f.appendChild(etiqueta(devuelto ? 'Disponible' : 'Prestado'));
      let b;
      if (devuelto) {
        b = caja('HORIZONTAL', { r: 10, alinear: 'CENTER', justificar: 'CENTER', nombre: 'Deshacer' });
        b.appendChild(texto('Deshacer', { s: 'SemiBold', size: 14, c: apagado }));
      } else {
        b = caja('HORIZONTAL', { r: 10, alinear: 'CENTER', justificar: 'CENTER', borde: '#4A4A45', grosor: 1.5, nombre: 'Devolver' });
        b.appendChild(texto('Devolver', { f: titulo, s: 'Bold', size: 14, ls: 6, mayus: true }));
      }
      meter(f, b, 120, 40);
      return { f, b };
    }
    const p = hacer(false), d = hacer(true);
    const set = juntar([p.f, d.f], 'Fila ' + cod, 1400, y, 'VERTICAL');
    await p.b.setReactionsAsync([cambiar(d.f.id)]);
    await d.b.setReactionsAsync([cambiar(p.f.id)]);
    return set;
  }
  const fila1 = await filaPrestamo('FUT-02', 'Pelota de fútbol N°5', 'futbol', 'Lautaro Gómez', 'LG', '6° 1°', '10:15', 'Hace 25 min', yFilas);
  const fila2 = await filaPrestamo('VOL-02', 'Pelota de vóley', 'voley', 'Martina Ríos', 'MR', '4° 3°', '10:20', 'Hace 20 min', yFilas + fila1.height + 40);
  const lista = caja('VERTICAL', { gap: 12 });
  meter(pre.cont, lista, 'fill');
  meter(lista, fila1.children[0].createInstance(), 'fill');
  meter(lista, fila2.children[0].createInstance(), 'fill');

  const aviso = caja('HORIZONTAL', { bg: gris1, r: 16, p: [16, 18], gap: 12, alinear: 'CENTER', borde: borde });
  meter(pre.cont, aviso, 'fill');
  aviso.appendChild(icono('reloj', amarillo, 20));
  const at = texto('Acordate de devolver todo antes del timbre.', { size: 14, c: apagado });
  aviso.appendChild(at);
  at.layoutGrow = 1;
  const linkHistorial = caja('HORIZONTAL', { gap: 6, alinear: 'CENTER', nombre: 'ver historial' });
  aviso.appendChild(linkHistorial);
  linkHistorial.appendChild(texto('Ver historial', { s: 'SemiBold', size: 14, c: amarillo }));
  linkHistorial.appendChild(icono('flecha', amarillo, 16));

  // historial
  const his = nuevaPantalla('Historial', 2760);
  cabecera(his.cont, 'HISTORIAL', 'Préstamos, devoluciones y reportes', false);
  const movimientos = [
    ['10:20', 'Martina Ríos', '4° 3°', 'VOL-02 Pelota de vóley', 'Préstamo', 'Prestado'],
    ['10:15', 'Lautaro Gómez', '6° 1°', 'FUT-02 Pelota de fútbol', 'Préstamo', 'Prestado'],
    ['10:05', 'Tomás Ferreyra', '5° 2°', 'BAS-01 Pelota de básquet', 'Devolución', 'Disponible'],
    ['09:50', 'Valentina Sosa', '3° 1°', 'BAS-02 Pelota de básquet', 'Reporte', 'Pinchada'],
    ['09:35', 'Agustín Luna', '6° 3°', 'PPG-01 Paleta de ping pong', 'Reporte', 'Rota'],
    ['Jue 11:05', 'Camila Torres', '5° 1°', 'OTR-01 Conos', 'Devolución', 'Disponible'],
    ['Mié 10:30', 'Bruno Medina', '2° 2°', 'VOL-01 Pelota de vóley', 'Devolución', 'Disponible'],
    ['Lun 10:25', 'Sofía Herrera', '1° 1°', 'FUT-01 Pelota de fútbol', 'Devolución', 'Disponible'],
    ['24/09 10:20', 'Joaquín Paz', '4° 2°', 'BAS-01 Pelota de básquet', 'Préstamo', 'Prestado'],
    ['18/09 11:00', 'Lucía Romero', '6° 1°', 'VOL-02 Pelota de vóley', 'Reporte', 'Perdida'],
  ];
  const periodos = [['Hoy', 5], ['Esta semana', 8], ['Este mes', 10]];
  const anchos = [110, 180, 90, 230, 130];
  const tablas = [];
  const botonesPeriodo = [];
  for (const [per, cant] of periodos) {
    const c = componente('Periodo=' + per, 'VERTICAL', { gap: 18 });
    anchoFijo(c, 960);
    const barra = caja('HORIZONTAL', { gap: 8 });
    c.appendChild(barra);
    for (const [q] of periodos) {
      const activo = q == per;
      const chip = caja('HORIZONTAL', { bg: activo ? amarillo : gris1, borde: activo ? null : borde, r: 999, p: [8, 16], nombre: q });
      barra.appendChild(chip);
      chip.appendChild(texto(q, { s: 'SemiBold', size: 14, c: activo ? tinta : blanco }));
      if (!activo) botonesPeriodo.push([chip, q]);
    }
    const tabla = caja('VERTICAL', { bg: gris1, r: 16, p: [6, 20], borde: borde });
    meter(c, tabla, 'fill');
    const filaTabla = (celdas, est, esTitulo) => {
      const r = caja('HORIZONTAL', { p: [13, 0], gap: 12, alinear: 'CENTER' });
      meter(tabla, r, 'fill');
      r.strokes = color(borde);
      r.strokeWeight = 0;
      r.strokeTopWeight = esTitulo ? 0 : 1;
      r.strokeAlign = 'INSIDE';
      celdas.forEach((v, i) => {
        let t;
        if (esTitulo) t = texto(v, { f: titulo, s: 'Bold', size: 12, c: apagado, ls: 10, mayus: true });
        else t = texto(v, { s: i == 1 ? 'SemiBold' : 'Regular', size: 14, c: i == 0 ? apagado : blanco });
        r.appendChild(t);
        t.resize(anchos[i], t.height);
        t.textAutoResize = 'HEIGHT';
      });
      if (esTitulo) r.appendChild(texto('Estado', { f: titulo, s: 'Bold', size: 12, c: apagado, ls: 10, mayus: true }));
      else r.appendChild(etiqueta(est));
    };
    filaTabla(['Hora', 'Alumno', 'División', 'Elemento', 'Movimiento'], null, true);
    for (const m of movimientos.slice(0, cant)) filaTabla(m.slice(0, 5), m[5], false);
    tablas.push(c);
  }
  const setHistorial = juntar(tablas, 'Tabla historial', 2500, yFilas, 'VERTICAL');
  for (const [chip, q] of botonesPeriodo) {
    const destino = setHistorial.children.find(c => c.name == 'Periodo=' + q);
    await chip.setReactionsAsync([clic(destino.id, 'CHANGE_TO', fundido)]);
  }
  meter(his.cont, setHistorial.children[0].createInstance(), 'fill');

  // ventanas que se abren arriba
  function ventana(nombre, x, ancho) {
    const v = figma.createFrame();
    v.name = nombre;
    v.resize(1280, 860);
    v.fills = [];
    v.x = x;
    v.y = 0;
    v.clipsContent = true;
    const fondo = figma.createRectangle();
    fondo.name = 'fondo';
    fondo.resize(1280, 860);
    fondo.fills = color('#000000', 0.7);
    v.appendChild(fondo);
    const caj = caja('VERTICAL', { bg: gris1, r: 24, p: 28, gap: 18, borde: borde, nombre: 'caja' });
    v.appendChild(caj);
    anchoFijo(caj, ancho);
    caj.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.5 }, offset: { x: 0, y: 30 }, radius: 80, spread: 0, visible: true, blendMode: 'NORMAL' }];
    return { v, fondo, caj };
  }

  const reg = ventana('Registrar préstamo', 4140, 460);
  const arriba = caja('HORIZONTAL', { justificar: 'SPACE_BETWEEN', alinear: 'MIN', gap: 12 });
  meter(reg.caj, arriba, 'fill');
  const col = caja('VERTICAL', { gap: 4 });
  arriba.appendChild(col);
  col.layoutGrow = 1;
  col.appendChild(texto('REGISTRAR PRÉSTAMO', { f: titulo, s: 'ExtraBold Italic', size: 32, lh: 32 }));
  col.appendChild(texto('Completá los datos del alumno', { size: 13, c: apagado }));
  const x = caja('HORIZONTAL', { bg: gris2, r: 10, alinear: 'CENTER', justificar: 'CENTER', nombre: 'cerrar' });
  meter(arriba, x, 36, 36);
  x.appendChild(icono('cruz', blanco, 18));
  meter(reg.caj, instancia('Campo elemento', 'Estado=Vacio'), 'fill');
  meter(reg.caj, instancia('Campo alumno', 'Estado=Vacio'), 'fill');
  meter(reg.caj, instancia('Campo division', 'Estado=Vacio'), 'fill');
  const hora = caja('HORIZONTAL', { gap: 8, alinear: 'CENTER' });
  meter(reg.caj, hora, 'fill');
  hora.appendChild(icono('reloj', amarillo, 18));
  hora.appendChild(texto('Devolver antes de las 10:40', { size: 13, c: apagado }));
  const botones = caja('HORIZONTAL', { gap: 12 });
  meter(reg.caj, botones, 'fill');
  const bCancelar = meter(botones, boton('Secundario', 'Cancelar'), 'fill');
  const bConfirmar = meter(botones, boton('Primario', 'Confirmar'), 'fill');
  reg.caj.x = (1280 - reg.caj.width) / 2;
  reg.caj.y = 90;

  const listo = ventana('Préstamo registrado', 5520, 400);
  listo.caj.counterAxisAlignItems = 'CENTER';
  listo.caj.paddingTop = 36;
  const ok = caja('HORIZONTAL', { bg: amarillo, r: 999, alinear: 'CENTER', justificar: 'CENTER' });
  meter(listo.caj, ok, 76, 76);
  ok.appendChild(icono('tilde', tinta, 40));
  listo.caj.appendChild(texto('PRÉSTAMO REGISTRADO', { f: titulo, s: 'ExtraBold Italic', size: 30, centro: true }));
  textoLargo(listo.caj, texto('Retirá el elemento en preceptoría.', { size: 14, c: apagado, centro: true }));
  const bListo = meter(listo.caj, boton('Primario', 'Listo'), 'fill');
  listo.caj.x = (1280 - listo.caj.width) / 2;
  listo.caj.y = (860 - listo.caj.height) / 2;

  // conexiones
  const todas = { 'Inventario': inv, 'Préstamos': pre, 'Historial': his };
  for (const nombre in todas) {
    const pant = todas[nombre];
    for (const destino in pant.menu.items) {
      if (destino != nombre) await pant.menu.items[destino].setReactionsAsync([ir(todas[destino].p.id)]);
    }
    if (pant != inv) await pant.menu.marca.setReactionsAsync([ir(inv.p.id)]);
  }
  await agregarClic(btnInv, abrir(reg.v.id));
  await agregarClic(btnPre, abrir(reg.v.id));
  await cuadros['Prestados'].setReactionsAsync([ir(pre.p.id)]);
  await cuadros['Para arreglar'].setReactionsAsync([ir(his.p.id)]);
  await linkHistorial.setReactionsAsync([ir(his.p.id)]);
  await reg.fondo.setReactionsAsync([cerrar]);
  await x.setReactionsAsync([cerrar]);
  await agregarClic(bCancelar, cerrar);
  await agregarClic(bConfirmar, reemplazar(listo.v.id));
  await listo.fondo.setReactionsAsync([cerrar]);
  await agregarClic(bListo, cerrar);

  figma.currentPage.flowStartingPoints = [{ nodeId: inv.p.id, name: 'Pañol ITR' }];
}


async function main() {
  await archivar();
  await componentes();
  await pantallas();
}

main()
  .then(() => figma.closePlugin('Listo'))
  .catch(e => figma.closePlugin('Error: ' + e.message));
