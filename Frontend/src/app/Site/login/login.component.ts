import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username:string="";
  password:string="";

  constructor(private authService:AuthService, private router: Router){}

  login():void{
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe(
      (response:any)=>{
        localStorage.setItem('user',JSON.stringify({username:this.username, token:response.token}));
      },error=>{
        console.error;
      })
  }
}
