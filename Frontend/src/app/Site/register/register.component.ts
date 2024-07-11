import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username:string="";
  email:string="";
  first_name:string="";
  last_name:string="";
  password:string="";
  password_confirm:string="";

  constructor(private authService: AuthService, private router:Router){}

  register():void{
    if (this.password !== this.password_confirm) {
      alert("Passwords do not match!");
      return;
    }
    const userData={
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    };

    this.authService.register(userData).subscribe(
      (response: any) => {
        console.log("DEBUG",userData)
        alert("Registration successful!");
        this.router.navigate(['/login']);
      },
      (error: any) => {
        alert("Registration failed. Please try again.");
        console.log("DEBUG",userData)
        console.error(error);
      }
    );
  }
}
