const env = require('custom-env').env('dev');


let generateJWTSecret= ()=> {
    let x=0;
    let str='';
    while(x<60) {
        let num= Math.round(Math.random()*255).toString(36);
        str+= num;
        x++;
    }
    process.env['JWT_SECRET']= str;
    console.log(process.env.JWT_SECRET);
}

// generateJWTSecret();
module.exports=generateJWTSecret;