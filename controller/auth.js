const user= {
    "id": 3,
    "first_name": "Nikola",
    "last_name": "Snjegota",
    "email": "nikolasnjegota@mail.com",
    "username": "nikola123",
    "role": "admin",
    "phone": null,
    "profile_picture": null
}

exports.auth= ()=> {
    return (user!==null);
}

exports.admin= ()=> {
    return (this.auth() && user.role=='admin');
}

exports.dentist= ()=> {
    return (this.auth() && user.role=='doctor');
}

exports.patient= ()=> {
    return this.auth() && user.role=='user';
}

exports.getLoggedIn= ()=> {
    return (this.auth())?user:null;
}
