import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Calendar.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    showModal: false, // Nueva propiedad para manejar la visibilidad del modal
    selectedEvent: null // Nueva propiedad para almacenar el evento seleccionado
  }

  render() {
    return (
    
      <div className='demo-app'>
        
        {this.renderSidebar()}
        <div className='demo-app-main'>
        
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,bootstrapPlugin]}
            headerToolbar={{
              left: '',
              center: '',
              right: 'timeGridWeek'
            }}
            locale={'es'}
            dayHeaderFormat={{ weekday: 'long' }}
            firstDay={1}
            height={"90vh"}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            allDaySlot={false}
            slotDuration={'01:20:00'} // Duración de los bloques
            
            slotMinTime='08:15:00' // Hora de inicio
            slotMaxTime='23:00:00' // Hora de fin
          // Agregar un eventRender para modificar visualmente los bloques
          eventRender={this.adjustEventRendering}
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

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instrucciones</h2>
          <ul>
            <li>Selecciona un bloque especifico y podras agregar un</li>
            <li>Puedes mantener, mover y estirar eventos para abarcar mas horas</li>
            <li>Click en un evento para eliminarlo</li>
          </ul>
        </div>
        <div className='check'>
          <label>
          Mostrar fines de semana
            <input 
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>Todos los eventos ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  renderEventModal() {
    const { showModal, selectedEvent } = this.state;
  
    if (!showModal || !selectedEvent) {
      return null; // No hay evento seleccionado, no renderizar el modal
    }
    return (
      <Modal show={showModal} onHide={this.handleCloseModal}>
        <Modal.Header >
          
          <Modal.Title>{selectedEvent.title}</Modal.Title>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            <i className="fas fa-times"></i> Cerrar
          </Button>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Fecha:</strong> {selectedEvent.start.toLocaleString()}</p>
          <p><strong>Descripción:</strong> {selectedEvent.extendedProps.description}</p>
          {/* Agrega más detalles según tus necesidades */}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={this.handleDeleteEvent}>
          Eliminar
          </Button>

        </Modal.Footer>
      </Modal>
    );
  }

  componentDidMount() {
    // Realiza una solicitud al backend para obtener eventos
    axios.get('http://localhost:4000/eventos')
      .then(response => {
        const eventos = response.data;
        
        
        // Mapea los eventos para que se ajusten al formato esperado por FullCalendar
        const formattedEvents = eventos.map(event => ({
          id: event.id_evento,
          title: event.id_asignatura,
          start: event.start,
          end: event.end,
          id_sala: event.id_sala,
          cupos: event.cupos,
          seccion: event.seccion,
          fecha: event.fecha,
          
        }));
        this.setState({ currentEvents: eventos });
      })
      .catch(error => {
        console.error('Error al obtener eventos:', error);
      });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedEvent: null,
    });
  }
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
      
    }
  }
  
  /*
      handleEventClick = (clickInfo) => {
    if (confirm(`¿Estas seguro de eliminar este evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  } */

  handleEventClick = (clickInfo) => {
    const selectedEvent = clickInfo.event;
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

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <p>Más información: {eventInfo.event.extendedProps.description}</p>
      
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}


