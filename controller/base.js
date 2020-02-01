const router= require('express').Router();
const Announcement= require('../model/announcement');
exports.index= (req,res)=> {
    let data={};
    Announcement.all()
        .then(data=> {
            
            res.render('index.ejs',{announcements:data});
        })
        .catch(err=> {
            throw new Error('sdfsdg');
        });
}