import { Component } from '@angular/core';
import { HotelFormComponent } from "../hotel-form/hotel-form.component"; // Otel ekleme formu
import { EditHotelComponent } from "../edit-hotel/edit-hotel.component"; // Otel düzenleme formu
import { RoomManagementFormComponent } from "../room-management-form/room-management-form.component"; // Oda yönetim formu
import { CommonModule } from '@angular/common';
import { RoleManagementFormComponent } from '../role-management-form/role-management-form.component';
import { ReceptionFormComponent } from '../reception-form/reception-form.component';
import { KitchenManagementFormComponent } from '../kitchen-management-form/kitchen-management-form.component';
import { HousekeepingManagementComponent } from '../housekeeping-management/housekeeping-management.component';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [HotelFormComponent, EditHotelComponent, RoomManagementFormComponent,RoleManagementFormComponent, CommonModule, ReceptionFormComponent, KitchenManagementFormComponent, HousekeepingManagementComponent],
  standalone: true,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isHotelFormVisible: boolean = false;
  isEditHotelFormVisible: boolean = false; // Otel düzenleme formu için yeni bir değişken
  isRoomManagementFormVisible: boolean = false; // Oda yönetim formu için yeni bir değişken
  isRoleManagementFormVisible: boolean = false;
  isReceptionFormVisible: boolean = false;
  isKitchenManagementFormVisible: boolean = false;
  isHousekeepingManagementFormVisible: boolean = false;

  toggleHotelForm() {
    this.isHotelFormVisible = !this.isHotelFormVisible;
    this.isEditHotelFormVisible = false; // Otel ekleme formunu açtığınızda düzenleme formunu kapat
    this.isRoomManagementFormVisible = false; // Oda yönetim formunu kapat
    this.isRoleManagementFormVisible = false;
    this.isReceptionFormVisible = false;
    this.isKitchenManagementFormVisible = false;
    this.isHousekeepingManagementFormVisible = false;
    console.log("Otel form visibility toggled:", this.isHotelFormVisible);
  }

  toggleEditHotelForm() {
    this.isEditHotelFormVisible = !this.isEditHotelFormVisible;
    this.isHotelFormVisible = false; // Düzenleme formunu açtığınızda ekleme formunu kapat
    this.isRoomManagementFormVisible = false; // Oda yönetim formunu kapat
    this.isRoleManagementFormVisible = false;
    this.isReceptionFormVisible = false;
    this.isKitchenManagementFormVisible = false;
    this.isHousekeepingManagementFormVisible = false;
    console.log("Otel düzenleme form visibility toggled:", this.isEditHotelFormVisible);
  }

  toggleRoomManagementForm() {
    this.isRoomManagementFormVisible = !this.isRoomManagementFormVisible;
    this.isHotelFormVisible = false; // Oda yönetim formunu açtığınızda ekleme formunu kapat
    this.isEditHotelFormVisible = false; // Oda yönetim formunu açtığınızda düzenleme formunu kapat
    this.isRoleManagementFormVisible = false;
    this.isReceptionFormVisible = false;
    this.isKitchenManagementFormVisible = false;
    this.isHousekeepingManagementFormVisible = false;
    console.log("Oda yönetim form visibility toggled:", this.isRoomManagementFormVisible);
  }

  toggleRoleManagementForm() {
    this.isRoleManagementFormVisible = !this.isRoleManagementFormVisible;
    this.isHotelFormVisible = false;
    this.isEditHotelFormVisible = false;
    this.isRoomManagementFormVisible = false;
    this.isReceptionFormVisible = false;
    this.isKitchenManagementFormVisible = false;
    this.isHousekeepingManagementFormVisible = false;
  }

  toggleReceptionForm() {
    this.isReceptionFormVisible = !this.isReceptionFormVisible;
    this.isHotelFormVisible = false;
    this.isEditHotelFormVisible = false;
    this.isRoomManagementFormVisible = false;
    this.isRoleManagementFormVisible = false;
    this.isKitchenManagementFormVisible = false;
    this.isHousekeepingManagementFormVisible = false;
    console.log('Reception form visibility toggled:', this.isReceptionFormVisible);
  }

  toggleKitchenManagementForm() {
    this.isKitchenManagementFormVisible = !this.isKitchenManagementFormVisible;
    this.isHotelFormVisible = false;
    this.isEditHotelFormVisible = false;
    this.isRoomManagementFormVisible = false;
    this.isRoleManagementFormVisible = false;
    this.isReceptionFormVisible = false;
    this.isHousekeepingManagementFormVisible = false;
  }

  toggleHousekeepingManagementForm(){
    this.isHousekeepingManagementFormVisible = !this.isHousekeepingManagementFormVisible;
    this.isHotelFormVisible = false;
    this.isEditHotelFormVisible = false;
    this.isRoomManagementFormVisible = false;
    this.isRoleManagementFormVisible = false;
    this.isReceptionFormVisible = false;
    this.isKitchenManagementFormVisible = false;
  }
}
