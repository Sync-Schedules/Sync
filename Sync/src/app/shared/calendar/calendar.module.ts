import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent} from "./calendar.component";
import { MatButtonToggleModule} from "@angular/material";
import { MatButtonModule} from "@angular/material";
import {MatIconModule} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class DemoModule {}
