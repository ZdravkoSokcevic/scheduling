const moment= require('moment');
const Appointment= require('../model/appointment');
const User= require('../model/user');
const Room= require('../model/room');
const response= require('../controller/response');
const Auth= require('./auth');

exports.all= async(req,res)=> {
    try{
        let rooms= await Room.all();
        let dentists= await User.find('role','dentist');
        let appointments= await Appointment.all();
        console.log(appointments);
        res.render('appointments.ejs',{appointments:appointments,rooms:rooms,dentists:dentists});
    }catch(err) {
        console.log(err);
    }
}

exports.insert= (req,res)=> {
    let data= req.body;
    if(data instanceof Object) {
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
    if(!('dentist_id' in data)) {
        res.redirect('/appointment');
    }else {
        Auth.getUser(req,res).then(user=> {
            if(user==null && !'patient_id' in data) {
                res.redirect('/appointment');
            }else {
                User.findById(data.dentist_id).then(dentist=> {
                    if(dentist==null) {
                        req.flash('code',200);
                        req.flash('message','Nedozvoljena operacija');
                        res.redirect('/appointment');
                    }else {
                        if(dentist.role!=='dentist') {
                            res.redirect('/appointment');
                        }else {
                            let patient_id= data.patient_id || user.id;
                            User.findById(patient_id).then(patient=> {
                                if(patient.role!=='patient') {
                                    res.redirect('/appointment');
                                }else {
                                    console.log('Datum from to prije: ');
                                    console.log(data.date_from);
                                    console.log(data.date_to);
                                    let date_from= new Date(data.date_from);
                                    let date_to= new Date(data.date_to);
                                    data.date_from= date_from;
                                    data.date_to= date_to;
                                    data.patient_id= patient_id;
                                    console.log('Date from to poslije: ');
                                    console.log(date_from);
                                    console.log(date_to);
                                    if('room' in data) {
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
                                    }else {
                                        Appointment.insert(data).then(done=> {
                                            if(done==null) {
                                                req.flash('code',500);
                                                req.flash('message','Nije moguce sacuvati,pokusajte kasnije');
                                                res.redirect('/appointment');
                                            }else {
                                                console.log("Uspjesno je sacuvao appointment");
                                                req.flash('code',200);
                                                req.flash('message', 'Uspesno ste poslali zahtev.');
                                                res.redirect('/appointment');
                                            }
                                        });
                                    }
        
                                }
                            });
                        }
                    }
                });
            }
        });

    }
    User.findById()
}

exports.allJson= async(req,res)=> {
    let appointments= await Appointment.all();
    let data=[];
    res.end(JSON.stringify(appointments));
}
