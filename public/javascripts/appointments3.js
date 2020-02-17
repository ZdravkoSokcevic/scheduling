$(document).ready(()=> {
	$('#calendar').fullCalendar({
		header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay',
            height: 650
        },
        editable: true,
        defaultView: 'basicWeek',
	});
})