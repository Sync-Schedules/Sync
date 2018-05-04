import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, ErrorHandler} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'hammerjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DatePipe, CurrencyPipe} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatDialogModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule,
  MatNativeDateModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatRadioModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from "@angular/material";
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { CalendarModule} from "angular-calendar";
import { DemoModule} from "./shared/calendar/calendar.module";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from "@angular/material";
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { LoginBarComponent } from './login/login-bar/login-bar.component';
import { EmployeesComponent } from './portal/users/users.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { VenueDataComponent } from './portal/venue-data/venue-data.component';
import { AddVenueComponent } from './dialogs/add-venue/add-venue.component';
import { ValidateService } from "./services/validate.service";
import { AuthService} from "./services/auth.service";
import { AuthGuard} from "./guards/auth.guard";
import { UserService} from "./services/user.service";
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import {JwtHelper} from "angular2-jwt";
import { ConfirmDialogComponent } from './dialogs/delete-dialog/confirm-dialog.component';
import {AdminGuard} from "./guards/admin.guard";
import { SyncCalendarComponent } from './shared/sync-calendar/sync-calendar.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { NavComponent } from './portal/nav/nav.component';
import { ScheduleComponent } from './portal/schedule/schedule.component';
import { EditVenueComponent } from './dialogs/edit-venue/edit-venue.component';
import { PhoneNumComponent } from './shared/phone-num/phone-num.component';
import { PortalHomeComponent} from "./portal/portal-home/portal-home.component";
import { AddShiftComponent } from './dialogs/add-shift/add-shift.component';
import {DjsComponent} from "./portal/djs/djs.component";
import { ShiftsComponent } from './portal/shifts/shifts.component';
import { AvailabiltyComponent} from "./portal/availabilty/availabilty.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PortalComponent,
    LoginBarComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    VenueDataComponent,
    AddVenueComponent,
    AddUserComponent,
    ConfirmDialogComponent,
    SyncCalendarComponent,
    EditUserComponent,
    NavComponent,
    ScheduleComponent,
    AvailabiltyComponent,
    EditVenueComponent,
    PhoneNumComponent,
    PortalHomeComponent,
    AddShiftComponent,
    EmployeesComponent,
    DjsComponent,
    ShiftsComponent,
    AvailabiltyComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    HttpModule,
    DemoModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  providers: [
    FormBuilder,
    ValidateService,
    AuthService,
    AuthGuard,
    AdminGuard,
    UserService,
    JwtHelper
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddVenueComponent,
    AddUserComponent,
    ConfirmDialogComponent,
    EditUserComponent,
    EditVenueComponent,
    AddShiftComponent
  ]
})
export class AppModule { }
