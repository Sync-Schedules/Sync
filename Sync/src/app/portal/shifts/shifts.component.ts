import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {AddUserComponent} from "../../dialogs/add-user/add-user.component";
import { ConfirmDialogComponent} from "../../dialogs/delete-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";
import {UserService} from "../../services/user.service";
import {Shift} from "../../models/shift.model";
import {AuthService} from "../../services/auth.service";
import {AddShiftComponent} from "../../dialogs/add-shift/add-shift.component";

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  displayedColumns = ['venue', 'date', 'time', 'actions'];
  dataSource = new MatTableDataSource<Shift>();
  id: string;
  shift:any;
  venue: string;
  date: Date;
  time: string;


  constructor( public dialog: MatDialog,
               private us: UserService,
               private as: AuthService,
               private snackBar: MatSnackBar,
               private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.us.getShifts().subscribe(data => this.dataSource.data = data)
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
    let dialogRef = this.dialog.open(AddShiftComponent, {width: '500px'});

  }

  onRowClicked(row){
    console.log('Row clicked: ', row);
    this.ngOnInit();
  }


}
