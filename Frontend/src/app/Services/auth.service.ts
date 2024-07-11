import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'http://127.0.0.1:8000/auth/'

  constructor(private http: HttpClient) { }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  login(data:any){
    return this.http.post(`${this.baseUrl}login/`,data);
  }

  register(data:any){
    return this.http.post(`${this.baseUrl}register/`,data);
  }

  logout(){
    let user = this.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.post(`${this.baseUrl}logout/`,null,{headers})
  }
}