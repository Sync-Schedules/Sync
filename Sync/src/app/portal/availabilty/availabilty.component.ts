import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-availabilty',
  templateUrl: './availabilty.component.html',
  styleUrls: ['./availabilty.component.scss']
})
export class AvailabiltyComponent implements OnInit {
  disabled = true;
  all: boolean = false;
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  sunday: boolean = false;

  constructor(private as: AuthService,  private snackBar: MatSnackBar) { }

  user: any;

  availability = [
    this.monday,
    this.tuesday,
    this.wednesday,
    this.thursday,
    this.friday,
    this.saturday,
    this.sunday
];

  ngOnInit() {

    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });

  }

  enable(){
    this.disabled = false;
    console.log(this.availability);

  }

  disable(){
    this.disabled = true;
  }

  enableAll(){
    console.log(this.all);
      this.monday = this.all;
      this.tuesday = this.all;
      this.wednesday = this.all;
      this.thursday = this.all;
      this.friday = this.all;
      this.saturday = this.all;
      this.sunday = this.all;

  }

  saveAvailability(user){
    console.log('USER TEST: ' + 'user:' + user + ' name:' + user.name + ' avail: ' + user.availability);
    this.user.availability = [{
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      sunday: this.sunday}
    ];

    console.log(this.availability);
    this.disable();

    this.as.updateUser(this.user._id, this.user.availability)
      .subscribe(data => {
        if (data.success){
          this.snackBar.open('availability has been updated!' , 'Cool', {duration: 2000});
          console.log(this.user);
          console.log(this.user.availability)
        }
        else{
          this.snackBar.open('something went wrong');
        }
      });
    console.log(this.user)
    }
}
