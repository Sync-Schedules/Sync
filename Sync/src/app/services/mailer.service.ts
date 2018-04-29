import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MailerService {

  constructor(private http: Http) { }

  sendEmail(name, email, message){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/mailer/send', email, {headers: headers})
      .map(res => res.json());

  }
  // sendEmail (name, email, message) {
  //   fetch('http://localhost:3000/mailer/send', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       email: email,
  //       message: message
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log('here is the response: ', res);
  //     })
  //     .catch((err) => {
  //       console.error('here is the error: ', err);
  //     })
  // }
}
