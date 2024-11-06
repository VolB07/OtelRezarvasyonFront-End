import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.getElementById('menu');
    if (this.isMenuOpen) {
      menu?.classList.add('show-menu');
    } else {
      menu?.classList.remove('show-menu');
    }
  }
}

