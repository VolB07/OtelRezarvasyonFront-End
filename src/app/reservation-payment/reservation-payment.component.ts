import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { ReservationService } from '../reservations.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';  // AuthService'i import ettik
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

  cardNumberPattern: string = '^[0-9]{4}(?:[ ]?[0-9]{4}){3}$';  // 1234 5678 1234 5678
  expiryDatePattern: string = '^(0[1-9]|1[0-2])\/([0-9]{2})$'; // MM/YY
  cvvPattern: string = '^[0-9]{3}$';  // 3 haneli sayılar

  // Payment information (not saved in database)
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  loggedInUserId: number = 1;  // Başlangıçta bir değer atanmıştı ancak artık dinamik olarak alacağız

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private router: Router,
    private authService: AuthService,  // AuthService bağımlılığı ekledik
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('hotelId') || '';
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '2';
    this.getHotelDetails(this.hotelId);
    this.getRoomDetails(this.hotelId);
  
    // Kullanıcı ID'sini AuthService'ten alıyoruz
    this.loggedInUserId = this.authService.getUserId() ?? 1;  // Eğer kullanıcı ID'si yoksa 1 kullanılıyor (ancak bu durumda, dinamik olmalı)
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

  createReservation(): void {
    debugger
    console.log('Selected Room:', this.selectedRoom);  // selectedRoom doğru gelmiş mi kontrol et
    console.log('Logged In User ID:', this.loggedInUserId);  // ID doğru geliyor mu?
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

    // Tarihlerin sıralamasını kontrol et
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (checkOut <= checkIn) {
      alert('Çıkış tarihi, giriş tarihinden sonra olmalıdır!');
      return;
    }

    const reservation = {
      user_id: this.loggedInUserId,  // Giriş yapan kullanıcının ID'si
      room_id: this.selectedRoom.id,  // Seçilen odanın ID'si
      check_in: new Date(this.checkInDate).toISOString(), // Giriş tarihini ISO formatına çevir
      check_out: new Date(this.checkOutDate).toISOString(), // Çıkış tarihini ISO formatına çevir
      total_price: this.calculateTotalPrice()  // Toplam fiyat
    };

    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        alert('Rezervasyon başarılı, rezarvasyonlarım ekranına aktarılacaksınız!');
        this.router.navigate(['/reservations']);
      },
      (error) => {
        console.error('Rezervasyon oluşturulurken hata oluştu', error);
      }
    );
  }
  // Format Kart Numarası: 1234 5678 1234 5678
  formatCardNumber(): void {
    const value = this.cardNumber.replace(/\D/g, '');  // Sadece rakamları al
    let formatted = '';

    for (let i = 0; i < value.length; i++) {
      if (i % 4 === 0 && i > 0) {
        formatted += ' ';
      }
      formatted += value[i];
    }

    this.cardNumber = formatted;
  }

  // Format Son Kullanma Tarihi: MM/YY
  formatExpiryDate(): void {
    let value = this.expiryDate.replace(/\D/g, '');  // Sadece rakamları al
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    this.expiryDate = value;
  }

   // Kart Numarası Validation
   isCardNumberValid(): boolean {
    const regex = new RegExp(this.cardNumberPattern);
    return regex.test(this.cardNumber);
  }

  // Son Kullanma Tarihi Validation
  isExpiryDateValid(): boolean {
    const regex = new RegExp(this.expiryDatePattern);
    return regex.test(this.expiryDate);
  }

  // CVV Validation
  isCvvValid(): boolean {
    const regex = new RegExp(this.cvvPattern);
    return regex.test(this.cvv);
  }
}


