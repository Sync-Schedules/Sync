import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'app-select-dj',
  templateUrl: './select-dj.component.html',
  styleUrls: ['./select-dj.component.scss']
})
export class SelectDjComponent implements OnInit {

  constructor(private us: UserService,
              public dialog: MatDialog,
              private as: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              @Inject(MAT_DIALOG_DATA)public data: any) { }

  djs = [];
  dj:any;

  ngOnInit() {
    this.us.getDJ().subscribe(data => {
      for(let i=0; i<data.length; i++){

        this.djs.push(data[i].username);
      }
    });

    console.log(this.data.dj)
  }

}
