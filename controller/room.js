const Room= require('../model/room');


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
                res.statusCode= 404;
                res.header({'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Not found'}));
            }else {
                res.statusCode= 200;
                res.header({'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Success'}));
            }
        });
}

exports.delete= (req,res)=> {
    let id= req.params.id;
    Room.destroy(id).then((resolve,reject)=> {
        if(reject) {
            res.statusCode= 404;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'failed'}));
        }else {
            res.statusCode= 200;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'success'}));
        }
    });
}