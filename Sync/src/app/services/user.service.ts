import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";

@Injectable()
export class UserService {

  private serviceUrl = 'http://localhost:3000/users/users';
  private DjsURL = 'http://localhost:3000/users/djs';

  constructor(private http: HttpClient) { }



  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }

  getDJ(): Observable<User[]>{
    return this.http.get<User[]>(this.DjsURL)
  }

}


