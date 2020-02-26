const Appointment= require('../model/appointment');
const User= require('../model/user');
const Room= require('../model/room');
const response= require('../controller/response');

exports.all= async(req,res)=> {
    try{
        let rooms= await Room.all();
        let dentists= await User.find('role','dentist');
        let appointments= await Appointment.all();
        res.render('appointments.ejs',{appointments:appointments,rooms:rooms,dentists:dentists});
    }catch(err) {
        console.log(err);
    }
}

exports.insert= (req,res)=> {
    let data= req.body;
    if(data instanceof Object) {
        console.log('Date from prije'+data.date_from);
        console.log('Date_to prije'+data.date_to);
        if(data.date_from!==null) {
            data.date_from= new Date(data.date_from);
        }
        if(data.date_to!==null) {
            data.date_to= new Date(data.date_to);
        }
        Appointment.insert(data).then((resolve,reject)=> {
            if(reject) {
                response.unprocessed(res);
            }else {
                response.ok(res);
            }
        });
    }else {
        response.notFound(res);
    }
}

exports.delete= (req,res)=> {
    let id= req.params.id;
    res.header({'Content-Type':'application/json'});
    if(id==null) {
        response.notFound(res);
    }else {
        Appointment.delete(id).then(done=> {
            if(!done) {
                response.notFound(res);
            }else {
                response.ok(res);
            }
        });
    }
}

exports.loadById= (req,res)=> {
    let id= req.params.id;
    Appointment.findById(id).then((row,rejection)=> {

    });
}


exports.request= (req,res)=> {
    let data= req.body;
    if(!('dentist_id' in data) || !('patient_id' in data) || !('room_id' in data) ) {
        response.notFound(res);
    }else {
        User.findById(data.dentist_id).then(dentist=> {
            if(dentist==null) {
                response.notFound(res);
            }else {
                if(dentist.role!=='doctor') {
                    response.notFound(res);
                }else {
                    User.findById(data.patient_id).then(patient=> {
                        if(patient.role!=='user') {
                            response.notFound(res);
                        }else {
                            Room.findById(data.room_id).then(room=> {
                                if(room==null) {
                                    response.notFound(res);
                                }else {
                                    Appointment.insert(data).then(done=> {
                                        if(done==null) {
                                            response.notFound(res);
                                        }else {
                                            response.ok(res);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        })
    }
    User.findById()
}

exports.allJson= async(req,res)=> {
    let appointments= await Appointment.all();
    let data=[];
    res.end(JSON.stringify(appointments));
}
