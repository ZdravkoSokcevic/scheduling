const Schedule= require('../model/schedule');
const response= require('./response');

exports.all= (req,res)=> {
    Schedule.all().then(results=> {
        if(results) {
            res.statusCode= 200;
            res.header({'Content-Type':'application/json'});
            res.end(JSON.stringify(results));
        }else {
            response.setHeaders(res);
            let data=[];
            res.end(JSON.stringify(data));
        }
    });
}

exports.insert= (req,res)=> {
    data=req.body;
    Schedule.insert(data).then(resolve=> {
        if(resolve) {
            response.ok(res);
        }else {
            response.notFound(res);
        }
    })
}

exports.delete= (req,res)=> {
    let id= req.params.id;
    Schedule.destroy(id).then(resolve=> {
        if(resolve) {
            res.ok(res);
        }else {
            res.notFound(res);
        }
    });
}