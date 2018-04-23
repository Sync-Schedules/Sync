import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Object;
  _id: String;
  role: String;
  email: String;
  show: boolean = false;
  users: Object[];
  errorMessage: any;


  constructor(
    private as: AuthService,
    private r: Router,

  ) { }

  ngOnInit() {
    this.as.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err =>{
      console.log(err);
      return false;
      });
  }



}
