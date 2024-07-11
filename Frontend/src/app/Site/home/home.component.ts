import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service'; 

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  reservations: any[] = [];
  currentDate: Date = new Date();
  daysToShow: Date[] = [];
  selectedTimeSlot: string = '';
  numParticipants: number = 1;
  selectedDay: Date | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadDays();
    this.loadReservations();
  }

  loadDays(): void {
    this.daysToShow = [];
    const start = new Date(this.currentDate);
    for (let i = 0; i < 7; i++) {
      const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      this.daysToShow.push(day);
    }
  }

  loadReservations(): void {
    this.apiService.getReservations()
      .subscribe(reservations => {
        this.reservations = reservations;
      });
  }

  selectDay(day: Date): void {
    this.selectedDay = day;
    this.selectedTimeSlot = '';
  }

  selectTimeSlot(day: Date, timeSlot: string): void {
    this.selectedDay = day;
    this.selectedTimeSlot = timeSlot;
  }

  isSelected(day: Date, timeSlot: string): boolean {
    return this.selectedDay === day && this.selectedTimeSlot === timeSlot;
  }

  getTimeSlots(day: Date): string[] {
    const timeSlots: string[] = [];
    let currentTime = new Date(day);
    currentTime.setHours(12, 0, 0, 0); 

    while (currentTime.getHours() < 21) {
      const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + 90);
    }

    return timeSlots;
  }

  reserveTimeSlot(): void {
    if (!this.selectedTimeSlot || !this.selectedDay) {
      alert('Please select a day and time slot first.');
      return;
    }

    const newReservation = {
      id: 0,
      date: this.selectedDay.toISOString().slice(0, 10), 
      start_time: this.selectedTimeSlot,
      end_time: this.calculateEndTime(this.selectedTimeSlot), 
      max_participants: this.numParticipants
    };

    this.apiService.createReservation(newReservation)
      .subscribe(() => {
        alert('Reservation successfully created!');
        this.loadReservations(); 
      }, error => {
        console.error('Error during reservation:', error);
        alert('Error during reservation. Please try again.');
      });
  }

  calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + 90, 0, 0); 
    return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  nextWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.loadDays();
  }

  previousWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.loadDays();
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.getFullYear() === today.getFullYear() && day.getMonth() === today.getMonth() && day.getDate() === today.getDate();
  }

  isPastDay(day: Date): boolean {
    const today = new Date();
    return day < today;
  }
}
