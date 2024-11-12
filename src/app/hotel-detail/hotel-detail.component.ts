import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  standalone: true,
  styleUrls: ['./hotel-detail.component.css'],
  imports: [CommonModule]
})
export class HotelDetailComponent implements OnInit {
  hotel: any;
  rooms: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.fetchHotelDetails(hotelId);
      this.fetchAvailableRooms(hotelId);
    }
  }

  fetchHotelDetails(hotelId: string): void {
    this.hotelService.getHotelById(hotelId).subscribe((data) => {
      this.hotel = data;
    });
  }

  fetchAvailableRooms(hotelId: string): void {
    this.roomService.getRoomsByHotelId(hotelId).subscribe((data) => {
      this.rooms = data;
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

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated(); 
  }

  logout() {
    this.authService.clearToken(); 
  }
}
