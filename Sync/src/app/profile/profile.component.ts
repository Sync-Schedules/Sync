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
  checked:boolean = false;



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

  toggle()
  {
    console.log(this.checked);
  }

  onSubmit(){
this.checked= !this.checked
  }


}
