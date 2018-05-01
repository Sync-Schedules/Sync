import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import * as moment from 'moment';
import * as _ from 'lodash';
import {CalendarDate} from "../../shared/sync-calendar/sync-calendar.component";
import {MatDialog} from "@angular/material";
import {UserService} from "../../services/user.service";
// import {CalWeekComponent} from "../../dialogs/cal-week/cal-week.component";

export interface Weekly {
  wDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-portal-home',
  templateUrl: './portal-home.component.html',
  styleUrls: ['./portal-home.component.scss'],
})
export class PortalHomeComponent implements OnInit {

  dayName = moment().format('dddd');
  date = moment().format('MMM Do YY');
  currentDate = moment();

  user: Object;
  weeks: Weekly[][] = [];
  sortedDates: Weekly[] = [];
  dateClicked: any;

  @Input() selectedDates: Weekly[] = [];
  @Output() onSelectDate = new EventEmitter<Weekly>();

  shift: any;

  alert: boolean = false;
  emptyshifts = [];
  shiftsv =[];
  shiftst =[];
  shiftsdt = [];
  shiftsdj=[];
  shifthd=['Venue', 'Time', 'Date', 'DJ'];

  daysOfWeek =[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  constructor(private auth: AuthService, private dialog: MatDialog, private us: UserService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err =>{
        console.log(err);
        return false;
      });

    console.log(this.dayName);
    console.log(this.currentDate);
    this.generateWeek();

    this.us.getShifts().subscribe(data =>{
      this.shift = data;
      for (let i=0; data.length; i++){
        this.shiftsv.push(this.shift[i].venue);
        this.shiftst.push(this.shift[i].time);
        this.shiftsdt.push(this.shift[i].day);
        this.shiftsdj.push(this.shift[i].dj);
        if(this.shift[i].dj === ""){
          this.emptyshifts.push(this.shift[i].venue + ' // ' + this.shift[i].day + ' // ' + this.shift[i].time);
          this.alert = true;
        }
      }


    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateWeek();
    }
  }

   isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.wDate, 'day');
    }) > -1;
  }

  isSelectedWeek(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    });
  }

  selectDate(date: Weekly){
    this.onSelectDate.emit(date);
    console.log(date.wDate.format('dddd'));
    return this.dateClicked = date.wDate.format('dddd MMM Do YYYY');
  }

//  Actions

  prevWeek(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'weeks');
    this.generateWeek();
  }

  nextWeek(): void {
    this.currentDate = moment(this.currentDate).add(1, 'weeks');
    this.generateWeek();
  }

  firstWeek(): void {
    this.currentDate = moment(this.currentDate).startOf('month');
    this.generateWeek();
  }

  generateWeek(): void {
    const dates = this.fillDates(this.currentDate);
    const days: Weekly[][] = [];
    while (dates.length > 0) {
      days.push(dates.splice(0,7));
    }
    this.weeks = days;
  }

  fillDates(currentMoment: moment.Moment): Weekly[] {
    const firstOfWeek = moment(currentMoment).startOf('week').day();
    const firstDayOfGrid = moment(currentMoment).startOf('week').subtract(firstOfWeek, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 7)
      .map((date: number): Weekly => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          wDate: d,
        };
      });
  }


}
