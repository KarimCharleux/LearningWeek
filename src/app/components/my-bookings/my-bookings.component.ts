import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventCardComponent } from '../calendar/event-card.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    EventCardComponent
  ],
  template: `
    <section class="py-12 px-4 md:px-8">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-bold text-[#0f2b5b] mb-2">Mes inscriptions</h2>
            <p class="text-gray-600">Gérez vos activités réservées pour la Learning Week</p>
          </div>
          
          <button mat-raised-button color="primary" class="hidden md:block">
            <mat-icon>calendar_today</mat-icon>
            Ajouter au calendrier
          </button>
        </div>
        
        <div *ngIf="myEvents.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
          <mat-icon class="text-gray-400 text-6xl mb-4">event_busy</mat-icon>
          <h3 class="text-xl font-medium text-gray-700 mb-2">Aucune inscription</h3>
          <p class="text-gray-500 mb-6">Vous n'êtes inscrit(e) à aucune activité pour le moment.</p>
          <button mat-raised-button color="primary">
            Découvrir les activités
          </button>
        </div>
        
        <div *ngIf="myEvents.length > 0" class="space-y-6">
          <app-event-card 
            *ngFor="let event of myEvents" 
            [event]="event"
            [isBooked]="true"
            [showMonth]="true"
            (onCancel)="cancelBooking($event)"
            (onDetails)="showEventDetails($event)"
          ></app-event-card>
        </div>
        
        <button mat-raised-button color="primary" class="w-full mt-6 md:hidden">
          <mat-icon>calendar_today</mat-icon>
          Ajouter au calendrier
        </button>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class MyBookingsComponent implements OnInit {
  myEvents: Event[] = [];
  
  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadMyBookings();
  }
  
  loadMyBookings(): void {
    this.eventService.getMyBookings().subscribe(events => {
      this.myEvents = events;
    });
  }
  
  cancelBooking(eventId: number): void {
    this.eventService.cancelBooking(eventId).subscribe(success => {
      if (success) {
        this.loadMyBookings();
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