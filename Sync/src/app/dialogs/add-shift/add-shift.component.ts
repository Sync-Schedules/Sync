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

  shift: any;
  venue: any;
  time: String;
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


   addShift() {

     const shift = {
       venue: this.venue,
       time: this.time,
       date: this.date,
     };

     console.log(this.venue);
    console.log('shift added');
     this.as.addShift(shift).subscribe(data => {
       if (data.success) {
         this.snackBar.open('shift created', '', {duration: 3000});
         this.dialog.closeAll();
         console.log(shift);
       } else {
         this.snackBar.open('Something went wrong', 'try again', {duration: 3000});
       }
     });
  }
}
