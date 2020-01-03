const Appointment= require('../model/appointment');

exports.all= (req,res)=> {
    Appointment.all().then(results=> {
        res.statusCode= 200;
        res.end(JSON.stringify(results));
    });
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
        console.log('Date from poslije'+data.date_from);
        console.log('Date_to poslije'+data.date_to);
        Appointment.insert(data).then((resolve,reject)=> {
            if(reject) {
                res.statusCode= 500;
                res.end(JSON.stringify({message:'Cannot insert'}));
            }else {
                res.statusCode= 200;
                res.end(JSON.stringify({message:'success'}));
            }
        });
    }
}

exports.delete= (req,res)=> {
    let id= req.params.id;
    res.header({'Content-Type':'application/json'});
    if(id==null) {
        res.statusCode= 404;
        res.end(JSON.stringify({message:'not found'}));
    }else {
        Appointment.delete(id).then(done=> {
            if(!done) {
                res.statusCode= 404;
                res.end(JSON.stringify({message:'failed'}));
            }else {
                res.statusCode= 200;
                res.end(JSON.stringify({message:'success'}));
            }
        });
    }
}

exports.loadById= (req,res)=> {
    let id= req.params.id;
    Appointment.findById(id).then((row,rejection)=> {
        
    });
}