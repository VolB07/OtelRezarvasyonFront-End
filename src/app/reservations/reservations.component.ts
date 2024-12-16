import { ReservationService } from 'C:/otelRezervasyonUygulamasi/src/app/reservations.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    @Inject(PLATFORM_ID) private platformId: object // Tarayıcı kontrolü için platform ID
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = Number(localStorage.getItem('userId')); // Local Storage'dan userId alınıyor
      this.reservationService.getReservationsByUserId(userId).subscribe({
        next: (data) => {
          this.reservations = data;
          this.sortReservationsByDate();  // Veriler yüklendikten sonra sıralama yapılacak
        },
        error: (err) => console.error('Rezervasyonlar alınamadı:', err),
      });
    }
  }

  // Check-out tarihine göre sıralama fonksiyonu
  sortReservationsByDate(): void {
    // Verileri, check-out tarihine göre sıralıyoruz
    this.reservations.sort((a, b) => {
      const checkOutA = new Date(a.checkOutDate); // A'nın çıkış tarihi
      const checkOutB = new Date(b.checkOutDate); // B'nin çıkış tarihi
      
      // Tarihi geçmemiş rezervasyonlar başa gelsin
      if (checkOutA < new Date() && checkOutB >= new Date()) {
        return 1;  // Geçmiş olanı sona atıyoruz
      } else if (checkOutA >= new Date() && checkOutB < new Date()) {
        return -1; // Geçmemiş olanı başa atıyoruz
      }

      // Tarihler eşitse, eski tarih önce gelir
      return checkOutA < checkOutB ? -1 : 1;
    });
  }

  // Check-out tarihi geçmiş mi kontrol et
  isExpired(checkOutDate: string): boolean {
    const currentDate = new Date();
    const checkOut = new Date(checkOutDate);
    return checkOut < currentDate;
  }
}
