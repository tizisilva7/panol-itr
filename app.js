// Pañol ITR - pagina web
// Los datos se guardan en el navegador (localStorage)

const iconos = {
  futbol: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="3"/><path d="M24 17L30.66 21.84L28.11 29.66H19.89L17.34 21.84Z" fill="currentColor"/><path d="M24 17V6M30.66 21.84L41 18.5M28.11 29.66L34.5 38.5M19.89 29.66L13.5 38.5M17.34 21.84L7 18.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  basquet: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="3"/><path d="M24 5V43M5 24H43M11.5 10C18 16 18 32 11.5 38M36.5 10C30 16 30 32 36.5 38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  voley: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="3"/><path d="M24 24C24 15 28 9 33.5 6.5M24 24C32 28.5 38.5 28 42.5 25M24 24C16 28.5 12.5 35 12.5 40.5M9 12C15 14 20.5 18 24 24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  paleta: '<svg viewBox="0 0 48 48" fill="none"><circle cx="20" cy="21" r="13" stroke="currentColor" stroke-width="3"/><path d="M29.5 30.5L40 41" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="39" cy="10" r="4.5" fill="currentColor"/></svg>',
  cono: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 5L35 40H13L24 5Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M18.5 22.5H29.5M16 31H32M7 41H41" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  grilla: '<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="11.5" y="3" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="11.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>',
  flechas: '<svg viewBox="0 0 20 20" fill="none"><path d="M4 7H15M12 4L15 7L12 10M16 13H5M8 10L5 13L8 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  reloj: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M10 6V10L12.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  tilde: '<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 10.5L8.5 14.5L15.5 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flecha: '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bandera: '<svg viewBox="0 0 20 20" fill="none"><path d="M5 17.5V3.5M5 4H14L12 7.5L14 11H5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cruz: '<svg viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

const divisiones = ['1° 1°', '1° 2°', '2° 1°', '2° 2°', '3° 1°', '3° 2°', '4° 1°', '4° 2°', '4° 3°', '5° 1°', '5° 2°', '6° 1°', '6° 2°', '6° 3°', '7° 1°', '7° 2°'];
const deportes = ['Todos', 'Fútbol', 'Básquet', 'Vóley', 'Ping pong', 'Otros'];
const notas = { Pinchada: 'Pierde aire', Rota: 'Está rota', Perdida: 'No la devolvieron' };

const minuto = 60 * 1000;
const dia = 24 * 60 * minuto;

function datosIniciales() {
  const ahora = Date.now();
  return {
    elementos: [
      { cod: 'FUT-01', nombre: 'Pelota de fútbol N°5', dep: 'Fútbol', ic: 'futbol', estado: 'Disponible' },
      { cod: 'FUT-02', nombre: 'Pelota de fútbol N°5', dep: 'Fútbol', ic: 'futbol', estado: 'Prestado', alumno: 'Lautaro Gómez', division: '6° 1°', desde: ahora - 25 * minuto },
      { cod: 'BAS-01', nombre: 'Pelota de básquet N°7', dep: 'Básquet', ic: 'basquet', estado: 'Disponible' },
      { cod: 'BAS-02', nombre: 'Pelota de básquet N°7', dep: 'Básquet', ic: 'basquet', estado: 'Pinchada' },
      { cod: 'VOL-01', nombre: 'Pelota de vóley', dep: 'Vóley', ic: 'voley', estado: 'Disponible' },
      { cod: 'VOL-02', nombre: 'Pelota de vóley', dep: 'Vóley', ic: 'voley', estado: 'Prestado', alumno: 'Martina Ríos', division: '4° 3°', desde: ahora - 20 * minuto },
      { cod: 'PPG-01', nombre: 'Paleta de ping pong', dep: 'Ping pong', ic: 'paleta', estado: 'Rota' },
      { cod: 'OTR-01', nombre: 'Conos de entrenamiento', dep: 'Otros', ic: 'cono', estado: 'Disponible' },
    ],
    movimientos: [
      { fecha: ahora - 20 * minuto, alumno: 'Martina Ríos', division: '4° 3°', cod: 'VOL-02', nombre: 'Pelota de vóley', tipo: 'Préstamo', estado: 'Prestado' },
      { fecha: ahora - 25 * minuto, alumno: 'Lautaro Gómez', division: '6° 1°', cod: 'FUT-02', nombre: 'Pelota de fútbol', tipo: 'Préstamo', estado: 'Prestado' },
      { fecha: ahora - 40 * minuto, alumno: 'Tomás Ferreyra', division: '5° 2°', cod: 'BAS-01', nombre: 'Pelota de básquet', tipo: 'Devolución', estado: 'Disponible' },
      { fecha: ahora - 55 * minuto, alumno: 'Valentina Sosa', division: '3° 1°', cod: 'BAS-02', nombre: 'Pelota de básquet', tipo: 'Reporte', estado: 'Pinchada' },
      { fecha: ahora - 70 * minuto, alumno: 'Agustín Luna', division: '6° 3°', cod: 'PPG-01', nombre: 'Paleta de ping pong', tipo: 'Reporte', estado: 'Rota' },
      { fecha: ahora - 1 * dia, alumno: 'Camila Torres', division: '5° 1°', cod: 'OTR-01', nombre: 'Conos', tipo: 'Devolución', estado: 'Disponible' },
      { fecha: ahora - 2 * dia, alumno: 'Bruno Medina', division: '2° 2°', cod: 'VOL-01', nombre: 'Pelota de vóley', tipo: 'Devolución', estado: 'Disponible' },
      { fecha: ahora - 4 * dia, alumno: 'Sofía Herrera', division: '1° 1°', cod: 'FUT-01', nombre: 'Pelota de fútbol', tipo: 'Devolución', estado: 'Disponible' },
      { fecha: ahora - 12 * dia, alumno: 'Joaquín Paz', division: '4° 2°', cod: 'BAS-01', nombre: 'Pelota de básquet', tipo: 'Préstamo', estado: 'Prestado' },
      { fecha: ahora - 20 * dia, alumno: 'Lucía Romero', division: '6° 1°', cod: 'VOL-02', nombre: 'Pelota de vóley', tipo: 'Reporte', estado: 'Perdida' },
    ],
  };
}

let datos;
try {
  datos = JSON.parse(localStorage.getItem('panol-itr'));
} catch (e) {
  datos = null;
}
if (!datos) datos = datosIniciales();

function guardar() {
  try {
    localStorage.setItem('panol-itr', JSON.stringify(datos));
  } catch (e) {}
}

// lo que se esta editando en cada tarjeta (pedir, devolver o reportar)
const editando = {};
let filtro = 'Todos';
let filtroEstado = '';
let periodo = 'hoy';

const $ = id => document.getElementById(id);

function limpiar(t) {
  return String(t || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function hora(ms) {
  const d = new Date(ms);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function cuando(ms) {
  const d = new Date(ms);
  const hoy = new Date();
  if (d.toDateString() == hoy.toDateString()) return hora(ms);
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  if (Date.now() - ms < 7 * dia) return dias[d.getDay()] + ' ' + hora(ms);
  return d.getDate() + '/' + (d.getMonth() + 1) + ' ' + hora(ms);
}

function hace(ms) {
  const m = Math.floor((Date.now() - ms) / minuto);
  if (m < 1) return 'Recién';
  if (m < 60) return 'Hace ' + m + ' min';
  return 'Hace ' + Math.floor(m / 60) + ' h ' + (m % 60) + ' min';
}

function iniciales(nombre) {
  return nombre.trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

function icono(nombre) {
  return '<span class="ic">' + iconos[nombre] + '</span>';
}

function etiqueta(estado) {
  return '<span class="estado e-' + estado + '">' + estado + '</span>';
}

function opcionesDivision(elegida) {
  let h = '<option value="">Elegí la división</option>';
  for (const d of divisiones) h += '<option' + (d == elegida ? ' selected' : '') + '>' + d + '</option>';
  return h;
}

function registrar(el, tipo, alumno, division) {
  datos.movimientos.unshift({
    fecha: Date.now(),
    alumno: alumno || '',
    division: division || '',
    cod: el.cod,
    nombre: el.nombre.replace(' N°5', '').replace(' N°7', ''),
    tipo: tipo,
    estado: el.estado,
  });
}

// ---------- acciones ----------

function prestar(cod, alumno, division) {
  const el = datos.elementos.find(e => e.cod == cod);
  if (!el || el.estado != 'Disponible') return false;
  el.estado = 'Prestado';
  el.alumno = alumno;
  el.division = division;
  el.desde = Date.now();
  registrar(el, 'Préstamo', alumno, division);
  guardar();
  return true;
}

function devolver(cod, comoVuelve) {
  const el = datos.elementos.find(e => e.cod == cod);
  if (!el) return;
  const alumno = el.alumno, division = el.division;
  el.estado = comoVuelve;
  el.alumno = '';
  el.division = '';
  el.desde = null;
  registrar(el, 'Devolución', alumno, division);
  guardar();
}

function reportar(cod, estado) {
  const el = datos.elementos.find(e => e.cod == cod);
  if (!el) return;
  el.estado = estado;
  registrar(el, 'Reporte', '', '');
  guardar();
}

function arreglar(cod) {
  const el = datos.elementos.find(e => e.cod == cod);
  if (!el) return;
  el.estado = 'Disponible';
  registrar(el, 'Arreglo', '', '');
  guardar();
}

// ---------- dibujar ----------

function dibujarTodo() {
  dibujarDatos();
  dibujarFiltros();
  dibujarTarjetas();
  dibujarPrestamos();
  dibujarHistorial();
}

function dibujarDatos() {
  const els = datos.elementos;
  $('cDisp').textContent = els.filter(e => e.estado == 'Disponible').length;
  $('cPres').textContent = els.filter(e => e.estado == 'Prestado').length;
  $('cFuera').textContent = els.filter(e => ['Pinchada', 'Rota', 'Perdida'].includes(e.estado)).length;
  $('cTotal').textContent = els.length;
  $('numPrestamos').textContent = els.filter(e => e.estado == 'Prestado').length;
}

function dibujarFiltros() {
  let h = '';
  for (const d of deportes) h += '<button class="chip' + (d == filtro ? ' activo' : '') + '" data-deporte="' + d + '">' + d + '</button>';
  if (filtroEstado) h += '<button class="chip activo" data-quitar-estado>' + (filtroEstado == 'fuera' ? 'Para arreglar' : filtroEstado + 's') + ' ✕</button>';
  $('filtros').innerHTML = h;
}

function tarjeta(el) {
  const ed = editando[el.cod];
  const fuera = ['Pinchada', 'Rota', 'Perdida'].includes(el.estado);
  let circulo = '';
  if (el.estado == 'Disponible') circulo = 'disp';
  if (el.estado == 'Prestado') circulo = 'pres';

  let abajo = '';
  if (ed == 'pedir') {
    abajo = `
      <p class="etiqueta">Nuevo préstamo</p>
      <label class="campo"><span class="etiqueta" style="color:var(--apagado)">Alumno</span>
        <input type="text" placeholder="Nombre y apellido" data-alumno="${el.cod}"></label>
      <label class="campo"><span class="etiqueta" style="color:var(--apagado)">Año y división</span>
        <select data-division="${el.cod}">${opcionesDivision('')}</select></label>
      <p class="error" data-error="${el.cod}" hidden></p>
      <div class="fila">
        <button class="chico-b" data-accion="cancelar" data-cod="${el.cod}">Cancelar</button>
        <button class="chico-b amarillo" data-accion="confirmar" data-cod="${el.cod}">Confirmar</button>
      </div>`;
  } else if (ed == 'devolver') {
    abajo = `
      <p class="etiqueta">¿Cómo vuelve?</p>
      <div class="fila">
        <button class="chico-b e-Disponible" data-accion="vuelve" data-como="Disponible" data-cod="${el.cod}">${icono('tilde')} Bien</button>
        <button class="chico-b e-Pinchada" data-accion="vuelve" data-como="Pinchada" data-cod="${el.cod}">Pinchada</button>
      </div>
      <button class="chico-b bajo" data-accion="cancelar" data-cod="${el.cod}">Cancelar</button>`;
  } else if (ed == 'reportar') {
    abajo = `
      <p class="etiqueta">¿Qué le pasó?</p>
      <button class="chico-b bajo e-Pinchada" data-accion="reporte" data-como="Pinchada" data-cod="${el.cod}">Pinchada</button>
      <button class="chico-b bajo e-Rota" data-accion="reporte" data-como="Rota" data-cod="${el.cod}">Rota</button>
      <button class="chico-b bajo e-Perdida" data-accion="reporte" data-como="Perdida" data-cod="${el.cod}">Perdida</button>
      <button class="chico-b bajo" data-accion="cancelar" data-cod="${el.cod}">Cancelar</button>`;
  } else if (el.estado == 'Disponible') {
    abajo = `
      <div class="fila">
        <button class="chico-b amarillo" data-accion="pedir" data-cod="${el.cod}">Pedir ${icono('flecha')}</button>
        <button class="chico-b bandera" data-accion="reportar" data-cod="${el.cod}" title="Reportar un problema" aria-label="Reportar un problema">${icono('bandera')}</button>
      </div>`;
  } else if (el.estado == 'Prestado') {
    abajo = `
      <div class="quien">
        <span class="avatar">${limpiar(iniciales(el.alumno))}</span>
        <div><b>${limpiar(el.alumno)}</b><small>${limpiar(el.division)} - ${hora(el.desde)}</small></div>
      </div>
      <button class="chico-b" data-accion="devolver" data-cod="${el.cod}">Devolver</button>`;
  } else {
    abajo = `
      <p class="nota e-${el.estado}" style="background:none">${notas[el.estado]}</p>
      <button class="chico-b" data-accion="arreglar" data-cod="${el.cod}">${el.estado == 'Perdida' ? 'Apareció' : 'Ya está arreglada'}</button>`;
  }

  return `
    <article class="tarjeta${ed ? ' editando' : ''}${fuera ? ' fuera' : ''}">
      <div class="t-arriba">
        <span class="circulo ${circulo}">${icono(el.ic)}</span>
        ${etiqueta(el.estado)}
      </div>
      <div>
        <p class="t-nombre">${el.nombre}</p>
        <p class="t-cod">${el.cod} - ${el.dep}</p>
      </div>
      <div class="t-abajo">${abajo}</div>
    </article>`;
}

function dibujarTarjetas() {
  let lista = datos.elementos;
  if (filtro != 'Todos') lista = lista.filter(e => e.dep == filtro);
  if (filtroEstado == 'fuera') lista = lista.filter(e => ['Pinchada', 'Rota', 'Perdida'].includes(e.estado));
  else if (filtroEstado) lista = lista.filter(e => e.estado == filtroEstado);
  if (!lista.length) {
    $('tarjetas').innerHTML = '<div class="vacio" style="grid-column:1/-1"><b>No hay nada acá</b>Probá con otro filtro.</div>';
    return;
  }
  $('tarjetas').innerHTML = lista.map(tarjeta).join('');
}

function dibujarPrestamos() {
  const lista = datos.elementos.filter(e => e.estado == 'Prestado').sort((a, b) => a.desde - b.desde);
  if (!lista.length) {
    $('listaPrestamos').innerHTML = '<div class="vacio"><b>No hay préstamos</b>Todo está en preceptoría.</div>';
    return;
  }
  $('listaPrestamos').innerHTML = lista.map(el => {
    const tarde = Date.now() - el.desde > 30 * minuto;
    return `
      <div class="prestamo">
        <span class="avatar">${limpiar(iniciales(el.alumno))}</span>
        <div><b>${limpiar(el.alumno)}</b><br><small class="sub">${limpiar(el.division)}</small></div>
        <div class="elemento">
          <span class="circulo pres">${icono(el.ic)}</span>
          <div><b>${el.nombre}</b><small class="sub">${el.cod}</small></div>
        </div>
        <div class="tiempo">Desde las ${hora(el.desde)}<small class="${tarde ? 'tarde' : ''}">${hace(el.desde)}</small></div>
        ${etiqueta('Prestado')}
        <button class="chico-b" data-accion="devolver-lista" data-cod="${el.cod}">Devolver</button>
      </div>`;
  }).join('');
}

function dibujarHistorial() {
  const ahora = Date.now();
  let lista = datos.movimientos;
  if (periodo == 'hoy') lista = lista.filter(m => new Date(m.fecha).toDateString() == new Date().toDateString());
  if (periodo == 'semana') lista = lista.filter(m => ahora - m.fecha < 7 * dia);
  if (periodo == 'mes') lista = lista.filter(m => ahora - m.fecha < 31 * dia);
  if (!lista.length) {
    $('tablaHistorial').innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px">No hay movimientos en este período.</td></tr>';
    return;
  }
  $('tablaHistorial').innerHTML = lista.map(m => `
    <tr>
      <td>${cuando(m.fecha)}</td>
      <td>${limpiar(m.alumno) || '-'}</td>
      <td>${limpiar(m.division) || '-'}</td>
      <td>${m.cod} ${m.nombre}</td>
      <td>${m.tipo}</td>
      <td>${etiqueta(m.estado)}</td>
    </tr>`).join('');
}

// ---------- pantallas ----------

function ir(vista) {
  for (const v of ['inventario', 'prestamos', 'historial']) {
    $('vista-' + v).hidden = v != vista;
  }
  document.querySelectorAll('.item').forEach(b => b.classList.toggle('activo', b.dataset.ir == vista));
  window.scrollTo(0, 0);
}

// ---------- ventana de registro ----------

function abrirRegistro() {
  const disponibles = datos.elementos.filter(e => e.estado == 'Disponible');
  let h = '<option value="">Elegí qué se lleva</option>';
  for (const e of disponibles) h += '<option value="' + e.cod + '">' + e.cod + ' ' + e.nombre + '</option>';
  if (!disponibles.length) h = '<option value="">No hay nada disponible</option>';
  $('rElemento').innerHTML = h;
  $('rDivision').innerHTML = opcionesDivision('');
  $('rAlumno').value = '';
  $('rError').hidden = true;
  document.querySelectorAll('#formRegistro .campo').forEach(c => c.classList.remove('mal'));
  $('ventanaRegistro').hidden = false;
  $('rElemento').focus();
}

function cerrarVentanas() {
  $('ventanaRegistro').hidden = true;
  $('ventanaListo').hidden = true;
}

function mostrarListo(cod, alumno) {
  $('textoListo').textContent = cod + ' para ' + alumno + '. Retirá el elemento en preceptoría.';
  $('ventanaListo').hidden = false;
}

function validar(alumno, division) {
  if (alumno.trim().length < 3) return 'Escribí el nombre y apellido del alumno.';
  if (!division) return 'Elegí el año y la división.';
  return '';
}

$('formRegistro').addEventListener('submit', e => {
  e.preventDefault();
  const cod = $('rElemento').value;
  const alumno = $('rAlumno').value.trim();
  const division = $('rDivision').value;
  let error = '';
  if (!cod) error = 'Elegí qué elemento se lleva.';
  else error = validar(alumno, division);
  $('rElemento').parentNode.classList.toggle('mal', !cod);
  $('rAlumno').parentNode.classList.toggle('mal', !!cod && alumno.length < 3);
  $('rDivision').parentNode.classList.toggle('mal', !!cod && alumno.length >= 3 && !division);
  if (error) {
    $('rError').textContent = error;
    $('rError').hidden = false;
    return;
  }
  prestar(cod, alumno, division);
  $('ventanaRegistro').hidden = true;
  dibujarTodo();
  mostrarListo(cod, alumno);
});

// ---------- clics ----------

document.addEventListener('click', e => {
  const b = e.target.closest('button, [data-cerrar]');
  if (!b) return;

  if (b.hasAttribute('data-cerrar')) { cerrarVentanas(); return; }

  if (b.dataset.ir) {
    if (b.dataset.filtroEstado) { filtroEstado = b.dataset.filtroEstado; filtro = 'Todos'; dibujarFiltros(); dibujarTarjetas(); }
    ir(b.dataset.ir);
    return;
  }
  if (b.id == 'abrirRegistro' || b.id == 'abrirRegistro2') { abrirRegistro(); return; }

  if (b.dataset.deporte) { filtro = b.dataset.deporte; dibujarFiltros(); dibujarTarjetas(); return; }
  if (b.hasAttribute('data-quitar-estado')) { filtroEstado = ''; dibujarFiltros(); dibujarTarjetas(); return; }

  if (b.dataset.periodo) {
    periodo = b.dataset.periodo;
    document.querySelectorAll('#periodos .chip').forEach(c => c.classList.toggle('activo', c == b));
    dibujarHistorial();
    return;
  }

  const cod = b.dataset.cod;
  switch (b.dataset.accion) {
    case 'pedir':
    case 'devolver':
    case 'reportar':
      editando[cod] = b.dataset.accion;
      dibujarTarjetas();
      if (b.dataset.accion == 'pedir') document.querySelector('[data-alumno="' + cod + '"]').focus();
      break;
    case 'cancelar':
      delete editando[cod];
      dibujarTarjetas();
      break;
    case 'confirmar': {
      const alumno = document.querySelector('[data-alumno="' + cod + '"]').value.trim();
      const division = document.querySelector('[data-division="' + cod + '"]').value;
      const error = validar(alumno, division);
      const caja = document.querySelector('[data-error="' + cod + '"]');
      if (error) {
        caja.textContent = error;
        caja.hidden = false;
        return;
      }
      delete editando[cod];
      prestar(cod, alumno, division);
      dibujarTodo();
      break;
    }
    case 'vuelve':
      delete editando[cod];
      devolver(cod, b.dataset.como);
      dibujarTodo();
      break;
    case 'reporte':
      delete editando[cod];
      reportar(cod, b.dataset.como);
      dibujarTodo();
      break;
    case 'arreglar':
      arreglar(cod);
      dibujarTodo();
      break;
    case 'devolver-lista':
      editando[cod] = 'devolver';
      filtro = 'Todos';
      filtroEstado = '';
      dibujarFiltros();
      dibujarTarjetas();
      ir('inventario');
      break;
  }
});

document.addEventListener('keydown', e => {
  if (e.key == 'Escape') cerrarVentanas();
});

// ---------- reloj ----------

function reloj() {
  const ahora = new Date();
  $('hora').textContent = hora(ahora.getTime());
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  $('fecha').textContent = dias[ahora.getDay()] + ' ' + ahora.getDate() + ' de ' + meses[ahora.getMonth()];

  // recreo de 10:20 a 10:40
  const inicio = new Date(ahora); inicio.setHours(10, 20, 0, 0);
  const fin = new Date(ahora); fin.setHours(10, 40, 0, 0);
  if (ahora >= inicio && ahora <= fin) {
    const total = fin - inicio;
    $('barraRecreo').style.width = Math.round((ahora - inicio) / total * 100) + '%';
    $('textoRecreo').textContent = 'Recreo: quedan ' + Math.ceil((fin - ahora) / minuto) + ' min';
  } else {
    $('barraRecreo').style.width = '0%';
    $('textoRecreo').textContent = 'Recreo de 10:20 a 10:40';
  }
}

// iconos que estan en el html
document.querySelectorAll('[data-icono]').forEach(s => { s.classList.add('ic'); s.innerHTML = iconos[s.dataset.icono]; });

reloj();
setInterval(() => { reloj(); dibujarPrestamos(); }, 30000);
dibujarTodo();
