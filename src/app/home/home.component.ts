import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { HotelService } from '../hotel.service';  // HotelService'i import ettik
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class HomeComponent { 
  filterCity: string = '';  // Şehir filtresi için değişken
  filterStars: number | null = null;  // Yıldız sayısı filtresi için değişken

  hotels: any[] = [];  // Otellerin tam listesi
  filteredHotels: any[] = [];  // Filtrelenmiş otellerin listesi

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private hotelService: HotelService  // HotelService'i ekledik
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated(); 
  }

  logout() {
    this.authService.clearToken(); 
  }

  ngOnInit() {
    this.getHotels();  // Sayfa yüklendiğinde otelleri al
  }

  // Otelleri API'den al
  getHotels() {
    this.hotelService.getHotels().subscribe((data: any[]) => {
      this.hotels = data;  // Tam oteller listesi
      this.filteredHotels = [...this.hotels];  // İlk başta tüm otelleri listele
    });
  }

  // Filtreleme işlemi
  filterHotels() {
    this.filteredHotels = this.hotels.filter(hotel => {
      // Şehir filtresi
      const cityMatch = this.filterCity ? hotel.address.includes(this.filterCity) : true;
      // Yıldız sayısı filtresi
      const starsMatch = this.filterStars ? hotel.star_rating === this.filterStars : true;
      return cityMatch && starsMatch;  // Her iki filtreden de uyumlu olan otelleri döndür
    });
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

  navigateToHotelDetail(hotelId: string): void {
    this.router.navigate(['/hotel', hotelId]);
  }
}
