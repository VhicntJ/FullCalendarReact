let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Asignatura 1',
    start: todayStr + 'T08:15:00', // ajusta la hora según tus necesidades
    end: todayStr + 'T10:55:00',   // ajusta la hora según tus necesidades
    id_asignatura: 'ID1',
    id_sala: 'Sala-303',
    seccion: 'Sección-202',
    description: 'Descripción de la asignatura 1'
  },
  {
    id: createEventId(),
    title: 'Asignatura 2',
    start: todayStr + 'T13:35:00', // ajusta la hora según tus necesidades
    end: todayStr + 'T14:55:00',   // ajusta la hora según tus necesidades
    id_asignatura: 'ID2',
    id_sala: 'Sala-402',
    seccion: 'Sección-101',
    description: 'Descripción de la asignatura 2'
  },
  {
    id: createEventId(),
    title: 'Asignatura 3',
    start: '2023-11-28T13:35:00', // ajusta la hora según tus necesidades
    end:  '2023-11-28T14:55:00',   // ajusta la hora según tus necesidades
    id_asignatura: 'ID2',
    id_sala: 'Sala-402',
    seccion: 'Sección-101',
    description: 'Descripción de la asignatura 2'
  }
  ,
  {
    id: createEventId(),
    title: 'Asignatura 4',
    start: '2023-11-29T10:55:00', // ajusta la hora según tus necesidades
    end:  '2023-11-29T12:15:00',   // ajusta la hora según tus necesidades
    id_asignatura: 'ID2',
    id_sala: 'Sala-402',
    seccion: 'Sección-101',
    description: 'Descripción de la asignatura 2'
  }
  ,
  {
    id: createEventId(),
    title: 'Asignatura 5',
    start: '2023-11-30T10:55:00', // ajusta la hora según tus necesidades
    end:  '2023-11-30T12:15:00',   // ajusta la hora según tus necesidades
    id_asignatura: 'ID2',
    id_sala: 'Sala-402',
    seccion: 'Sección-101',
    description: 'Descripción de la asignatura 2'
  },
  {
    id: createEventId(),
    title: 'Asignatura 6',
    start: '2023-11-28T09:35:00', // ajusta la hora según tus necesidades
    end:  '2023-11-28T12:15:00',   // ajusta la hora según tus necesidades
    id_asignatura: 'ID2',
    id_sala: 'Sala-402',
    seccion: 'Sección-101',
    description: 'Descripción de la asignatura 2'
  }
  
  
]


export async function fetchEventsFromAPI() {
  try {
    const response = await fetch('http://localhost:4000/eventos');
    const events = await response.json();

    // Mapear los eventos para que se ajusten al formato esperado por FullCalendar
    return events.map(event => ({
      id: event.id_evento,
      title: event.id_asignatura, // Puedes ajustar según tus necesidades
      start: event.start,  // Ajustar según la estructura de tu base de datos
      end: event.end,  // Ajustar según la estructura de tu base de datos
      id_asignatura: event.id_asignatura,
      id_sala: event.id_sala,
      seccion: event.seccion,
      cupos: event.cupos,
      fecha: event.fecha,
      // Otros campos según tu esquema de base de datos
    }));
  } catch (error) {
    console.error('Error al obtener eventos desde la API:', error);
    return [];
  }
}

export function createEventId() {
  return String(Date.now());
}

