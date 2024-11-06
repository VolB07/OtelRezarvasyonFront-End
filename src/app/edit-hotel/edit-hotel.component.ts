import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../hotel.service'; // Servis dosyanızı buradan import edin
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditHotelComponent implements OnInit {
  editHotelForm: FormGroup;
  hotels: any[] = []; // Otel listesini tutmak için bir dizi

  constructor(private fb: FormBuilder, private hotelService: HotelService) {
    this.editHotelForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      star_rating: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image_url: [''],
      address: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadHotels(); // Otel listesini yükle
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(data => {
      this.hotels = data; // Alınan veriyi otel listesine ata
    });
  }

  onHotelSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value); // ID'yi number'a dönüştür
    console.log('Selected Hotel ID:', id); // Seçilen ID'yi kontrol et
  
    if (id && this.hotels) {
      const selectedHotel = this.hotels.find(hotel => hotel.id === id);
      if (selectedHotel) {
        this.editHotelForm.patchValue({
          id: selectedHotel.id, // Hotel ID'sini forma ekle
          name: selectedHotel.name,
          phone: selectedHotel.phone,
          star_rating: selectedHotel.star_rating,
          email: selectedHotel.email,
          image_url: selectedHotel.image_url,
          address: selectedHotel.address,
          description: selectedHotel.description
        });
        console.log('Form Updated with Hotel Details:', this.editHotelForm.value);
      }
    }
  }
  
  
  onUpdate(): void {
    debugger
    if (this.editHotelForm.valid) {
      const id = Number(this.editHotelForm.get('id')?.value); // hotelId'yi al ve number'a çevir
      console.log('Updating Hotel ID:', id); // ID'nin doğru geldiğini kontrol et
      const updatedHotel = { ...this.editHotelForm.value };
      
      //delete updatedHotel.hotelId; // ID'yi API'ye gönderirken kaldırıyoruz
  
      this.hotelService.updateHotel(id, updatedHotel).subscribe(
        response => {
          console.log('Otel güncellendi:', response);
          alert('Otel güncellendi!');
          this.editHotelForm.reset();
        },
        error => {
          console.error('Güncellenirken hata:', error);
        }
      );
    } else {
      console.log('Form geçerli değil');
    }
  }
  
  

  onDelete(): void {
    const id = this.editHotelForm.get('id')?.value; // Otel ID'sini al
    this.hotelService.deleteHotel(id).subscribe(response => {
      console.log('Otel silindi:', response);
      alert('Otel silindi!');
      this.editHotelForm.reset();
    }, error => {
      console.error('Silme sırasında hata:', error);
    });
  }
}
