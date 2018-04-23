import { Component, OnInit } from '@angular/core';
import { ValidateService} from "../services/validate.service";
import { AuthService} from "../services/auth.service";
import { MatSnackBar} from "@angular/material";
import { Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
    private router: Router
  ) { }

  roles = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Manager', viewValue: 'Manager'},
    {value: 'DJ', viewValue: 'DJ'}
  ];

  ngOnInit() {
  }


  onRegisterSubmit(){

    const user = {
      name: this.name,
      last: this.last,
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role
    };


    //Require fields

    if (!this.validateService.validateRegister(user)){
      this.snackBar.open('Please fill all fields', 'close', {duration:2000});
      return false;
    }

    //Validate Email

    if (!this.validateService.validateEmail(user.email)){
      this.snackBar.open('Please enter a valid email');
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.snackBar.open('You are now registered and can log in!', '', {duration: 3000});
        this.router.navigate(['/login']);
        console.log(user);
      } else{
        this.snackBar.open('Something went wrong', 'try again', {duration: 3000});
        this.router.navigate(['/register']);

      }
    });

    // console.log(user);

  }

}

