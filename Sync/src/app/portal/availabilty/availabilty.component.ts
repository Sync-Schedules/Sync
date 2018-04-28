import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-availabilty',
  templateUrl: './availabilty.component.html',
  styleUrls: ['./availabilty.component.scss']
})
export class AvailabiltyComponent implements OnInit {
  disabled = true;

  constructor(private as: AuthService) { }

  user: any;
  days = ['Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',];


  ngOnInit() {
    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });
  }

  enable(){
    this.disabled = false;
  }

  disable(){
    this.disabled = true;
  }
}
