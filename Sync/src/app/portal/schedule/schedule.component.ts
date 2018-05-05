import {Component, OnInit, Output, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {AddUserComponent} from "../../dialogs/add-user/add-user.component";
import { ConfirmDialogComponent} from "../../dialogs/delete-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import { Shift } from "../../models/shift.model";
import {AuthService} from "../../services/auth.service";
import {AddShiftComponent} from "../../dialogs/add-shift/add-shift.component";
import {errorObject} from "rxjs/util/errorObject";
import {VenueService} from "../../services/venue.service";
import {CalendarDate} from "../../shared/sync-calendar/sync-calendar.component";
import * as moment from "moment";

export interface Schedule {
  shift: Shift;
  dj?: String;
}
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

  dj: any;

  emptyshifts = [];
  shiftsv =[];
  shiftst =[];
  shiftsdt = [];
  shiftsdj=[];
  shifthd=['Venue', 'Time', 'Date', 'DJ'];

  schedule: Schedule[] = [];

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
      this.dj = data;
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
        this.shiftsv.push(this.shift[i].venue);
        this.shiftst.push(this.shift[i].time);
        this.shiftsdt.push(this.shift[i].day);
        this.shiftsdj.push(this.shift[i].dj);
        if(this.shift[i].dj === ""){
          this.emptyshifts.push(this.shift[i].venue + ' // ' + this.shift[i].day + ' // ' + this.shift[i].time)
          console.log(this.emptyshifts);
        }
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

  getSchedule(){
    console.log(this.shift);
    console.log(this.dj);
}
  openPanel(){
    this.open= !this.open
  }

  refresh(){
    window.location.reload();
  }
}

// ====================================================================================================//
// ------------------------------------VIEW AVAILABILITY---------------------------------------------- //
// ====================================================================================================//

@Component({
  selector: 'view-avail',
  providers: [VenueService],
  templateUrl: './view-avail.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ViewAvailability implements OnInit {

  open: boolean = false;
  monday = [];
  tuesday = [];
  wednesday = [];
  thursday = [];
  friday = [];
  saturday = [];
  sunday = [];
  djs =[];
  user:any;

  constructor(private us: UserService, private as: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.us.getDJ().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.monday.push(data[i].monday);
        this.tuesday.push(data[i].tuesday);
        this.wednesday.push(data[i].wednesday);
        this.thursday.push(data[i].thursday);
        this.friday.push(data[i].friday);
        this.saturday.push(data[i].saturday);
        this.sunday.push(data[i].sunday);
        this.djs.push(data[i].name + ' ' + data[i].last);
      }
    });
    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });
  }

  addShift(){
    let dialogRef = this.dialog.open(AddShiftComponent, {width: '500px'});  }

  openPanel() {
    this.open = !this.open
  }
}

