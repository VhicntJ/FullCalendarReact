let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

let eventGuidCounter = 0;

export function createEventId() {
  eventGuidCounter++;
  return String(Date.now() + eventGuidCounter);
}



export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    start: '2023-11-27T09:35:00',
    end: '2023-11-27T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },

  {
    id: createEventId(),
    title: '',
    start: '2023-12-04T09:35:00',
    end: '2023-12-04T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-05T09:35:00',
    end: '2023-12-05T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-06T09:35:00',
    end: '2023-12-06T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-07T09:35:00',
    end: '2023-12-07T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-08T09:35:00',
    end: '2023-12-08T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-09T09:35:00',
    end: '2023-12-09T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-09T11:05:00',
    end: '2023-12-09T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-08T11:05:00',
    end: '2023-12-08T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-07T11:05:00',
    end: '2023-12-07T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-06T11:05:00',
    end: '2023-12-06T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-05T11:05:00',
    end: '2023-12-05T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-04T11:05:00',
    end: '2023-12-04T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-04T12:35:00',
    end: '2023-12-04T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-09T12:35:00',
    end: '2023-12-09T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-08T12:35:00',
    end: '2023-12-08T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-07T12:35:00',
    end: '2023-12-07T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-06T12:35:00',
    end: '2023-12-06T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-05T12:35:00',
    end: '2023-12-05T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  }
  /////////////////////////////////////
  ,
  {
    id: createEventId(),
    title: '',
    start: '2023-12-04T14:05:00',
    end: '2023-12-04T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-09T14:05:00',
    end: '2023-12-09T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-08T14:05:00',
    end: '2023-12-08T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-07T14:05:00',
    end: '2023-12-07T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-06T14:05:00',
    end: '2023-12-06T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-05T14:05:00',
    end: '2023-12-05T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
    /////////////////////////////////////
    {
      id: createEventId(),
      title: '',
      start: '2023-12-04T15:35:00',
      end: '2023-12-04T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-09T15:35:00',
      end: '2023-12-09T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-08T15:35:00',
      end: '2023-12-08T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-07T15:35:00',
      end: '2023-12-07T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-06T15:35:00',
      end: '2023-12-06T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-05T15:35:00',
      end: '2023-12-05T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    /////////////////////////////////////
    {
      id: createEventId(),
      title: '',
      start: '2023-12-04T17:05:00',
      end: '2023-12-04T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-09T17:05:00',
      end: '2023-12-09T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-08T17:05:00',
      end: '2023-12-08T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-07T17:05:00',
      end: '2023-12-07T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-06T17:05:00',
      end: '2023-12-06T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-05T17:05:00',
      end: '2023-12-05T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
        /////////////////////////////////////
        {
          id: createEventId(),
          title: '',
          start: '2023-12-04T18:35:00',
          end: '2023-12-04T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-09T18:35:00',
          end: '2023-12-09T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-08T18:35:00',
          end: '2023-12-08T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-07T18:35:00',
          end: '2023-12-07T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-06T18:35:00',
          end: '2023-12-06T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-05T18:35:00',
          end: '2023-12-05T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
                /////////////////////////////////////
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-04T20:10:00',
                  end: '2023-12-04T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-09T20:10:00',
                  end: '2023-12-09T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-08T20:10:00',
                  end: '2023-12-08T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-07T20:10:00',
                  end: '2023-12-07T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-06T20:10:00',
                  end: '2023-12-06T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-05T20:10:00',
                  end: '2023-12-05T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
  /////////////////////////////////////
  {
    id: createEventId(),
    title: '',
    start: '2023-12-04T21:35:00',
    end: '2023-12-04T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-09T21:35:00',
    end: '2023-12-09T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-05T21:35:00',
    end: '2023-12-05T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-06T21:35:00',
    end: '2023-12-06T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-07T21:35:00',
    end: '2023-12-07T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-08T21:35:00',
    end: '2023-12-08T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },

  
]






