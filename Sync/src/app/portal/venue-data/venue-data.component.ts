import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { DataSource } from "@angular/cdk/collections";
import { Venue} from "../../models/venue.model";
import { VenueService} from "../../services/venue.service";
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AddVenueComponent} from "../../dialogs/add-venue/add-venue.component";
import {EditUserComponent} from "../../dialogs/edit-user/edit-user.component";
import {EditVenueComponent} from "../../dialogs/edit-venue/edit-venue.component";


@Component({
  selector: 'app-venue-data',
  providers: [VenueService],
  templateUrl: './venue-data.component.html',
  styleUrls: ['./venue-data.component.scss']
})
export class VenueDataComponent implements OnInit {

  displayedColumns = ['name', 'address', 'city', 'state', 'zip', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<Venue>();
  id: string;
  venue:any;
  name: string;
  address: string;
  city: string;
  zip: number;
  phone: number;
  email: string;


  constructor(
    public dialog: MatDialog,
    private vs: VenueService,
    private as: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.vs.getVenue().subscribe(data => this.dataSource.data = data);
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
    let dialogRef = this.dialog.open(AddVenueComponent, {width: '500px'});
    this.ngOnInit();
  }

  onRowClicked(row){
    console.log('Row clicked: ', row);
    this.ngOnInit();
  }

  DeleteVenue(_id) {
    this.as.deleteVenue(_id)
      .subscribe(data => {
        if (data.success){
          this.ngOnInit();
          this.snackBar.open('User has been deleted', '', {duration: 3000});

        } else {
          this.snackBar.open('Error', 'Close', {duration: 2000})
        }

      });
    // console.log('Venue', _id, 'has been deleted');
    // this.ngOnInit();
    // return this.as.deleteUser()
  }

  updateVenue(venue){

    console.log(venue, venue._id, venue.name, venue.last);
    let dialogRef = this.dialog.open(EditVenueComponent, {
      width: '500px',
      data: {
        id: venue._id,
        name: venue.name,
        address: venue.address,
        city: venue.city,
        zip: venue.zip,
        phone: venue.phone,
        email: venue.email

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.venue = {
        name: result.name,
        address: result.address,
        city: result.city,
        zip: result.zip,
        phone: result.phone,
        email: result.email
      } ;
      this.id = result.id;

      console.log('updated: ' + this.venue + ',' + this.id + ',' +this.name);
      this.as.updateVenue(result.id, this.venue)
        .subscribe(data => {
          if (data.success){
            this.snackBar.open('venue has been updated!' , 'Cool', {duration: 2000});
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
