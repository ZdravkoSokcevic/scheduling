


// Appointment insert form validate
let appointmentInsertValidate= e=> {
    console.log('Validacija');
}

let fillNeccessaryDates= e=> {
    let INVERT_FORMAT= 'DD-MM-YYYY HH:mm';
    let GOOD_FORMAT= 'MM-DD-YYYY HH:mm';
    // e.preventDefault();
    let from_visible= $('#select_appointment_date_from_visible');
    let from= $('#select_appointment_date_from');
    let to= $('#select_appointment_date_end_time');
    let date_from_visible= from_visible.val();
    let date_from= date_from_visible;
    let date_to= to.val();
    if(date_from!==null) {
        let moment_date_from= moment(date_from,INVERT_FORMAT);
        from.val(moment_date_from.format(GOOD_FORMAT));
        let halfHourBehind= moment_date_from.add(moment.duration(0.5, 'hour')).format(GOOD_FORMAT);
        to.val(halfHourBehind);
    }
}
let submitAppointmentModal= e=> {
    fillNeccessaryDates(e);
    Globals.singleTimeModalForm.unbind('submit').submit();

}

let checkIsDentistFree= (e)=> {
    fillNeccessaryDates(e);
    let data= {
        date_from: $('#select_appointment_date_from').val(),
        date_to: $('#select_appointment_date_end_time').val(),
        dentist_id: document.getElementById('dentist_select').value
    }
    $.ajax({
        type: "POST",
        url: "/appointment/checkTermin",
        data: data,
        dataType: "json",
        success: function (response) {
            if(!response.message) 
                Globals.appointmentButton.prop('disabled', true);
            else Globals.appointmentButton.prop('disabled', false);
        }
    });
}

let appointmentInsertValidateAndShow= (e)=> {
    // Disable on click on button in modal
    $(e.target).modal('show');
}