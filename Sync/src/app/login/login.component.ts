import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service'
import { MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  role: String;

  constructor(
    public validateService: ValidateService,
    private snackBar: MatSnackBar,
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password,
      role: this.role
    };
    this.authService.authenticateUser(user).subscribe(data =>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.snackBar.open('You are now logged in', 'close', {duration:5000});
        this.router.navigate(['portal'])

      }else{
        this.snackBar.open(data.msg, 'close', {duration:5000});
        this.router.navigate(['/login']);
      }
    });
  };

}
