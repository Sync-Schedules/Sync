import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import { Shift} from "../../models/shift.model";
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatTableDataSource} from "@angular/material";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'app-add-shift',
  providers:[VenueService],
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

  venue: any;
  time: any;
  date: Date;


  constructor(private us: UserService,
              public dialog: MatDialog,
              private as: AuthService,
              private vs: VenueService,
              private snackBar: MatSnackBar,
              private router: Router,
              @Inject(MAT_DIALOG_DATA)public data: any) { }


  venues = [];

  times = ['9:00'];

  ngOnInit() {

    this.vs.getVenue().subscribe(data =>{
      this.venue = data;
      for (let i = 0; i < this.venue.length; i++ ) {
        this.venues.push(this.venue[i].name);
        console.log(this.venue[i].name);
        }
      } ,
      err =>{
        console.log(err);
        return false;
      });
  }
}
