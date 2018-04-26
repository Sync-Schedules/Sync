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


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  displayedColumns = ['name', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  dataSource = new MatTableDataSource<User>();
  id: string;
  user:any;
  name: string;
  last: string;
  username: string;
  email: string;
  role: string;
  shift: [{
    venue: any,
    date: Date,
    time: string
  }];




  constructor(
    public dialog: MatDialog,
    private us: UserService,
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
    this.us.getDJ().subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  onRowClicked(row){
    console.log('Row clicked: ', row);
    this.ngOnInit();
  }

  DeleteUser(_id) {
    this.as.deleteUser(_id)
      .subscribe(data => {
        if (data.success) {
          this.ngOnInit();
          this.snackBar.open('User has been deleted', '', {duration: 3000});
        } else{
          this.snackBar.open('ERROR', '',{duration:2000} )
        }
      });
    // this.router.navigate(['./admin']);
  }

  addShift(user){

    console.log('!!!DATE: '+ user.shift.date + '  !!!USER:' + user.name);
    let dialogRef = this.dialog.open(AddShiftComponent, {
      width: '500px',
      data: {
        id: user._id,
        name: user.name,
        last: user.last,
        // venue: shift,
        // date: shift.date,
        // time: shift.time
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.shift = [{
        venue: result.venue,
        date: result.date,
        time: result.time
      }] ;
      this.id = result.id;

      console.log('updated shift: '+ this.id + ',' +this.shift[0]);
      this.as.updateUser(result.id, this.user)
        .subscribe(data => {
          if (data.success){
            this.snackBar.open('venue created!' , 'Cool', {duration: 2000});
            this.dialog.closeAll();
            console.log(this.shift);
            this.ngOnInit();
          }
          else{
            this.snackBar.open('something went wrong');
          }
        })

    });
  }

}
