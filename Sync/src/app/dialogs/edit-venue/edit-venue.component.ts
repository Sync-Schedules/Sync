import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-edit-venue',
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.scss']
})
export class EditVenueComponent {


  constructor(private as: AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditVenueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  venue: any[];
  name: String;
  address: String;
  city: String;
  state: String;
  zip: number;
  phone: number;
  email: String;
  _id: String;

  states = [
    {value: 'MO', viewValue: 'MO'},
    {value: 'IL', viewValue: 'IL'},
    {value: 'Other', viewValue: 'Other'}
  ];

}
