const Schedule= require('../model/schedule');

exports.all= (req,res)=> {
    Schedule.all().then(results=> {
        if(results) {
            res.statusCode= 200;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify(results));
        }else {
            res.statusCode= 500;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'Failed to fetch'}));
        }
    });
}

exports.insert= (req,res)=> {
    data=req.body;
    Schedule.insert(data).then(resolve=> {
        if(resolve) {
            res.statusCode= 200;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'success'}));
        }else {
            res.statusCode= 404;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'Failed'}));
        }
    })
}

exports.delete= (req,res)=> {
    let id= req.params.id;
    Schedule.destroy(id).then(resolve=> {
        if(resolve) {
            res.statusCode= 200;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'success'}));
        }else {
            res.statusCode= 404;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'failed'}));
        }
    });
}