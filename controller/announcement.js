const Announcement= require('../model/announcement');
const response= require('./response');

exports.all= async(req,res)=> {
    try{
        let data= await Announcement.all();
        res.render('announcements.ejs',{announcements:data});
    }catch(err) {
        console.log(err);
    }
}

exports.insert= async(req,res)=> {
	let validator= this.validate(req.body);
	let success=await Announcement.insert(req.body);
	res.redirect('/announcement');
}	

exports.delete= (req,res)=> {

}

exports.update= (req,res)=> {

}

exports.validate= data=> {
	if(!'content' in data)
		return false;
	return true;
}