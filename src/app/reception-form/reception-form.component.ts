import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { ReservationService } from '../reservations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception-form',
  templateUrl: './reception-form.component.html',
  styleUrls: ['./reception-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReceptionFormComponent implements OnInit {
  reservationForm: FormGroup;
  hotels: any[] = [];
  reservations: any[] = [];
  selectedReservation: any = null;
  reservationStatuses: string[] = ['confirmed', 'Beklemede', 'İptal Edildi'];
  roomStatuses: string[] = ['Müsait', 'Dolu', 'Temizlikte'];


  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      hotel: ['', Validators.required], // Otel kontrolü tanımlandı
      reservation: ['', Validators.required], // Rezervasyon kontrolü tanımlandı
      reservation_status: ['', Validators.required], // Rezervasyon durumu
      room_id: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadHotels();
  }

// Otel verilerini yükleme
loadHotels(): void {
  const userId = localStorage.getItem('userId'); // localStorage'dan user_id'yi al

  if (!userId) {
    console.error('User ID bulunamadı. Lütfen oturum açın.');
    alert('Oturum açmanız gerekmektedir.');
    return;
  }

  this.hotelService.getHotels().subscribe(
    (hotels) => {
      // Otelleri filtrele, sadece kullanıcıya ait otelleri göster
      this.hotels = hotels.filter(hotel => hotel.user_id === Number(userId));

      if (this.hotels.length === 0) {
        console.log('Kullanıcıya ait otel bulunamadı.');
      }
    },
    (error) => {
      console.error("Otel verisi yüklenemedi", error);
    }
  );
}


  onHotelChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedHotelId = selectElement.value;

    if (selectedHotelId) {
      this.loadReservations(Number(selectedHotelId));
      this.reservationForm.patchValue({
        reservation: '',  // Otel değiştiğinde rezervasyon formu sıfırlanır
      });
    }
  }

  loadReservations(hotelId: number): void {
    this.reservationService.getReservationsByHotelId(hotelId).subscribe(
      (reservations) => {
        console.log('Yüklenen Rezervasyonlar:', reservations);
        
        // Beklemede olan rezervasyonları filtrele
        this.reservations = reservations.filter(
          (reservation) => reservation.status === 'pending'
        );
  
        console.log('Beklemedeki Rezervasyonlar:', this.reservations);
      },
      (error) => {
        console.error("Rezervasyon verisi yüklenemedi", error);
      }
    );
  }
  



  // Rezervasyon değiştiğinde seçili rezervasyonu ayarla
  onReservationChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedReservationId = selectElement.value;

    console.log('Seçilen Rezervasyon ID:', selectedReservationId);

    if (selectedReservationId) {
      this.selectedReservation = this.reservations.find(
        (reservation) => reservation.reservationId === Number(selectedReservationId)
      );

      if (this.selectedReservation) {
        // Seçilen rezervasyonu formu güncelle
        this.reservationForm.patchValue({
          reservation: selectedReservationId,
          room_id: this.selectedReservation.roomId // room_id'yi buraya ekleyin
        });
        console.log('Seçilen Rezervasyon:', this.selectedReservation);
      } else {
        console.log('Rezervasyon bulunamadı');
      }
    }
  }

  // Durum değiştiğinde güncelle
  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Type assertion
    const selectedStatus = selectElement.value; // Now 'value' is recognized

    if (this.selectedReservation) {
      this.selectedReservation.status = selectedStatus; // Rezervasyon durumu güncellendi
    }
  }

  onReservationSelect(reservation: any): void {
    this.selectedReservation = reservation;
  
    // Formu seçili rezervasyonla güncelle
    this.reservationForm.patchValue({
      reservation: reservation.reservationId,
      room_id: reservation.roomId,
      reservation_status: reservation.status,
      room_type_name: reservation.RoomTypeName
    });
  
    console.log('Seçili Rezervasyon:', this.selectedReservation);
  }
  

  submitForm(): void {
    const reservationId = this.selectedReservation?.reservationId; // Seçilen rezervasyon ID'si
    const roomId = this.reservationForm.value.room_id; // Formdan oda ID'si
  
    if (this.reservationForm.valid && reservationId) {
      this.reservationService.updateReservationStatus(reservationId, this.reservationForm.value.reservation_status, roomId)
        .subscribe(
          response => {
            console.log('Rezervasyon başarıyla güncellendi', response);
            alert('Rezervasyon başarıyla güncellendi!');
            
          },
          error => {
            console.error('Rezervasyon güncellenemedi', error);
          }
        );
    } else {
      console.log('Form geçerli değil veya rezervasyon ID eksik.');
    }
  }
  







}
