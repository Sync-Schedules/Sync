import {Component, Inject, OnInit} from '@angular/core';
import { AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  constructor(private as: AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA)public data: any) {
  }

  user:any[];
  name: string;
  last: string;
  username: string;
  email: string;
  role: string;
  _id: string;


  roles = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Manager', viewValue: 'Manager'},
    {value: 'DJ', viewValue: 'DJ'}
  ];

  // ngOnInit() {
  //
  //   console.log('ID: ' + this.data._id)
  // }

  // onEditSubmit(_id){
  //   this.as.updateUser(_id)
  //     .subscribe(data => {
  //       if (data.success){
  //         this.snackBar.open('user has been updated');
  //         this.dialog.closeAll();
  //       }
  //       else{
  //         this.snackBar.open('something went wrong');
  //       }
  //     })
  // }

}
