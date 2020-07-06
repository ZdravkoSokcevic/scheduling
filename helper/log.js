const path = require('path');
const fs = require('fs');
const util = require('util');

var _log_name = null;
var __stream = null;
var __setuped = false;
exports.constructor = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    this._log_name = dd + '_' + mm + '_' + yyyy + '.log';
    if(!this.__setuped)
        this.setup();
}
exports.setupStream = function () {

    /*Put into stream prop writable steram 
    * with path to today's file
    */
    try {
        // this.__stream = fs.createWriteStream(this._log_name, {flags: 'a'});
    }catch($e) {
        throw new Error($e);
    }
}
exports.setupLogFile = function () {

    let p = path.join(__dirname + '/../logs/');
    this._log_name = p + this._log_name;
    
}
exports.setup= function () {
    if(!this.__setuped) {
        this.setupLogFile();
        this.setupStream();
    }
    this.__setuped = true;
}
exports.log = function (mess) {
    if(!this.__setuped)
        this.constructor();

    /**
        First check if stream is null
        that means that constructor is not called
    */
    if(this.__stream == null || !this.__setuped) 
        this.setup();

    this.append("****************************");
    this.append(new Date());
    this.append("****************************");
    this.append(mess);
    this.append("******************************");
    this.__stream = null;
};

exports.append = data => {
    if(typeof data === 'string') 
        fs.appendFileSync(this._log_name, "\n" + data, {"flags": "a+"});
    else fs.appendFileSync(this._log_name, "\n" + util.inspect(data), {"flags": "a+"});

}

