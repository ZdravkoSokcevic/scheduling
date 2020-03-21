const Room= require('../model/room');
const User= require('../model/user');
const response= require('./response');


exports.all= async(req,res)=> {
    let rooms= await Room.all();
    if(rooms)
        res.render('room.ejs',{rooms:rooms});
    res.redirect('/index');
}

exports.store= (req,res)=> {
    let data= req.body;
    Room.insert(data)
        .then(resolve=> {
            res.redirect('/room');
        })
        .catch(rejected=> {
            console.log(`Rejected ${JSON.stringify(rejected)}`);
        });
}

exports.delete= (req,res)=> {
    let id= req.query.id;
    Room.destroy(id).then((resolve,reject)=> {
        if(reject) {
            response.notFound(res);
        }else {
            res.redirect('/room');
        }
    });
}

exports.edit= async(req,res)=> {
    try{
        let data= req.body;
        if(!'name' in data || !'id' in req.params) 
            throw new Error('Incorrect data');
        await Room.edit(req.params.id,data);
        res.redirect('/room');
    }catch(err) {
        res.redirect('/room');
    }
}

exports.loadRoomsView= async(req,res)=> {
    let dentists= await User.dentists();
    let rooms= await Room.all();
    res.render('rooms.ejs',{dentists:dentists,rooms:rooms});
}

exports.loadAddRoomsView= (req,res)=> {
    res.render('room/add.ejs');
}

exports.loadEditView= async(req,res)=> {
    let id= req.params.id;
    if(id==null)
        res.redirect('/room');
    try{
        let room= await Room.findById(id);
        console.log(JSON.stringify(room));
        if(room)
            res.render('room/edit.ejs',{room:room[0]});
        else res.redirect('/room');
    }catch(err) {
        res.redirect('/room');
    }
}