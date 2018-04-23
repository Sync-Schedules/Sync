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

@Component({
  selector: 'usertable',
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns = ['name', 'last', 'username', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  id: string;
  user:any;
  name: string;
  last: string;
  username: string;
  email: string;
  role: string;


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
    this.us.getUser().subscribe(data => this.dataSource.data = data);
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

  openDialog(): void {
    let dialogRef = this.dialog.open(AddUserComponent, {width: '500px'});

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

  updateUser(user){

    console.log(user, user._id, user.name, user.last);
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {
        id: user._id,
        name: user.name,
        last: user.last,
        username: user.username,
        email: user.email,
        role: user.role

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = {
        name: result.name,
        last: result.last,
        email: result.email,
        username: result.username,
        role: result.role
      } ;
      this.id = result.id;

      // console.log('updated user: ' + this.user + ',' + this.id + ',' +this.name + ',' + this.last + ',' + this.username + ',' + this.email + ',' + this.role);
      this.as.updateUser(result.id, this.user)
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

}
