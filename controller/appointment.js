const moment= require('moment');
const Appointment= require('../model/appointment');
const User= require('../model/user');
const Room= require('../model/room');
const response= require('../controller/response');
const Auth= require('./auth');

exports.all= async(req,res)=> {
    /**
     * ----------------------------------------------------------------
     *  Ovdje treba provjera zavisno od role korisnika
     *  Ako je doktor u pitanju pokazati mu i pending,
     *  ako je admin onda pokazati sve,
     *  a ako je korisnik pokazati mu samo odobrene
     * ----------------------------------------------------------------
     */
    try{
        let user= await Auth.getUser(req,res);
        let rooms= await Room.all();
        let dentists= await User.find('role','dentist');
        let appointments;
        if(user==undefined || !user)
            appointments= await Appointment.unregistered();
        else if(user.role=='admin')
            appointments= await Appointment.all();
        else if(user.role=='dentist')
            appointments= await Appointment.getForDoctor(user);
        else if(user.role=='patient')
            appointments= await Appointment.getForUser(user);
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


exports.request= async(req,res)=> {
    let data= req.body;
    if(!('dentist_id' in data)) {
        req.flash('code', 404);
        req.flash('message', 'Doktor nije pronadjen');
        res.redirect('/appointment');
    }else {
        let user= await Auth.getUser(req, res);
        if(user==null || user==undefined) {
            req.flash('code', 404);
            req.flash('message', 'Ulogujte se');
            res.redirect('/login');
        }
        let dentist= await User.findById(data.dentist_id);
        if(dentist==null || dentist==undefined) {
            req.flash('code',200);
            req.flash('message','Nedozvoljena operacija');
            res.redirect('/appointment');
        }
        if(dentist.role!=='dentist') 
            res.redirect('/appointment');
        
        let patient_id= data.patient_id || user.id;
        let patient= await User.findById(patient_id);
        if(patient==null || patient.role!=='patient');
            res.redirect('/appointment');

        let date_from= new Date(data.date_from);
        let date_to= new Date(data.date_to);
        data.date_from= date_from;
        data.date_to= date_to;
        data.patient_id= patient_id;

        let room= ('room' in data) ? data.room : '';
        
        let success= await Appointment.insert(data);
        if(success==null) {
            req.flash('code',500);
            req.flash('message','Nije moguce sacuvati,pokusajte kasnije');
            res.redirect('/appointment');
        }

        req.flash('code',200);
        req.flash('message', 'Uspesno ste poslali zahtev.');
        res.redirect('/appointment');
    }
}

exports.isDentistFreeCheck= async(req,res)=> {
    res.setHeader('Content-Type','application/json');
    let obj= {};
    console.log(req.body);
    Object.assign(obj,{date_from, date_to, dentist_id}= req.body);
    if(date_from==undefined || date_to==undefined || dentist_id==undefined || isNaN(parseInt(dentist_id,10))) {
        res.end(JSON.stringify({message:false}));
    }
    let free= await Appointment.checkDentistFreeTermin(obj);
    // console.log(`Free: ${free}`);
    if(free)
        res.end(JSON.stringify({message:true}));
    else res.end(JSON.stringify({message:false}));
}

exports.allJson= async(req,res)=> {
    let appointments= await Appointment.all();
    let data=[];
    res.end(JSON.stringify(appointments));
}
