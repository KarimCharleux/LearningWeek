import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EventCardComponent } from '../calendar/event-card.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    EventCardComponent
  ],
  template: `
    <section class="py-12 px-4 md:px-8 bg-gray-50">
      <div class="container mx-auto">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-[#0f2b5b] mb-2">Recommandé pour vous</h2>
          <p class="text-gray-600">Basé sur votre profil et vos intérêts</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <app-event-card 
            *ngFor="let event of recommendedEvents" 
            [event]="event"
            [isBooked]="false"
            [showMonth]="true"
            (onBook)="bookEvent($event)"
            (onDetails)="showEventDetails($event)"
          ></app-event-card>
          
          <div *ngIf="recommendedEvents.length === 0" class="md:col-span-3 bg-white rounded-lg shadow-md p-8 text-center">
            <mat-icon class="text-gray-400 text-6xl mb-4">recommand</mat-icon>
            <h3 class="text-xl font-medium text-gray-700 mb-2">Aucune recommandation disponible</h3>
            <p class="text-gray-500">Nous n'avons pas encore de recommandations à vous proposer.</p>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <button mat-raised-button color="primary">
            Voir plus de recommandations
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class RecommendedComponent implements OnInit {
  recommendedEvents: Event[] = [];
  
  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadRecommendedEvents();
  }
  
  loadRecommendedEvents(): void {
    this.eventService.getRecommendedEvents().subscribe(events => {
      this.recommendedEvents = events;
    });
  }
  
  bookEvent(eventId: number): void {
    this.eventService.bookEvent(eventId).subscribe(success => {
      if (success) {
        this.loadRecommendedEvents(); // Refresh to get new recommendations
        this.snackBar.open('Inscription réussie !', 'Fermer', { duration: 3000 });
      } else {
        this.snackBar.open('Impossible de s\'inscrire à cet événement.', 'Fermer', { duration: 3000 });
      }
    });
  }
  
  showEventDetails(event: Event): void {
    // Dans une implémentation réelle, on ouvrirait une boîte de dialogue avec les détails
    this.snackBar.open(`Détails de l'événement : ${event.title}`, 'Fermer', { duration: 3000 });
  }
} 