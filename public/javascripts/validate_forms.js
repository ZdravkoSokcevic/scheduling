


// Appointment insert form validate
let appointmentInsertValidate= e=> {
    let INVERT_FORMAT= 'DD-MM-YYYY HH:mm';
    let GOOD_FORMAT= 'MM-DD-YYYY HH:mm';
    e.preventDefault();
    let from= $('#select_appointment_date_from');
    console.log(Globals.singleTimeModal);
    let to= $('#select_appointment_date_end_time');
    let date_from= from.val();
    let date_to= to.val();
    if(date_from!==null) {
        let moment_date_from= moment(date_from,INVERT_FORMAT).format(GOOD_FORMAT);
        from.val(moment_date_from);
        if(date_to!==null) {
            let moment_date_to= moment(date_to,INVERT_FORMAT);
            to.val(moment_date_to.format(GOOD_FORMAT));
        }else {
            let moment_date_to= moment_date_from.add(moment.duration(0.5,'hour'));
            to.val(moment_date_to.format(GOOD_FORMAT));
        }
        console.error(to.val());
        $('#single_time_modal').submit();
        // if(!date_to) {
        //     let start_date= moment(date)
        // }
        console.error();

    }else {
        // error handling
    }
}

let appointmentInsertValidateAndShow= (e)=> {
    // Disable on click on button in modal
    $(e.target).modal('show');
}