import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ValidateService} from "../../services/validate.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.scss']
})
export class AddVenueComponent implements OnInit {

  name: String;
  address: String;
  city: String;
  state: String;
  zip: String;
  phone: String;
  email: String;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    public snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  states = [
    {value: 'MO', viewValue: 'MO'},
    {value: 'IL', viewValue: 'IL'},
    {value: 'Other', viewValue: 'Other'}
  ];

  ngOnInit() {
  }


  onRegisterSubmit(){

    const venue = {
      name: this.name,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      phone: this.phone,
      email: this.email
    };


    //Require fields

    if (!this.validateService.validateAddVenue(venue)){
      this.snackBar.open('Please fill all fields', 'close', {duration:2000});
      return false;
    }

    //Validate Email

    if (!this.validateService.validateEmail(venue.email)){
      this.snackBar.open('Please enter a valid email');
      return false;
    }
    //Register Venue
    this.authService.addVenue(venue).subscribe(data =>{
      if(data.success){
        this.snackBar.open('Venue Created!', '', {duration: 3000});
        this.dialog.closeAll();
        console.log(venue);
      } else{
        this.snackBar.open('Something went wrong', 'try again', {duration: 3000});
      }
    });


  }

}

