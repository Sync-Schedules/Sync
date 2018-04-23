
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private as:AuthService, private r: Router, private snack: MatSnackBar){

  }

  canActivate(){
    if(this.as.loggedIn()){
      return true;
    }else{
      this.r.navigate(['/login']);
      this.snack.open('You must be logged in to see this', '', {duration:3000})
      return false;
    }
  }
}
