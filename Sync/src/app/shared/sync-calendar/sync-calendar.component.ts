import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {VenueService} from "../../services/venue.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material";

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-sync-calendar',
  providers: [VenueService],
  templateUrl: './sync-calendar.component.html',
  styleUrls: ['./sync-calendar.component.scss']
})
export class SyncCalendarComponent implements OnInit, OnChanges {

  currentDate = moment();
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  dateClicked: any;
  user:any;
  id:any;
  venue: any;
  venues = [];
  dj: any;
  djs = [];
  time: any;
  times = ['9:00'];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor( public vs: VenueService, public us: UserService, public as: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.generateCalendar();

    this.vs.getVenue().subscribe(data =>{
        this.venue = data;
        for (let i = 0; i < this.venue.length; i++ ) {
          this.venues.push(this.venue[i].name);
          // console.log(this.venue[i].name);
        }
      } ,
      err =>{
        console.log(err);
        return false;
      });

    this.us.getDJ().subscribe(data => {
      console.log(data);
      for(let i=0; i<data.length; i++){
        // console.log(data[i].name);
        this.djs.push(data[i].username);
      }
      return this.user = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedWeek(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'week');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate){
    this.onSelectDate.emit(date);
    console.log(date.mDate.format('l'));
    return this.dateClicked = date.mDate.format('l');
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };
      });
  }

  //Form Submit

  onClickSubmit(){
    this.user = {
      dj: this.dj,
      venue: this.venue,
      date: this.currentDate,
      time: this.time
    } ;
    this.id = this.user._id;

    console.log(this.user);

    // console.log('updated shift: '+ this.id + ',' +this.user.venue);
    this.as.updateUser(this.id, this.user)
      .subscribe(data => {
        if (data.success){
          this.snackBar.open('venue created!' , 'Cool', {duration: 2000});
          console.log(this.user);
          this.ngOnInit();
        }
        else{

        }
      });
  }
}


