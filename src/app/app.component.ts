import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    CalendarComponent,
    MyBookingsComponent,
    RecommendedComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Learning Week Air France';
}
