import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    return !(user.name == undefined || user.email == undefined || user.password == undefined);
  }
  validateAddVenue(venue){
    return !(venue.name == undefined || venue.email == undefined || venue.phone == undefined);
  }


  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  validateLogin(login){
    return !(login.username == undefined || login.email == undefined || login.password == undefined);
  }




}

