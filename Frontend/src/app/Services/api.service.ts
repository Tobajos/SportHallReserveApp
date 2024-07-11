import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile(id: number): Observable<any> {
    console.log(id);
    let user = this.authService.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.get(`${this.baseURL}profile/${id}`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getReservations():Observable<any>{
    let user = this.authService.getUserFromLocalStorage();

    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.get(`${this.baseURL}reservations`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  createReservation(reservationData: any): Observable<any> {
    let user = this.authService.getUserFromLocalStorage();

    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.post(`${this.baseURL}reservations/`, reservationData, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}