let global_time_events=[{
    start: '2020-02-02T12:00',
    end: '2020-02-02T15:00',
    color:'red'
  },
  {
    start: '2020-02-02T14:00',
    end: '2020-02-02T17:00',
    color: 'yellow'
}];
let currentView='month';

let show_form=(calendar,date)=> {
  // If user is logged in
  console.log(isAdminLoggedIn());
  /*
  |------------------------------------------------
  | Depends of user role show different modals
  |------------------------------------------------
  */
  if(isAdminLoggedIn()) {
    $('#single_time_modal').trigger('focus');
    $('#single_time_modal').modal('show');
  }else if(isDentistLoggedIn) {
    $('#dentist_modal').trigger('focus');
    $('#dentist_modal').modal('show');
  }else if(isUserLoggedIn()) {
    $('#single_date_modal').trigger('focus');
    $('#single_date_modal').modal('show');
  }
}
let fetchData= (calendar)=> {
  $.ajax({
    type: 'GET',
    url: '/appointment/all/json'
  }).then(response=> {
    let data= [];
    let arr= JSON.parse(response);

    arr.forEach(appointment=> {
      let object={
          id: appointment.id,
          title: 'Business Lunch2',
          start: appointment.date_from,
          end: appointment.date_to,
          color:'green',
          eventColor:'blue'
      }
      calendar.addEvent(object);
    });
  });
}

/*
|--------------------------------------------------------------------
| Calendar initialization
|--------------------------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");
  // var calendarEl= $('#calendar');
  let switchToTimeView= (calendar,date_to_jump)=> {
    let date=moment(date_to_jump,"DD-MM-YYYY").add(1,'DD-MM-YYYY');
    calendar.state.currentDate= date_to_jump.date;

    calendar.changeView('timeGridDay', date._i.dateStr);
    calendar.render();
    currentView='day';
  }
  let handleDateSelected= (date)=> {
    console.log(`selektovao si ${date.startStr}`);
  }
  /*
  |----------------------------------------------------------------------
  | Alertify conf
  |----------------------------------------------------------------------
  */
  // alertify.set({
  //   labels : {
  //     ok     : "OK",
  //     cancel : "Cancel"
  //   },
  //   delay : 5000,
  //   buttonReverse : false,
  //   buttonFocus   : "ok"
  // });
  // alertify.log('To je to', 'alert');
/*
|------------------------------------------------------------------------
| Calendar configuration
|------------------------------------------------------------------------
*/
  const config= {
    plugins: ["dayGrid", "bootstrap", "list", "interaction", 'timeGrid'],
    height: "parent",
    locale: "sb",
    themeSystem: "bootstrap",
    defaultDate: new Date(),
    editable: true,
    selectable: true,
    dropable:true,
    displayEventTime:true,
    events:all_ev,
    header: {
      right: 'prev,next danas',
      center: 'title',
      left: 'monthView'
    },
    customButtons: {
      danas: {
        text: 'Danas',
        click: ()=> {
          calendar.gotoDate(new Date());
        }
      },
      monthView: {
        text: 'Mesecni prikaz',
        backgroundColor: '#048698',
        click: ()=> {
          console.log('tu si');
          if(currentView=='day') {
            calendar.changeView('dayGridMonth');
            calendar.render();
            currentView='month';
          }
        }
      }
    },
    dateClick: (date)=> {
      let props= calendar.view;
      if(currentView=='month')
        switchToTimeView(calendar,date);
      else {
        show_form(calendar,date);
      }
    },
    eventRender:(event,element)=> {

    },
    select: (date)=> {
      handleDateSelected(date);
    },
    eventClick: (event, element)=> {
      if(isDentistLoggedIn())
      {
        console.log('doktor');
      }else if(isUserLoggedIn()) {

      }else {
        //guest, redirect to login
        window.location.href='/login';
      }
    }
  }

  if(isGuest()) {
    config.editable=false;
  }

  var calendar = new FullCalendar.Calendar(calendarEl, config);
  $('#calendar').attr('fullCalendar',calendar);
  fetchData(calendar);
  calendar.render();
});
