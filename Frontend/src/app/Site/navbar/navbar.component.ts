import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateUser();
      });
    this.updateUser();
  }

  updateUser() {
    this.user = this.authService.getUserFromLocalStorage();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']).then(() => {
        location.reload();
      });
    }, (error: any) => {
      console.error(error);
    });
  }
}
