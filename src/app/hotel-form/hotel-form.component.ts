import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Burayı ekle
import { HotelService } from 'C:/otelRezervasyonUygulamasi/src/app/hotel.service'; // Servisi içe aktar

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] // Burayı güncelle
})
export class HotelFormComponent {
  hotelForm: FormGroup;

  constructor(private fb: FormBuilder, private hotelService: HotelService) { // Servisi ekle
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      star_rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      image_url: ['']
    });
  }

  onSubmit() {
    if (this.hotelForm.valid) {
      console.log("Otel verileri:", this.hotelForm.value);
      this.hotelService.addHotel(this.hotelForm.value).subscribe(
        response => {
          console.log("Otel başarıyla eklendi:", response);
          alert('Otel eklendi!');
          // Başarılı ekleme işlemi için gerekli işlemleri yapabilirsiniz
          this.hotelForm.reset(); // Formu sıfırlamak için
        },
        error => {
          console.error("Otel eklenirken bir hata oluştu:", error);
        }
      );
    } else {
      console.log("Form geçersiz");
    }
  }
}
