import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-portal-home',
  templateUrl: './portal-home.component.html',
  styleUrls: ['./portal-home.component.scss']
})
export class PortalHomeComponent implements OnInit {

  user: Object;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });
  }
}
