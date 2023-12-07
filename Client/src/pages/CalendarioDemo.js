import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Calendar.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export default class DemoApp extends React.Component {

  obtenerNumeroDia = (diaPalabra) => {
    const dias = {
      domingo: "2023-12-03",
      lunes: "2023-12-04",
      martes: "2023-12-05",
      miércoles: "2023-12-06",
      jueves: "2023-12-07",
      viernes: "2023-12-08",
      sábado: "2023-12-09",
    };

    const diaLowerCase = diaPalabra.trim().toLowerCase();

    return dias[diaLowerCase];
  };

  
  

  customSlotLabelContent = (slotInfo) => {
    const blockNumber = slotInfo.date.getHours() - 7; // Resta 7 para ajustar desde las 8:15
    const blockText = ``;
    return <span>{blockText}</span>;
  };
  customSlotLabelMount = (arg) => {
    const blockNumber = arg.date.getHours() - 7; // Resta 7 para ajustar desde las 8:15
    const blockText = ``;
    const label = document.createElement('div');
    label.innerHTML = `<span>${blockText}</span>`;
    arg.el.appendChild(label);
  };

  componentDidMount() {
    // Cargar eventos desde la API y establecerlos directamente en FullCalendar
    this.fetchEventsFromAPI().then(apiEvents => {
      console.log('Eventos cargados desde la APIARRIBA:', apiEvents);
  
      this.setState(prevState => ({
        currentEvents: [...prevState.currentEvents, ...apiEvents],
      }));
    });
  }
  componentDidUpdate(prevProps) {
    // Detectar cambios en las propiedades relacionadas con los filtros y realizar acciones si es necesario
    if (this.props.sala !== prevProps.sala || this.props.carrera !== prevProps.carrera || this.props.nivel !== prevProps.nivel || this.props.profesor !== prevProps.profesor || this.props.asignatura !== prevProps.asignatura || this.props.facultad !== prevProps.facultad) {
      // Realizar acciones, como recargar eventos con los nuevos filtros
      this.fetchAndFilterEventsFromAPI();
    }
  }

  fetchAndFilterEventsFromAPI = () => {
    const {
      sala,
      carrera,
      nivel,
      profesor,
      asignatura,
      facultad,
      
    } = this.props;

    fetch('http://localhost:3001/eventos')
      .then((response) => response.json())
      .then((eventos) => {
                // Mapear los eventos para que se ajusten al formato esperado por FullCalendar
                const formattedEvents = eventos.map((event) => {
                  const fecha = this.obtenerNumeroDia(event.fecha);
                  const start = `${fecha}T${event.start}`;
                  const end = `${fecha}T${event.end}`;
        
                  return {
                    id: event.id_evento,
                    bloque: event.id_horario,
                    title: event.nombre_asignatura,
                    start,
                    end,
                    id_sala: event.id_sala,
                    cupos: event.cupos,
                    seccion: event.seccion,
                    id_asignatura: event.id_asignatura,
                    fecha,
                    nivel: event.id_nivel,
                  };
                });
                console.log('Eventos ANTES del filtro de asignatura:', formattedEvents);

                const filteredEvents = formattedEvents.filter((event) => {
                  const eventAsignatura = event.id_asignatura.toString(); // Convertir a cadena para comparación
                  const isSelectedAsignatura = !asignatura || eventAsignatura === asignatura;
                  return (
                    (!sala || event.id_sala === sala) &&
                    (!carrera || event.id_carrera === carrera) &&
                    (!nivel || event.id_nivel === nivel) &&
                    (!profesor || event.id_profesor === profesor) &&
                    isSelectedAsignatura &&
                    (!facultad || event.id_facultad === facultad)
                  );
                });
                
        console.log('Eventos después del filtro de asignatura:', filteredEvents);


        this.setState({
          currentEvents: filteredEvents,
        });
        console.log('filtro', filteredEvents);
      })
      .catch((error) => {
        console.error('Error al obtener eventos desde la API:', error);
      });
  };
    
  
    // Función para manejar cambios en los filtros
    handleFilterChange = () => {
      // Llamar a la función para obtener y filtrar eventos desde la API
      this.fetchAndFilterEventsFromAPI();
    };
    
  
  

  state = {
    weekendsVisible: true,
    currentEvents: [],
    showModal: false, // Nueva propiedad para manejar la visibilidad del modal
    selectedEvent: null // Nueva propiedad para almacenar el evento seleccionado
  }
  render() {
    console.log("Sala seleccionada:", this.props.sala); // Cambia a this.props
    console.log("asignatura seleccionada:", this.props.asignatura); // Cambia a this.props
    return (
    
      <div className='demo-app'>
        
        {/* {this.renderSidebar()} */}
        <div className='demo-app-main'>
        
          <FullCalendar
          sala={this.state.selectedSala}
          carrera={this.state.selectedCarrera}
          nivel={this.state.selectedNivel}
          profesor={this.state.selectedProfesor}
          asignatura={this.state.selectedAsignatura}
          facultad={this.state.selectedFacultad}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,bootstrap5Plugin]}
            headerToolbar={{
              left: '',
              center: '',
              right: ''
            }}
            locale={'es'}
            dayHeaderFormat={{ weekday: 'long' }}
            firstDay={1}
            height={"90vh"}
            initialView='timeGridWeek'
            hiddenDays={[0]}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            
            slotLabelContent={this.customSlotLabelContent}
            themeSystem='bootstrap5'
            weekends={this.state.weekendsVisible}
            events={[...INITIAL_EVENTS, ...this.state.currentEvents]} // alternatively, use the `events` setting to fetch from a feed
            
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            allDaySlot={false}

            //slotLabelDidMount={this.customSlotLabelMount}
            slotLabelInterval={'01:20:00'} // Intervalo de los bloques
            slotDuration={"00:10:00"}
            slotMinTime='08:15:00' // Hora de inicio
            slotMaxTime='23:00:00' // Hora de fin
                        
          // Agregar un eventRender para modificar visualmente los bloques
          //eventRender={this.adjustEventRendering}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
        {this.renderEventModal()}
      </div>
    )
  }
  
  adjustEventRendering = (info) => {
    // Realizar ajustes visuales a los eventos
    const eventStart = info.event.start;
    const eventEnd = info.event.end;
  }  

  renderEventModal() {
    const { showModal, selectedEvent } = this.state;
  
    if (!showModal || !selectedEvent) {
      return null; // No hay evento seleccionado, no renderizar el modal
    }
  
    const isRecreo = selectedEvent.title === 'RECREO';
  
    return (
      <Modal show={showModal} onHide={this.handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{selectedEvent.title}</Modal.Title>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            <i className="fas fa-times"></i> Cerrar
          </Button>
        </Modal.Header>
        <Modal.Body>
          {isRecreo ? (
            <p>¡Es hora de descansar!</p>
          ) : (
            <>
              <p><strong>Nombre Asignatura:</strong> {selectedEvent.title}</p>
              <p><strong>ID Asignatura:</strong> {selectedEvent.extendedProps.id_asignatura}</p>
              <p><strong>Carrera 1:</strong> {selectedEvent.extendedProps.id_asignatura}</p>
              <p><strong>Carrera 2:</strong> {selectedEvent.extendedProps.id_asignatura}</p>
              <p><strong>ID de Sala:</strong> {selectedEvent.extendedProps.id_sala}</p>
              <p><strong>Sección:</strong> {selectedEvent.extendedProps.seccion}</p>
              <p><strong>Cupos:</strong> {selectedEvent.extendedProps.cupos}</p>
              <p><strong>Bloque:</strong> {selectedEvent.extendedProps.bloque}</p>
              {/* Agrega más detalles según tus necesidades */}
            </>
          )}
        </Modal.Body>
        {!isRecreo && (
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleDeleteEvent}>
              Eliminar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    );
  }
  
  

  fetchEventsFromAPI() {
    function obtenerNumeroDia(diaPalabra) {
      const dias = {
        domingo: "2023-12-03",
        lunes: "2023-12-04",
        martes: "2023-12-05",
        miércoles: "2023-12-06",
        jueves: "2023-12-07",
        viernes: "2023-12-08",
        sábado: "2023-12-09",
      };
  
      // Convertir a minúsculas y eliminar posibles espacios extra al inicio y al final
      const diaLowerCase = diaPalabra.trim().toLowerCase();
  
      return dias[diaLowerCase];
    }
  
    return fetch('http://localhost:3001/eventos')
      .then(response => response.json())
      .then(eventos => {
        if (!Array.isArray(eventos)) {
          console.error('La respuesta de la API no es un array:', eventos);
          return []; // Devolver un array vacío si no es un array
        }
        console.log('Datos originales de la API:', eventos);
  
        // Mapear los eventos para que se ajusten al formato esperado por FullCalendar
        return eventos.map(event => {
          const fecha = obtenerNumeroDia(event.fecha);
          const start = `${fecha}T${event.start}`;
          const end = `${fecha}T${event.end}`;
  
          return {
            id: event.id_evento,
            bloque: event.id_horario,
            title: event.nombre_asignatura,
            start,
            end,
            id_sala: event.id_sala,
            cupos: event.cupos,
            seccion: event.seccion,
            id_asignatura: event.id_asignatura,
            fecha,
            nivel: event.id_nivel,
          };
        });
      })
      .catch(error => {
        console.error('Error al obtener eventos desde la API:', error);
        return []; // Devolver un array vacío en caso de error
      });
  }
  

  

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedEvent: null,
    });
  }

  handleDateSelect = async (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // clear date selection
  
    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        key: createEventId(), // Agrega una clave única
      };
  
      // Establecer la fecha de inicio en función del día de la semana
      const startDay = selectInfo.start.getDay();
      if (startDay >= 1 && startDay <= 6) { // Verificar si es de lunes a sábado
        newEvent.start = selectInfo.startStr; // Usar la fecha seleccionada
        newEvent.end = selectInfo.endStr;
      } else {
        // Calcular la fecha del próximo lunes
        const nextMonday = new Date(selectInfo.start);
        nextMonday.setDate(selectInfo.start.getDate() + (1 + 7 - startDay) % 7);
        newEvent.start = formatDate(nextMonday, { timeZone: 'UTC' });
        newEvent.end = formatDate(new Date(nextMonday.getTime() + selectInfo.end - selectInfo.start), { timeZone: 'UTC' });
      }
  
      // Agregar el nuevo evento a la lista existente de eventos
      this.setState((prevState) => ({
        currentEvents: [...prevState.currentEvents, newEvent],
      }));
  
      calendarApi.addEvent({ ...newEvent, id: newEvent.id });
  
      // Ahora puedes guardar este nuevo evento en tu base de datos
      try {
        await axios.post('http://localhost:3001/eventos', newEvent);
      } catch (error) {
        console.error('Error al guardar el nuevo evento:', error);
      }
    }
  };


  handleEventClick = (clickInfo) => {
    const selectedEvent = clickInfo.event;
  
    // Verificar si el evento es un "Recreo"
    if (selectedEvent.title === '') {
      return; // No hacer nada si es un "Recreo"
    }
  
    this.setState({
      showModal: true,
      selectedEvent,
    });
  }

  handleDeleteEvent = () => {
    const { selectedEvent } = this.state;
    if (window.confirm(`¿Estás seguro de eliminar el evento "${selectedEvent.title}"?`)) {
      selectedEvent.remove();
      this.setState({
        showModal: false,
        selectedEvent: null,
      });
    }
  }
  handleEvents = (events) => {   
    this.setState({
      currentEvents: events

    })
  }
}
// Renderiza el contenido de los eventos
function renderEventContent(eventInfo) {
  return (
    <>
      <b className='grid height:50px'>{eventInfo.timeText}</b>
      {eventInfo.event.title && ( // Verifica si el título no está vacío
        <>
          <i className='grid height:50px'>{eventInfo.event.title}</i>
          <p>Sección: {eventInfo.event.extendedProps.seccion}</p>
          <p>Sala: {eventInfo.event.extendedProps.id_sala}</p>
          <p>Bloque: {eventInfo.event.extendedProps.bloque}</p>
        </>
      )}
    </>
  );
}

 
/*
function renderSidebarEvent(event, index) {
  return (
    <div className='grid'>
    <li key={`${event.id}-${index}`}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{`Asignatura: ${event.title}`}</i>
      <i className='grid'>{`Sala: ${event.id_sala}  | Sección: ${event.seccion}`}</i>
      <i className='grid'>{`Hora Inicio: ${event.start}  | Hora Fin: ${event.end}`}</i>
      <div className='cuad'></div>
    </li>
    </div>
  );
}
*/

