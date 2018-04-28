import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import {Shift} from "../models/shift.model";

@Injectable()
export class UserService {

  private serviceUrl = 'http://localhost:3000/users/users';
  private DjsURL = 'http://localhost:3000/users/djs';
  private shiftUrl='http://localhost:3000/shifts/shifts';

  constructor(private http: HttpClient) { }



  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }

  getDJ(): Observable<User[]>{
    return this.http.get<User[]>(this.DjsURL);
  }

  getShifts(): Observable<Shift[]>{
    return this.http.get<Shift[]>(this.shiftUrl);
  }
}


