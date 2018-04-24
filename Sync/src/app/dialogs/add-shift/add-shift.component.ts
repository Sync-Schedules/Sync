import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

  dj: String;
  venue: String;
  date: Date;
  time: String;
  user: User[];

  constructor(private us: UserService) { }

  djs = [
    {value: '001', viewValue: 'John'},
    {value: '002', viewValue: 'Tom'},
    {value: '003', viewValue: 'April'}
  ];

  venues = [
    {value: '001', viewValue: 'Valley Park'},
    {value: '002', viewValue: 'Hampton'},
    {value: '003', viewValue: 'Main'}
  ];

  times = [
    {value: '9', viewValue: '9:00pm'}
  ];

  ngOnInit() {
    this.us.getUser();
    console.log(this.user);
  }



}
