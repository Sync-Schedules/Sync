import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Shift} from "../../models/shift.model";
import {AuthService} from "../../services/auth.service";
import {AddShiftComponent} from "../../dialogs/add-shift/add-shift.component";
import {ConfirmDialogComponent} from "../../dialogs/delete-dialog/confirm-dialog.component";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";
import {SelectDjComponent} from "../../dialogs/select-dj/select-dj.component";


@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],

})
export class ShiftsComponent implements OnInit {

  displayedColumns = ['venue', 'date', 'time', 'DJ','actions'];
  dataSource = new MatTableDataSource<Shift>();
  id: string;
  shift:any;
  venue: string;
  time: string;
  date: string;
  shifts =[];
  user: any;
  dj: string = '';

  constructor( public dialog: MatDialog,
               private us: UserService,
               private as: AuthService,
               private snackBar: MatSnackBar,
               private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
        if(this.user.role == 'DJ'){
          this.applyFilter(this.user.username)
        }
      },
      err =>{
        console.log(err);
        return false;
      });



    this.us.getShifts().subscribe(data => {
      this.dataSource.data = data;
      for(let i=0; i<data.length;i++){
        this.shifts.push(data[i]);
      }
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(filterValue);
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(AddShiftComponent, {width: '500px'});

  }

  onRowClicked(row){
    console.log('Row clicked: ', row);
    this.ngOnInit();
  }

  DeleteShift(_id) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {

      this.as.deleteShift(_id)
        .subscribe(data => {
          if (data.success) {
            this.ngOnInit();
            this.snackBar.open('User has been deleted', '', {duration: 3000});
          } else{
            this.snackBar.open('ERROR', '',{duration:2000} )
          }
        });

    });
  }

  updateShift(shift){

    console.log(shift, shift._id, shift.venue, shift.time, shift.day);
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {
        id: shift._id,
        venue: shift.venue,
        time: shift.time,
        day: shift.day,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.shift = {
        venue: result.venue,
        time: result.time,
        day: result.day
      } ;
      this.id = result.id;

      // console.log('updated user: ' + this.user + ',' + this.id + ',' +this.name + ',' + this.last + ',' + this.username + ',' + this.email + ',' + this.role);
      this.as.updateShift(result.id, this.shift)
        .subscribe(data => {
          if (data.success){
            this.snackBar.open('user has been updated!' , 'Cool', {duration: 2000});
            this.dialog.closeAll();
            this.ngOnInit();
          }
          else{
            this.snackBar.open('something went wrong');
          }
        })

    });
  }

  addDJ(shift) {
    let dialogRef = this.dialog.open(SelectDjComponent, {
      width: '500px',
      data:
        {
          id: shift._id,
          venue: shift.venue,
          time: shift.time,
          day: shift.day,
          dj: shift.dj
        }
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.shift = {
       dj : result.dj
      };
      console.log(result.dj);
      this.id = result.id;
      console.log(this.id);
      this.as.updateShift(result.id, this.shift)
        .subscribe(data => {
          if (data.success){
            this.snackBar.open(result.dj + ' assigned to: '+ result.venue
              +'!' , 'Cool', {duration: 2000});
            this.dialog.closeAll();
            this.ngOnInit();
          }
          else{
            this.snackBar.open('something went wrong');
          }
        })

    });


  }

  dropShift(shift){
    this.shift = {
      dj: this.dj
    };
    this.id = shift._id;
    this.as.updateShift(this.id, this.shift)
      .subscribe(data => {
        if (data.success){
          this.snackBar.open(shift.dj + 'has dropped shift at '+ shift.venue
            +'!' , 'Send Request');
          this.dialog.closeAll();
          this.sendRequest();
          this.ngOnInit();
        }
        else{
          this.snackBar.open('something went wrong');
        }
      })

  }

  sendRequest(){

  }



}
