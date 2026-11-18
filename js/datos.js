/* SSES Piloto · MVP — datos ficticios precargados.
   Según la sección 2.8 de la propuesta: 3 entidades, 2 estrategias, 30 estudiantes, 6 docentes, 2 tutores.
   Ningún dato corresponde a personas o instituciones reales. */
window.SSES_DATOS_INICIALES = (function () {
  const entidades = [
    { id: 'E1', nombre: 'IE Los Andes', municipio: 'Tunja', region: 'Andina' },
    { id: 'E2', nombre: 'Colegio Mar Caribe', municipio: 'Santa Marta', region: 'Caribe' },
    { id: 'E3', nombre: 'IE Selva Verde', municipio: 'Leticia', region: 'Amazonía' }
  ];

  const nombres = [
    'Valentina Rojas', 'Samuel Herrera', 'Isabella Cárdenas', 'Matías Gómez', 'Mariana López',
    'Emiliano Torres', 'Sara Martínez', 'Jerónimo Díaz', 'Salomé Vargas', 'Tomás Ramírez',
    'Antonella Castro', 'Juan José Pérez', 'Luciana Moreno', 'Martín Jiménez', 'Gabriela Ortiz',
    'Santiago Muñoz', 'Victoria Suárez', 'Nicolás Reyes', 'Camila Parra', 'Daniel Quintero',
    'Ana Sofía Mejía', 'David Ospina', 'Manuela Rincón', 'Felipe Guerrero', 'Laura Valencia',
    'Andrés Salazar', 'María José Pineda', 'Sebastián Cifuentes', 'Juliana Arias', 'Alejandro Bernal'
  ];
  const estudiantes = nombres.map((n, i) => ({
    id: 'S' + (i + 1),
    documento: String(1098700120 + i * 37),
    nombre: n,
    grado: 6 + (i % 6),
    entidadId: i < 14 ? 'E1' : i < 24 ? 'E2' : 'E3'
  }));

  const docentes = [
    { id: 'D1', nombre: 'Rosa Elena Pinzón', area: 'Tecnología', entidadId: 'E1', tutorId: 'T1' },
    { id: 'D2', nombre: 'Hernán Cuervo', area: 'Matemáticas', entidadId: 'E1', tutorId: 'T1' },
    { id: 'D3', nombre: 'Patricia Lozano', area: 'Ciencias', entidadId: 'E1', tutorId: 'T1' },
    { id: 'D4', nombre: 'Jairo Barrios', area: 'Lenguaje', entidadId: 'E2', tutorId: 'T2' },
    { id: 'D5', nombre: 'Yolanda Ávila', area: 'Lenguaje', entidadId: 'E2', tutorId: 'T2' },
    { id: 'D6', nombre: 'Óscar Tapias', area: 'Sociales', entidadId: 'E2', tutorId: 'T2' }
  ];

  const tutores = [
    { id: 'T1', nombre: 'Laura Méndez', region: 'Andina' },
    { id: 'T2', nombre: 'Andrés Rincón', region: 'Caribe' }
  ];

  const estrategias = [
    {
      id: 'ES1', version: 1, versionDe: null,
      nombre: 'Club de robótica escolar', entidadId: 'E1',
      objetivo: 'Desarrollar pensamiento computacional con retos de robótica en jornada contraria.',
      inicio: '2026-08-03', fin: '2026-11-27', cupo: 20, estado: 'activa',
      estudiantes: ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12','S13','S14','S15','S16','S17','S18'],
      docentes: ['D1', 'D2', 'D3']
    },
    {
      id: 'ES2', version: 1, versionDe: null,
      nombre: 'Semillero de lectura en voz alta', entidadId: 'E2',
      objetivo: 'Fortalecer la comprensión lectora con lectura compartida dos tardes por semana.',
      inicio: '2027-02-01', fin: '2027-06-18', cupo: 12, estado: 'activa',
      estudiantes: [],
      docentes: ['D4', 'D5', 'D6']
    }
  ];

  // Acompañamientos de noviembre 2026: 4 semanas cada uno.
  const semanas = [
    { n: 1, fecha: '2026-11-03' }, { n: 2, fecha: '2026-11-10' },
    { n: 3, fecha: '2026-11-17' }, { n: 4, fecha: '2026-11-24' }
  ];
  const reg = (asistencia, actividades, observaciones, avance) =>
    ({ estado: 'registrada', asistencia, actividades, observaciones, avance, sync: 'ok' });
  const vacia = () => ({ estado: 'pendiente' });

  const acompanamientos = [
    {
      id: 'A1', tutorId: 'T1', mes: '2026-11', tipo: 'Individual', docentes: ['D1'], estrategiaId: 'ES1',
      semanas: semanas.map(s => ({ ...s })),
      registros: [
        reg({ D1: true }, 'Planeación de reto con kits de robótica', 'Buena disposición; requiere apoyo en evaluación.', 'Medio'),
        reg({ D1: true }, 'Observación de clase y retroalimentación', 'Aplicó la rúbrica propuesta.', 'Alto'),
        vacia(), vacia()
      ]
    },
    {
      id: 'A2', tutorId: 'T1', mes: '2026-11', tipo: 'Grupal', docentes: ['D2', 'D3'], estrategiaId: 'ES1',
      semanas: semanas.map(s => ({ ...s })),
      registros: [
        reg({ D2: true, D3: true }, 'Taller de integración matemáticas–ciencias', 'Se acordó proyecto común.', 'Medio'),
        reg({ D2: true, D3: false }, 'Revisión de avances del proyecto', 'D3 en jornada de evaluación institucional.', 'Medio'),
        vacia(), vacia()
      ]
    },
    {
      id: 'A3', tutorId: 'T2', mes: '2026-11', tipo: 'Individual', docentes: ['D4'], estrategiaId: 'ES2',
      semanas: semanas.map(s => ({ ...s })),
      registros: [
        reg({ D4: true }, 'Selección de textos para el semillero', 'Propone autores del Caribe.', 'Alto'),
        { estado: 'reprogramada', motivo: 'Paro de transporte en el municipio' },
        vacia(), vacia()
      ]
    },
    {
      id: 'A4', tutorId: 'T2', mes: '2026-11', tipo: 'Grupal', docentes: ['D5', 'D6'], estrategiaId: 'ES2',
      semanas: semanas.map(s => ({ ...s })),
      registros: [vacia(), vacia(), vacia(), vacia()]
    }
  ];

  return { entidades, estudiantes, docentes, tutores, estrategias, acompanamientos, hoy: '2026-11-18' };
})();
