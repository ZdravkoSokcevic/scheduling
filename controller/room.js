const Room= require('../model/room');
const response= require('./response');


exports.all= (req,res)=> {
    Room.all().then(result=> {
        res.header({'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
    });
}

exports.store= (req,res)=> {
    let data= req.body;
    Room.insert(data)
        .then((resolved,rejected)=> {
            if(rejected) {
                response.notFound(res);
            }else {
                response.ok(res);
            }
        });
}

exports.delete= (req,res)=> {
    let id= req.params.id;
    Room.destroy(id).then((resolve,reject)=> {
        if(reject) {
            response.notFound(res);
        }else {
            response.ok(res);
        }
    });
}