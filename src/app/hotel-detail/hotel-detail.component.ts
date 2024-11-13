import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
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
    const id = Number(hotelId); // Convert the hotelId to a number
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

  assignRoomTypesToRooms(): void {
    if (this.rooms.length && this.roomTypes.length) {
      this.rooms = this.rooms.map(room => {
        const roomType = this.roomTypes.find(rt => rt.id === room.room_type_id);
        return { 
          ...room, 
          typeName: roomType ? roomType.name : 'No Type',
          typeImage: roomType && roomType.image ? roomType.image : 'default-image.jpg'
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
}
