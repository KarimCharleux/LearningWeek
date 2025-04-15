import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event, EventType, Department } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [
    {
      id: 1,
      title: '30min call meeting Peer <> Leslie',
      startTime: new Date(2025, 3, 8, 9, 0),  // 8 avril 2025, 9:00
      endTime: new Date(2025, 3, 8, 9, 30),   // 8 avril 2025, 9:30
      location: 'Online',
      totalSeats: 10,
      availableSeats: 5,
      type: EventType.MEETUP,
      department: Department.DEV,
      description: 'Échange avec Leslie sur les bonnes pratiques de développement',
      isOnline: true
    },
    {
      id: 2,
      title: 'Livn Product Demo',
      startTime: new Date(2025, 3, 8, 15, 20), // 8 avril 2025, 15:20
      endTime: new Date(2025, 3, 8, 16, 20),   // 8 avril 2025, 16:20
      location: 'WeWork Paris',
      totalSeats: 25,
      availableSeats: 12,
      type: EventType.PRESENTATION,
      department: Department.BUSINESS,
      description: 'Présentation du produit Livn et ses fonctionnalités',
      isOnline: false
    },
    {
      id: 3,
      title: '30min call meeting Olivia, Liam <> Alban',
      startTime: new Date(2025, 3, 9, 11, 15), // 9 avril 2025, 11:15
      endTime: new Date(2025, 3, 9, 11, 45),   // 9 avril 2025, 11:45
      location: 'Online',
      totalSeats: 5,
      availableSeats: 2,
      type: EventType.MEETUP,
      department: Department.DEV,
      description: 'Discussion technique avec Olivia, Liam et Alban',
      isOnline: true
    },
    {
      id: 4,
      title: '30min call meeting Yulia, Alvin <> Irina, Mae',
      startTime: new Date(2025, 3, 10, 11, 15), // 10 avril 2025, 11:15
      endTime: new Date(2025, 3, 10, 11, 45),   // 10 avril 2025, 11:45
      location: 'Online',
      totalSeats: 8,
      availableSeats: 3,
      type: EventType.MEETUP,
      department: Department.DS,
      description: 'Échange sur les modèles de data science avec Yulia, Alvin, Irina et Mae',
      isOnline: true
    },
    {
      id: 5,
      title: 'Livn Product Demo',
      startTime: new Date(2025, 3, 11, 10, 45), // 11 avril 2025, 10:45
      endTime: new Date(2025, 3, 11, 11, 45),   // 11 avril 2025, 11:45
      location: 'Online',
      totalSeats: 30,
      availableSeats: 15,
      type: EventType.PRESENTATION,
      department: Department.BUSINESS,
      description: 'Démonstration détaillée du produit Livn',
      isOnline: true
    },
    {
      id: 6,
      title: 'Product meeting review',
      startTime: new Date(2025, 3, 12, 17, 30), // 12 avril 2025, 17:30
      endTime: new Date(2025, 3, 12, 18, 0),    // 12 avril 2025, 18:00
      location: 'The Blue Tower',
      totalSeats: 15,
      availableSeats: 7,
      type: EventType.MEETUP,
      department: Department.BUSINESS,
      description: 'Revue des produits avec les équipes métier',
      isOnline: false
    },
    {
      id: 7,
      title: 'Karma Learning Session',
      startTime: new Date(2025, 3, 13, 14, 0),  // 13 avril 2025, 14:00
      endTime: new Date(2025, 3, 13, 16, 0),    // 13 avril 2025, 16:00
      location: 'Salle Sky - Bâtiment A',
      totalSeats: 20,
      availableSeats: 8,
      type: EventType.TRAINING,
      department: Department.BUSINESS,
      description: 'Session d\'apprentissage sur l\'outil Karma avec Florence (PO) et Victoria (analyste de vol)',
      isOnline: false
    },
    {
      id: 8,
      title: 'Visite du Concorde',
      startTime: new Date(2025, 3, 14, 10, 0),  // 14 avril 2025, 10:00
      endTime: new Date(2025, 3, 14, 12, 0),    // 14 avril 2025, 12:00
      location: 'Musée Air France',
      totalSeats: 15,
      availableSeats: 3,
      type: EventType.VISIT,
      department: Department.HISTORY,
      description: 'Découverte du Concorde et de son histoire avec Air France',
      isOnline: false
    },
    {
      id: 9,
      title: 'Atelier Data Science',
      startTime: new Date(2025, 3, 15, 9, 0),   // 15 avril 2025, 9:00
      endTime: new Date(2025, 3, 15, 17, 0),    // 15 avril 2025, 17:00
      location: 'Bâtiment Digital Factory',
      totalSeats: 12,
      availableSeats: 4,
      type: EventType.WORKSHOP,
      department: Department.DS,
      description: 'Journée d\'atelier pratique sur les techniques de data science appliquées à l\'aéronautique',
      isOnline: false
    },
    {
      id: 10,
      title: 'Rencontre avec les pilotes',
      startTime: new Date(2025, 3, 16, 14, 0),  // 16 avril 2025, 14:00
      endTime: new Date(2025, 3, 16, 16, 0),    // 16 avril 2025, 16:00
      location: 'Salle Cockpit - Terminal 2E',
      totalSeats: 25,
      availableSeats: 10,
      type: EventType.MEETUP,
      department: Department.PILOT,
      description: 'Échange avec des pilotes d\'Air France sur leur métier et les défis actuels',
      isOnline: false
    }
  ];

  // Événements auxquels l'utilisateur est inscrit (simulé)
  private myBookings: number[] = [1, 3, 7, 8];
  
  getEvents(): Observable<Event[]> {
    return of(this.events);
  }
  
  getMyBookings(): Observable<Event[]> {
    const myEvents = this.events.filter(event => this.myBookings.includes(event.id));
    return of(myEvents);
  }
  
  getRecommendedEvents(): Observable<Event[]> {
    // Logique simplifiée pour recommander des événements
    // Dans une vraie application, cela serait basé sur le profil utilisateur, historique, etc.
    const recommendedEvents = this.events
      .filter(event => !this.myBookings.includes(event.id))
      .filter(event => event.availableSeats > 0)
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire
      .slice(0, 3); // Prend les 3 premiers
    
    return of(recommendedEvents);
  }
  
  bookEvent(eventId: number): Observable<boolean> {
    const event = this.events.find(e => e.id === eventId);
    if (event && event.availableSeats > 0 && !this.myBookings.includes(eventId)) {
      event.availableSeats--;
      this.myBookings.push(eventId);
      return of(true);
    }
    return of(false);
  }
  
  cancelBooking(eventId: number): Observable<boolean> {
    const event = this.events.find(e => e.id === eventId);
    const bookingIndex = this.myBookings.indexOf(eventId);
    
    if (event && bookingIndex !== -1) {
      event.availableSeats++;
      this.myBookings.splice(bookingIndex, 1);
      return of(true);
    }
    return of(false);
  }
} 