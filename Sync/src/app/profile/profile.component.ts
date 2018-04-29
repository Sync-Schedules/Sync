import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { Router } from "@angular/router";
import {isDate} from "moment";
import {EditUserComponent} from "../dialogs/edit-user/edit-user.component";
import {MatDialog, MatSnackBar} from "@angular/material";

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
  date = new Date();
  minDate = (this.date);
  constructor(
    private as: AuthService,
    private r: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.as.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err =>{
      console.log(err);
      return false;
      });
    console.log(this.date);
  }

  getColor(user){
    switch(user){
      case 'Admin':
        return 'purple';
      case 'Manager':
        return 'green';
      case 'DJ':
        return '#0BA5DB';

    }
  }

  toggle()
  {
    console.log(this.checked);
  }

  onSubmit(){
this.checked= !this.checked
  }

  updateUser(user){

    console.log(user, user._id, user.name, user.last);
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {
        id: user._id,
        name: user.name,
        last: user.last,
        username: user.username,
        email: user.email,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = {
        name: result.name,
        last: result.last,
        email: result.email,
        username: result.username,
      } ;
      this._id = result.id;

      // console.log('updated user: ' + this.user + ',' + this.id + ',' +this.name + ',' + this.last + ',' + this.username + ',' + this.email + ',' + this.role);
      this.as.updateUser(result.id, this.user)
        .subscribe(data => {
          if (data.success){
            this.snackBar.open('user has been updated!' , 'Cool', {duration: 2000});
            this.dialog.closeAll();
            this.ngOnInit();
          }
          else{
            this.snackBar.open('something went wrong');
          }
        })

    });
  }



}
