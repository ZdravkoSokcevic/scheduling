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

exports.delete= async(req,res)=> {
	let id = req.query.id;
	
	if(id == null) {
		res.redirect('/announcement');
		return;
	}

	let success = await Announcement.delete(id).catch(e => {
		res.redirect('/announcement')
		return;
	});
	if(!success) {
		// Session flash message
		res.redirect('/announcement');
	}else res.redirect('/announcement');
}

exports.update= (req,res)=> {

}

exports.validate= data=> {
	if(!'content' in data)
		return false;
	return true;
}