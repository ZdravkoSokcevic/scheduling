let conf= {
    plugins: ["dayGrid", "bootstrap", "list", "interaction", 'timeGrid'],
    height: "parent",
    locale: "sb",
    // defaultView= "agendaWeek",
    themeSystem: "bootstrap",
    // defaultDate: tomorow,
    editable: true,
    selectable: true,
    displayEventTime:true
}

let events= [
    {
        id: 1,
        title: 'Business Lunch',
        start: '2020-02-02T13:00:00',
        end: '2020-02-02T14:00',
        constraint: 'businessHours',
        color:'green'
    },{
        id:2,
        title: 'Business other',
        start: '2020-02-04T11:00:00',
        end: '2020-02-04T14:00',
        constraint: 'businessHours2',
        color:'yellow' 
    }
]