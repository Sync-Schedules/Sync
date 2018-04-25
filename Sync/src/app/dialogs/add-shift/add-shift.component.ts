import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import { Shift} from "../../models/shift.model";
import {MatDialog, MatSnackBar, MatTableDataSource} from "@angular/material";
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

  user:any;
  venue: any;
  dj: String;
  time: any;
  date: Date;
  name: string;
  last: string;
  username: string;
  email: string;
  role: string;
  list: any;


  constructor(private us: UserService,
              public dialog: MatDialog,
              private as: AuthService,
              private vs: VenueService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  djs = [];

  venues = [];

  times = ['9:00'];

  ngOnInit() {
    this.as.getDJ().subscribe(profile => {
      this.user = profile;
        for (let i = 0; i < this.user.length; i++ ){
          this.djs.push(this.user[i].username);
          console.log(this.user[i].username);
        }
      },
      err =>{
        console.log(err);
        return false;
      });

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

onClick(){
    console.log(this.dj);
}

addShift(){
  const shift = {
    dj: this.dj,
    venue: this.venue,
    time: this.time,
    date: this.date,
  };

  this.as.addShift(shift).subscribe(data =>{
    if(data.success){
      this.snackBar.open('Shift Created!', '', {duration: 3000});
      this.dialog.closeAll();
      console.log(shift);
    } else{
      this.snackBar.open('Something went wrong', 'try again', {duration: 3000});
    }
  });
}


}
