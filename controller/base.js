const router= require('express').Router();
const User= require('../model/user');
const Announcement= require('../model/announcement');


exports.index= (req,res)=> {
    let data={};
    Announcement.all()
        .then(data=> {
            if(req.user) {
              res.render('index.ejs',{announcements:data,loggedIn:req.user});
            }else res.render('index.ejs',{announcements:data});
        })
        .catch(err=> {
            throw new Error('sdfsdg');
        });
}
