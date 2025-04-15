import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Event, EventType } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatTooltipModule,
    DatePipe,
    NgClass,
    NgIf
  ],
  templateUrl: './event-card.component.html',
  styles: `
    :host {
      display: block;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `
})
export class EventCardComponent {
  @Input() event!: Event;
  @Input() isBooked: boolean = false;
  @Input() showDescription: boolean = true;
  @Input() showMonth: boolean = false;
  
  @Output() onBook = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<number>();
  @Output() onDetails = new EventEmitter<Event>();
} 