window.onload= ()=> {
  $date=$('#select_appointment_date').datetimepicker({
    format: 'dd-mm-yyyy hh:ii',
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
    },
    daysOfWeekDisabled: [0, 6],
    inline: true,
    sideBySide: true,
    showClose: true,
    disabledHours: [9, 10, 11, 12, 13, 14, 15, 16],
    autoclose:true,
    language: 'rs-latin',
    weekStart:1
  });
  // console.log(isUserLoggedIn());
  if(isUserLoggedIn()) {
    console.log(global_time_events);
    console.log('user je ');
    $date= $('#select_appointment_date').datetimepicker({
      // disabledTimeIntervals:[[moment({h:0}),moment({h:18})]]
    });
  }

  $date.change((e)=> {
    console.log('promjenjeno je');

  })
  console.log($date);
}
