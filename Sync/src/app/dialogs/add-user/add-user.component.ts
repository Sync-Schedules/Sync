import { Component, OnInit } from '@angular/core';
import { ValidateService} from "../../services/validate.service";
import { AuthService} from "../../services/auth.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import { Router} from "@angular/router";
import {MailerService} from "../../services/mailer.service";

@Component({
  selector: 'app-add-user',
  providers:[MailerService],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: any;
  name: String;
  last: String;
  username: String;
  email: String;
  password: String;
  role: String;


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private mail: MailerService
  ) { }

  roles = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Manager', viewValue: 'Manager'},
    {value: 'DJ', viewValue: 'DJ'}
  ];

  managerViewRoles = [
    {value: 'Manager', viewValue: 'Manager'},
    {value: 'DJ', viewValue: 'DJ'}
    ];

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });
  }


  sendEmail(){
    const mail = {
      name: this.name,
      last: this.last,
      username: this.username,
      password: this.password,
      email: this.email,
      message: this.username,
      role: this.role
    };

    console.log('!!!!MAILING!!!' + this.name, this.last, this.role);
    this.mail.sendEmail(mail).subscribe(data => {
      console.log(mail);
      //
      // if (data.success) {
      //   this.snackBar.open('Email Sent', '', {duration: 3000});
      //   this.dialog.closeAll();
      //   console.log(mail);
      // } else {
      //   this.snackBar.open('Something went wrong', 'try again', {duration: 3000});
      // }
    });
  }
  onRegisterSubmit() {


    const user = {
      name: this.name,
      last: this.last,
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role,
      availability: []
    };


    //Require fields

    if (!this.validateService.validateRegister(user)) {
      this.snackBar.open('Please fill all fields', 'close', {duration: 2000});
      return false;
    }

    //Validate Email

    if (!this.validateService.validateEmail(user.email)) {
      this.snackBar.open('Please enter a valid email');
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.snackBar.open('Registration Successful', '', {duration: 3000});
         this.dialog.closeAll();
        this.sendEmail();
        console.log(user);
      } else {
        this.snackBar.open('Something went wrong', 'try again', {duration: 3000});
        }
    });


    // console.log(user);
  }

}
