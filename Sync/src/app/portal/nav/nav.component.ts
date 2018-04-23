import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: any;
  role: "Admin";
  constructor(private as: AuthService) {
  }

  ngOnInit() {
    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.role = profile.role;
        },
      err => {
        console.log(err);
        return false;
      });
  }
}
