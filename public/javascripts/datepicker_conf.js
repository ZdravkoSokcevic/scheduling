let dt_pick_conf= {
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
}

let initializeDatetimePicker= ()=> {
  $date=Globals.userTimeFromVisible.datetimepicker(dt_pick_conf).on('dp.change',e=> {
    console.log(e);
  });
  //  Handle changing datetimepicker date
  $date.on('change', function(e) {
    Globals.userTimeFromVisible.val(moment(e.target.value).format(Globals.INVERT_FORMAT));

    console.log('Promjenjeno je ');
  });

    $('#select_working_date').datetimepicker(dt_pick_conf);


  // if(isUserLoggedIn()) {
    // $date1= $('#select_appointment_date').datetimepicker({
    // });
    // $('#select_working_date').datetimepicker(dt_pick_conf);
  // }

  // $('#select_appointment_date_from').change((e)=> {
  //   // console.log(e.date);
  //   // console.log('promjenjeno je');

  // })
}
