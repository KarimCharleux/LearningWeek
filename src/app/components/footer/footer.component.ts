import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './footer.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class FooterComponent {} 