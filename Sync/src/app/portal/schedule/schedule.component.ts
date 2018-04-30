import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {AddUserComponent} from "../../dialogs/add-user/add-user.component";
import { ConfirmDialogComponent} from "../../dialogs/delete-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {AddShiftComponent} from "../../dialogs/add-shift/add-shift.component";
import {errorObject} from "rxjs/util/errorObject";
import {VenueService} from "../../services/venue.service";


@Component({
  selector: 'app-schedule',
  providers: [VenueService],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  user: any;
  shift: any;
  venue: any;
  time: String;
  date: Date;
  open: boolean = false;
  djs = [];
  venues = [];
  shifts =[];


  constructor(public dialog: MatDialog,
              private us: UserService,
              private vs: VenueService,
              private as: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //GET DJ LIST
    this.us.getDJ().subscribe(data => {
      for(let i=0; i<data.length; i++){
        this.djs.push(data[i]);
      }
    });
    //GET VENUE LIST
    this.vs.getVenue().subscribe(data =>{
        this.venue = data;
        for (let i = 0; i < this.venue.length; i++ ) {
          this.venues.push(this.venue[i].name);
        }
      } ,
      err =>{
        console.log(err);
        return false;
      });
    //GET SHIFT LIST
    this.us.getShifts().subscribe(data =>{
      this.shift = data;
      for (let i=0; data.length; i++){
        this.shifts.push(this.shift[i].venue + ' / ' + this.shift[i].day + ' / ' +  this.shift[i].time)
      }

    });
    //GET PROFILE
    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });
  }

  openDialog(shift): void {
    let dialogRef = this.dialog.open(AddShiftComponent, {width: '500px'});

  }

  openPanel(){
    this.open= !this.open
  }
}
