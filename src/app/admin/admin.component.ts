import { Component } from '@angular/core';
import { HotelFormComponent } from "../hotel-form/hotel-form.component"; // Otel ekleme formu
import { EditHotelComponent } from "../edit-hotel/edit-hotel.component"; // Otel düzenleme formu
import { RoomManagementFormComponent } from "../room-management-form/room-management-form.component"; // Oda yönetim formu
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [HotelFormComponent, EditHotelComponent, RoomManagementFormComponent, CommonModule],
  standalone: true,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isHotelFormVisible: boolean = false;
  isEditHotelFormVisible: boolean = false; // Otel düzenleme formu için yeni bir değişken
  isRoomManagementFormVisible: boolean = false; // Oda yönetim formu için yeni bir değişken

  toggleHotelForm() {
    this.isHotelFormVisible = !this.isHotelFormVisible;
    this.isEditHotelFormVisible = false; // Otel ekleme formunu açtığınızda düzenleme formunu kapat
    this.isRoomManagementFormVisible = false; // Oda yönetim formunu kapat
    console.log("Otel form visibility toggled:", this.isHotelFormVisible);
  }

  toggleEditHotelForm() {
    this.isEditHotelFormVisible = !this.isEditHotelFormVisible;
    this.isHotelFormVisible = false; // Düzenleme formunu açtığınızda ekleme formunu kapat
    this.isRoomManagementFormVisible = false; // Oda yönetim formunu kapat
    console.log("Otel düzenleme form visibility toggled:", this.isEditHotelFormVisible);
  }

  toggleRoomManagementForm() {
    this.isRoomManagementFormVisible = !this.isRoomManagementFormVisible;
    this.isHotelFormVisible = false; // Oda yönetim formunu açtığınızda ekleme formunu kapat
    this.isEditHotelFormVisible = false; // Oda yönetim formunu açtığınızda düzenleme formunu kapat
    console.log("Oda yönetim form visibility toggled:", this.isRoomManagementFormVisible);
  }
}
