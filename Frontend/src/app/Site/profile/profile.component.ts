import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = {}; 
  reservations: any[] = []; 

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getProfile(id);
      this.getReservations(); 
    });
  }

  getProfile(id: number): void {
    this.apiService.getProfile(id).subscribe(
      response => {
        this.profile = response;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getReservations(): void {
    this.apiService.getReservations().subscribe(
      response => {
        this.reservations = response;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
