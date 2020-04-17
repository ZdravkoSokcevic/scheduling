


// Appointment insert form validate
let appointmentInsertValidate= e=> {
}

let fillNeccessaryDates= (e, data ) => {
    let INVERT_FORMAT= 'DD-MM-YYYY HH:mm';
    let GOOD_FORMAT= 'MM-DD-YYYY HH:mm';
    // e.preventDefault();
    if(!('visible' in data) || !('from' in data) || !('to' in data))
        return;
    let {visible, from, to} = data;

    let from_visible= visible.val();
    let date_from= from_visible;
    let date_to= to.val();
    if(date_from!==null) {
        let moment_date_from= moment(date_from,INVERT_FORMAT);
        from.val(moment_date_from.format(GOOD_FORMAT));
        let halfHourBehind= moment_date_from.add(moment.duration(0.5, 'hour')).format(GOOD_FORMAT);
        to.val(halfHourBehind);
    }
}
let submitAppointmentModal= e=> {
    let data= {
        visible: $('#select_appointment_date_from_visible'),
        from: $('#select_appointment_date_from'),
        to: $('#select_appointment_date_end_time')
    }
    fillNeccessaryDates(e, data);
    Globals.userAppointmentModalForm.unbind('submit').submit();
}

let submitAppointmentEditModal= e=> {
    let data= {
        visible: Globals.userEditTimeFromVisible,
        from: Globals.userEditTimeFrom,
        to: Globals.userEditTimeTo
    }
    fillNeccessaryDates(e, data);
    Globals.userAppointmentEditModalForm.unbind('submit').submit();
}


let checkIsDentistFree= (e, data)=> {
    fillNeccessaryDates(e, data);
    let form_data= {
        date_from: data.from.val(),
        date_to: data.to.val(),
        dentist_id: data.dentist_id.val()
    }
    $.ajax({
        type: "POST",
        url: "/appointment/checkTermin",
        data: form_data,
        dataType: "json",
        success: function (response) {
            if(!response.message) 
                data.submitButton.prop('disabled', true);
            else data.submitButton.prop('disabled', false);
        }
    });
}

let checkIsDentistFreeEdit= e => {
    let data= {
        visible: Globals.userEditTimeFromVisible,
        from: Globals.userEditTimeFrom,
        to: Globals.userEditTimeTo
    }
    fillNeccessaryDates(e, data);
}

let appointmentInsertValidateAndShow= (e)=> {
    // Disable on click on button in modal
    $(e.target).modal('show');
}