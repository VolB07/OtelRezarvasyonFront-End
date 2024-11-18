import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HotelDetailComponent implements OnInit {
  hotel: any;
  rooms: any[] = [];
  roomTypes: any[] = [];
  isMenuOpen: boolean = false;
  hotelId: string = '';  // Make sure this is a string or number, depending on your route parameter

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.hotelId = hotelId;  // Save the hotelId for later use
      this.fetchHotelDetails(hotelId);
      this.fetchAvailableRooms(hotelId);
      this.fetchRoomTypes();
    }
  }

  fetchHotelDetails(hotelId: string): void {
    this.hotelService.getHotelById(hotelId).subscribe((data) => {
      this.hotel = data;
    });
  }

  fetchAvailableRooms(hotelId: string): void {
    const id = Number(hotelId); 
    if (!isNaN(id)) {
      this.roomService.getRoomsByHotel(id).subscribe((roomsData) => {
        this.rooms = roomsData;
        this.assignRoomTypesToRooms();
      });
    }
  }

  fetchRoomTypes(): void {
    this.roomService.getRoomTypes().subscribe((roomTypesData) => {
      this.roomTypes = roomTypesData;
      this.assignRoomTypesToRooms();
    });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  assignRoomTypesToRooms(): void {
    if (this.rooms.length && this.roomTypes.length) {
      this.rooms = this.rooms.map(room => {
        const roomType = this.roomTypes.find(rt => rt.id === room.room_type_id);
        return { 
          ...room, 
          typeName: roomType ? roomType.name : 'Tip Belirtilmemiş',
          typeImage: roomType && roomType.image_url ? this.sanitizeImageUrl(roomType.image_url) : 'C:/otelRezervasyonUygulamasi/src/app/img/logo.png'
        };
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.getElementById('menu');
    if (this.isMenuOpen) {
      menu?.classList.add('show-menu');
    } else {
      menu?.classList.remove('show-menu');
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.clearToken();
  }

  // Add booking function and redirect to booking confirmation page
  bookRoom(roomId: number): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/reservation-payment', this.hotelId, roomId]);  // Hotel ve Room ID'yi yönlendiriyoruz
    } else {
      alert('Lütfen giriş yapın!');
      this.router.navigate(['/login']);
    }
  }
  

  // Correctly defined goToReservationPage outside of bookRoom method
  goToReservationPage(hotelId: string): void {
    this.router.navigate(['/reservation-payment', hotelId]);  // Corrected: Navigating to the reservation page with hotelId
  }
}
