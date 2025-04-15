import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { EventCardComponent } from './event-card.component';
import { EventService } from '../../services/event.service';
import { Event, EventType, Department } from '../../models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    EventCardComponent
  ],
  templateUrl: './calendar.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class CalendarComponent implements OnInit {
  events: Event[] = [];
  bookedEventIds: number[] = [];
  filterForm: FormGroup;
  
  eventTypes = Object.values(EventType);
  departments = Object.values(Department);
  
  groupedEvents: { [key: string]: Event[] } = {};
  
  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this.formBuilder.group({
      eventType: [''],
      department: [''],
      location: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadEvents();
    this.loadBookings();
    
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }
  
  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.groupEventsByDay();
    });
  }
  
  loadBookings(): void {
    this.eventService.getMyBookings().subscribe(bookings => {
      this.bookedEventIds = bookings.map(booking => booking.id);
    });
  }
  
  groupEventsByDay(): void {
    this.groupedEvents = {};
    
    this.events.forEach(event => {
      const date = event.startTime.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
      
      if (!this.groupedEvents[date]) {
        this.groupedEvents[date] = [];
      }
      
      this.groupedEvents[date].push(event);
    });
  }
  
  applyFilters(): void {
    const { eventType, department, location } = this.filterForm.value;
    
    this.eventService.getEvents().subscribe(events => {
      this.events = events.filter(event => {
        let match = true;
        
        if (eventType && event.type !== eventType) {
          match = false;
        }
        
        if (department && event.department !== department) {
          match = false;
        }
        
        if (location) {
          if (location === 'Online' && !event.isOnline) {
            match = false;
          } else if (location === 'Présentiel' && event.isOnline) {
            match = false;
          }
        }
        
        return match;
      });
      
      this.groupEventsByDay();
    });
  }
  
  getEventsForDate(dateStr: string): Event[] {
    const date = new Date(dateStr);
    return this.events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() && 
             eventDate.getFullYear() === date.getFullYear();
    });
  }
  
  isEventBooked(eventId: number): boolean {
    return this.bookedEventIds.includes(eventId);
  }
  
  bookEvent(eventId: number): void {
    this.eventService.bookEvent(eventId).subscribe(success => {
      if (success) {
        this.loadEvents();
        this.loadBookings();
        this.snackBar.open('Inscription réussie !', 'Fermer', { duration: 3000 });
      } else {
        this.snackBar.open('Impossible de s\'inscrire à cet événement.', 'Fermer', { duration: 3000 });
      }
    });
  }
  
  cancelBooking(eventId: number): void {
    this.eventService.cancelBooking(eventId).subscribe(success => {
      if (success) {
        this.loadEvents();
        this.loadBookings();
        this.snackBar.open('Inscription annulée.', 'Fermer', { duration: 3000 });
      } else {
        this.snackBar.open('Impossible d\'annuler l\'inscription.', 'Fermer', { duration: 3000 });
      }
    });
  }
  
  showEventDetails(event: Event): void {
    // Dans une implémentation réelle, on ouvrirait une boîte de dialogue avec les détails
    this.snackBar.open(`Détails de l'événement : ${event.title}`, 'Fermer', { duration: 3000 });
  }
} 