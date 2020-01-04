
exports.notFound= res=> {
    this.setHeaders(res);
    res.statusCode= 404;
    res.end(JSON.stringify({message:'not found'}));
}

exports.unauthorized= res=> {
    this.setHeaders(res);
}

exports.unprocessed= res=> {
    this.setHeaders(res);
    res.statusCode= 422;
    res.end(JSON.stringify({message:'Cannot insert'}));
}

exports.ok= res=> {
    this.setHeaders(res);
    res.statusCode= 200;
    res.end(JSON.stringify({message:'ok'}));
}

exports.setHeaders= res=> {
    res.header({'Content-Type':'application/json'});
}