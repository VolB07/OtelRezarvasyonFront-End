import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'C:/otelRezervasyonUygulamasi/src/app/hotel.service';
import { RoomService } from 'C:/otelRezervasyonUygulamasi/src/app/room.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-management-form',
  templateUrl: './room-management-form.component.html',
  styleUrls: ['./room-management-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RoomManagementFormComponent implements OnInit {
  roomForm: FormGroup;
  hotels: any[] = [];
  roomTypes: any[] = [];
  isLoading: boolean = true; // Yükleme durumunu takip etmek için

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {
    this.roomForm = this.fb.group({
      hotel_id: ['', Validators.required],
      room_type_id: ['', Validators.required],
      base_price: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoomTypes();
    this.loadHotels();
  }

  private loadRoomTypes() {
    this.roomService.getRoomTypes().subscribe(
      (roomTypes) => {
        this.roomTypes = roomTypes;
        console.log("Oda tipleri yüklendi:", this.roomTypes);
        this.checkLoadingComplete(); // Yükleme tamamlandı mı kontrol et
      },
      (error) => {
        console.error("Oda tipleri yüklenirken bir hata oluştu:", error);
        this.isLoading = false; // Yükleme hatası durumunda
      }
    );
  }

  private loadHotels() {
    this.hotelService.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels;
        console.log("Oteller yüklendi:", this.hotels);
        this.checkLoadingComplete(); // Yükleme tamamlandı mı kontrol et
      },
      (error) => {
        console.error("Oteller yüklenirken bir hata oluştu:", error);
        this.isLoading = false; // Yükleme hatası durumunda
      }
    );
  }

  private checkLoadingComplete() {
    if (this.hotels.length > 0 && this.roomTypes.length > 0) {
      this.isLoading = false; // Her iki dizi de yüklendiyse yüklemeyi tamamla
    }
  }

onSubmit() {
  if (!this.isLoading && this.roomForm.valid) {
    const formData = {
      hotel_id: this.roomForm.value.hotel_id,
      room_type_id: this.roomForm.value.room_type_id,
      base_price: this.roomForm.value.base_price,
      status: this.roomForm.value.status
    };
    
    this.roomService.addRoom(formData).subscribe(
      response => {
        console.log("Oda başarıyla eklendi:", response);
        alert('Oda eklendi!');
        this.roomForm.reset();
      },
      error => {
        console.error("Oda eklenirken bir hata oluştu:", error);
      }
    );
    
  }
}

}
