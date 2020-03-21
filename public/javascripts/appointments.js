var Globals= {};
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
  // console.log(isAdminLoggedIn());
  /*
  |------------------------------------------------
  | Depends of user role show different modals
  |------------------------------------------------
  */

  //  ToDo validate form on loading
  //  and disable buttons
  if(isAdminLoggedIn()) {
    console.error('Adminova rola');
    $('#select_working_date').attr('value',moment(date).format('DD-MM-YYYY HH:mm'));
    // $('#selected_working_date')
    $('#single_date_modal').trigger('focus');
    $('#single_date_modal').modal('show');
  }else if(isDentistLoggedIn()) {
    $dentist_modal= $('#dentist_modal');
    $dentist_modal.trigger('focus');
    $dentist_modal.modal('show');
  }else if(isUserLoggedIn()) {
    console.log(date);
    $date_from= $('#select_appointment_date_from');
    $date_to= $('#select_appointment_date_end_time');
    Globals.userTimeFrom.val(moment(date).format(Globals.INVERT_FORMAT));
    Globals.userTimeFrom.data('good_format',moment(date).format(Globals.GOOD_FORMAT));
    let HalfHourAfter= moment(date).add(moment.duration(0.5,'hour'));
    Globals.userTimeTo.val(HalfHourAfter.format(Globals.INVERT_FORMAT));    
    Globals.userTimeTo.data('good_format',HalfHourAfter.format(Globals.GOOD_FORMAT));
    Globals.singleTimeModal.trigger('focus');
    Globals.singleTimeModal.modal('show');
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
        show_form(calendar,date.dateStr);
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

/**
 * ---------------------------------------------------------------
 *  Entry point for appointment page
 * ---------------------------------------------------------------
 */
window.onload= ()=> {
  //  Selectors for user time modal
  Globals.singleTimeModal= $('#single_time_modal');
  Globals.userTimeFrom= $('#select_appointment_date_from');
  Globals.userTimeTo= $('#select_appointment_date_end_time');

  Globals.dentistModal= $('#dentist_modal');
  
  // selectors to inver time from user friendly time
  // to backend compatibile time
  Globals.INVERT_FORMAT= 'DD-MM-YYYY HH:mm';
  Globals.GOOD_FORMAT= 'MM-DD-YYYY HH:mm';

  //Globals.singleTimeModal.on('show.bs.modal',(e)=> appointmentInsertValidateAndShow(e));
  $('#appointment_btn').click((e)=> appointmentInsertValidate(e));
  console.error('usao ovdje');
  initializeDatetimePicker();
}
