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
    Globals.userTimeFromVisible.val(moment(date).format(Globals.INVERT_FORMAT));
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

    console.error('Events api:');
    arr.forEach(appointment=> {
      let object={
          id: appointment.id,
          title: 'afgdsag', //moment(appointment.date_from).format(Globals.TIME_FORMAT),
          start: appointment.date_from,
          end: appointment.date_to,
          color:'red',
          eventColor:'red',
          displayEventTime: false
      }
      console.log(object);
      calendar.addEvent(object);
    });
  });
}

let addData= (calendar=false)=> {
  let ev_arr=[];
  // loggedInUser
  let user= getUser();
  if(user==null) {
    user= {};
    user.role= 'guest';
  }
  Globals.pendingColor= '#0000aa';
  Globals.approvedColor= '#05ff05';
  Globals.unapprovedColor= '#ff0505';
  all_ev.forEach(appointment=> {
    let object={
        id: appointment.id,
        title: 'afgdsag', //moment(appointment.date_from).format(Globals.TIME_FORMAT),
        start: moment(appointment.date_from).format(Globals.GOOD_FORMAT),
        end: moment(appointment.date_to).format(Globals.GOOD_FORMAT),
        color:'blue',
        eventColor:'blue',
        displayEventTime: false,
        status: appointment.status
    }
    switch(user.role)
    {
      case 'admin':
      {
        if(object.status=='pending' || object.status=='')
            object.color= object.eventColor= Globals.pendingColor;
        else if(object.status== 'approved')
          object.color= object.eventColor= Globals.approvedColor;
        else if(object.status== 'unapproved')
          object.color= object.eventColor= Globals.unapprovedColor;
        else object.color= 'blue';
        break;
      }
      case 'dentist':
      {
        if(object.status=='pending' || object.status=='')
        object.color= object.eventColor= Globals.pendingColor;
        else if(object.status== 'approved')
          object.color= object.eventColor= Globals.approvedColor;
        else if(object.status== 'unapproved')
          object.color= object.eventColor= Globals.unapprovedColor;
        else object.color= 'blue';
        break;
      }
      case 'patient':
      {
        if(object.status=='pending' || object.status=='')
          object.color= object.eventColor= Globals.pendingColor;
        else if(object.status== 'approved')
          object.color= object.eventColor= Globals.approvedColor;
        else if(object.status== 'unapproved')
          object.color= object.eventColor= Globals.unapprovedColor;
        else object.color= 'blue';
        break;
      }
      case 'guest': 
      {
        if(object.status=='pending' || object.status=='')
          object.color= object.eventColor= Globals.pendingColor;
        else if(object.status== 'approved')
          object.color= object.eventColor= Globals.approvedColor;
        else if(object.status== 'unapproved')
          object.color= object.eventColor= Globals.unapprovedColor;
        else object.color= 'blue';
        break;
      }
    }
    console.log(object);
    ev_arr.push(object);
  });
  return ev_arr;
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
    events: addData(),
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
  console.error('Config');
  console.log(config);
  var calendar = new FullCalendar.Calendar(calendarEl, config);
  Globals.calendar= calendar;
  $('#calendar').attr('fullCalendar',calendar);
  // Fetch data asynchronous using Ajax
  //fetchData(calendar);
  //addData(calendar);
  // console.log(calendar);
  // fillEvents(calendar);
  calendar.render();
});

/**
 * ---------------------------------------------------------------
 *  Entry point for appointment page
 * ---------------------------------------------------------------
 */
window.onload= ()=> {
  Globals.calendarEl= $('#calendar');
  //  Selectors for user time modal
  Globals.singleTimeModal= $('#single_time_modal');
  Globals.singleTimeModalForm= $('#single_time_modal_form');
  Globals.userTimeFromVisible= $('#select_appointment_date_from_visible')
  Globals.userTimeFrom= $('#select_appointment_date_from');
  Globals.userTimeTo= $('#select_appointment_date_end_time');
  Globals.appointmentButton= $('#appointment_btn');
  Globals.dentistModal= $('#dentist_modal');
  
  
  // selectors to inver time from user friendly time
  // to backend compatibile time
  Globals.INVERT_FORMAT= 'DD-MM-YYYY HH:mm';
  Globals.GOOD_FORMAT= 'MM-DD-YYYY HH:mm';
  Globals.TIME_FORMAT= 'HH:mm';
  Globals.TIME_ICON= '<i fa fa-time></i>'; 



  //Globals.singleTimeModal.on('show.bs.modal',(e)=> appointmentInsertValidateAndShow(e));
  $('#appointment_btn').click((e)=> submitAppointmentModal(e));
  initializeDatetimePicker();
}
