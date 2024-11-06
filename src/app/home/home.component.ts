import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Bağımsız bileşen olarak tanımlanıyor
  imports: [CommonModule]
  
})
export class HomeComponent { 

  constructor(public authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated(); // AuthService kullanarak oturum durumunu kontrol et
  }

  logout() {
    this.authService.clearToken(); // Kullanıcı çıkış yaptığında token'ı temizle
    // Gerekirse, yönlendirme işlemi burada yapılabilir
  }
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
