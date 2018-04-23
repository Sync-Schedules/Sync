import { Component } from '@angular/core';
import { AuthService} from "./services/auth.service";
import { MatSnackBar}  from "@angular/material";
import { Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('you are now logged out', 'ok', {duration: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
