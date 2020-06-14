let getUser= ()=> {
  let loggIn= localStorage.getItem('loggedIn');
  if(loggIn)
    return JSON.parse(loggIn);
  else return null;
}

const isUserLoggedIn= ()=> {
  let usr= getUser();
  return (usr)?true:false;
}

const isGuest= ()=> {
  return !isUserLoggedIn();
}

const isDentistLoggedIn= ()=> {
  let usr= getUser();
  return (usr && usr.role=='dentist')?true:false;
}

const isAdminLoggedIn= ()=> {
  let usr= getUser();
  return (usr && usr.role=='admin')?true:false;
}
