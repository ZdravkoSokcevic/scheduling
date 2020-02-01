let global_time_events=[{
    start: '2020-02-02T12:00',
    end: '2020-02-02T15:00',
    eventColor:'red'
  },
  {
    start: '2020-02-02T14:00',
    end: '2020-02-02T17:00',
    eventColor: 'yellow'
  }]

document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");

  let switchToTimeView= (calendar,date_to_jump)=> {
    // let moment= new moment();
    let date=moment(date_to_jump);
    let events= global_time_events;
    calendar.changeView('timeGrid','agenda', {
      start: date_to_jump,
      end: date_to_jump,
      gotoDate: date_to_jump,
      date: date_to_jump
    }).FullCalendar('gotoDate',date_to_jump);
    // calendar.fullCalendar( 'gotoDate', date_to_jump );
    calendar.render();
    console.log('Kliknuo si '+date_to_jump.dateStr);
  }
  let handleDateSelected= (date)=> {
    console.log(`selektovao si ${date.startStr}`);
  }

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid", "bootstrap", "list", "interaction", 'timeGrid'],
    height: "parent",
    locale: "sr",
    themeSystem: "bootstrap",
    defaultDate: new Date(),
    editable: true,
    selectable: true,
    displayEventTime:true,
    events:[{
          id: 1,
          title: 'Business Lunch',
          start: '2020-02-02T13:00:00',
          end: '2020-02-02T14:00',
          constraint: 'businessHours',
          color:'green'
    }, {
        id:2,
        title: 'Business other',
        start: '2020-02-04T11:00:00',
        end: '2020-02-04T14:00',
        constraint: 'businessHours2',
        color:'yellow'
    }],
    dateClick: (date)=> {
      // console.log(calendar.changeView);
      switchToTimeView(calendar,date);
      // calendar.changeView('gotoDate',date);
    },
    select: (date)=> {
      handleDateSelected(date);
    },
    eventClick: (event, element)=> {
      console.log(event.event.id);
      console.log('Klikno si na element');
    }
  });



    // setTimeout(calendar.render(),500);
  calendar.render();
});
