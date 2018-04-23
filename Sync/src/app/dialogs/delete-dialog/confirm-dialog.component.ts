import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {EmployeesComponent} from "../../portal/users/users.component";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  user: Object;
  _id: String;
  role: String;
  email: String;
  show: boolean = false;
  users: Object[];
  errorMessage: any;

  constructor(private as: AuthService, private us: UserService, private employeeComponent: EmployeesComponent) {
  }

  ngOnInit() {


  }
  onClickDelete(){
    this.employeeComponent.DeleteUser(this._id);
  }
}

