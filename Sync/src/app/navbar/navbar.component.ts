import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import { MatSnackBar}  from "@angular/material";
import { Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: Object;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });
  }

  onLogoutClick() {
  this.authService.logout();
  this.snackBar.open('you are now logged out', 'ok', {duration: 3000});
  this.router.navigate(['/login']);
  return false;
  }

}
