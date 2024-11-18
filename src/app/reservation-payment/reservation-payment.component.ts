import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { ReservationService } from '../reservations.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-payment',
  templateUrl: './reservation-payment.component.html',
  styleUrls: ['./reservation-payment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReservationPaymentComponent implements OnInit {
  hotelId: string = '';  
  roomId: string = '1';  // Default room ID
  hotel: any = null;  
  selectedRoom: any = null;  
  checkInDate: string = '';  
  checkOutDate: string = '';  
  totalPrice: number = 0;  
  selectedHotel: any;

  // Payment information (not saved in database)
  cardNumber: string = ''; 
  expiryDate: string = ''; 
  cvv: string = ''; 

  loggedInUserId: number = 1;  // Example logged in user ID (this should be fetched dynamically)

  constructor(
    private route: ActivatedRoute,  
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('hotelId') || '';  
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '2';  
    this.getHotelDetails(this.hotelId);  
    this.getRoomDetails(this.hotelId);
  }
  
  // Fetch hotel details
  getHotelDetails(hotelId: string): void {
    if (!hotelId) return;
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel) => {
        if (hotel) {
          this.hotel = hotel;
        } else {
          console.error('Hotel not found');
        }
      },
      error: (err) => {
        console.error('Error fetching hotel details:', err);
        alert('Could not load hotel details');
      }
    });
  }

  // Fetch room details based on the hotel ID
  getRoomDetails(hotelId: string): void {
    if (!hotelId) return;
    this.roomService.getRoomsByHotelId(hotelId).subscribe({
      next: (rooms) => {
        if (rooms && rooms.length > 0) {
          this.selectedRoom = rooms.find(room => room.id === parseInt(this.roomId));
          if (this.selectedRoom) {
            this.getRoomTypeName(this.selectedRoom.room_type_id);
            this.calculateTotalPrice();
          }
        } else {
          console.error('No rooms found');
        }
      },
      error: (err) => {
        console.error('Error fetching room details:', err);
        alert('Room details could not be fetched');
      }
    });
  }
  
  // Fetch room type name based on room type ID
  getRoomTypeName(roomTypeId: number): void {
    if (!roomTypeId) return;
    this.roomService.getRoomTypeById(roomTypeId).subscribe({
      next: (roomType) => {
        if (roomType) {
          this.selectedRoom.roomTypeName = roomType.name;
        }
      },
      error: (err) => {
        console.error('Error fetching room type info:', err);
        alert('Room type info could not be fetched');
      }
    });
  }

  // Calculate total price based on check-in and check-out dates
  calculateTotalPrice(): number {
    if (this.checkInDate && this.checkOutDate && this.selectedRoom) {
      const checkIn = new Date(this.checkInDate);
      const checkOut = new Date(this.checkOutDate);

      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); 

      this.totalPrice = this.selectedRoom.base_price * diffDays;

      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
    }
    return this.totalPrice;  // Return the total price directly here
  }

  // Create reservation after successful payment
  createReservation(): void {
    console.log('Selected Room:', this.selectedRoom);  // selectedRoom doğru gelmiş mi kontrol et
    console.log('Logged In User ID:', this.loggedInUserId);  // loggedInUserId doğru gelmiş mi kontrol et
    console.log('Check-in Date:', this.checkInDate);  // Check-in tarihi doğru mu?
    console.log('Check-out Date:', this.checkOutDate);  // Check-out tarihi doğru mu?
  
    if (!this.selectedRoom) {
      alert('Oda seçilmedi!');
      return;
    }
    if (!this.loggedInUserId) {
      alert('Kullanıcı bilgisi bulunamadı!');
      return;
    }
    if (!this.checkInDate || !this.checkOutDate) {
      alert('Lütfen giriş ve çıkış tarihlerini girin!');
      return;
    }
  
    const reservation = {
      user_id: this.loggedInUserId,  // Giriş yapan kullanıcının ID'si
      room_id: this.selectedRoom.id,  // Seçilen odanın ID'si
      check_in_date: this.checkInDate,  // Giriş tarihi
      check_out_date: this.checkOutDate,  // Çıkış tarihi
      total_price: this.calculateTotalPrice()  // Toplam fiyat
    };
  
    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        console.log('Rezervasyon başarıyla oluşturuldu!', response);
        this.router.navigate(['/rezervasyonlar']);
      },
      (error) => {
        console.error('Rezervasyon oluşturulurken hata oluştu', error);
      }
    );
  }
  
  

  
}

// Reservation interface (update if necessary)
export interface Reservation {
  id?: number;
  userId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}
