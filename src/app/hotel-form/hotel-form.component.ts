import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HotelService } from 'C:/otelRezervasyonUygulamasi/src/app/hotel.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class HotelFormComponent {
  hotelForm: FormGroup;

  constructor(private fb: FormBuilder, private hotelService: HotelService) {
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
    debugger
    if (this.hotelForm.valid) {
      const userId = localStorage.getItem('userId'); // Local storage'den userId al
      if (!userId) {
        alert('Kullanıcı kimliği bulunamadı. Lütfen giriş yapın.');
        return;
      }

      const hotelData = {
        ...this.hotelForm.value, // Formdaki tüm verileri kopyala
        user_id: +userId // userId'yi ekle ve string'den sayıya dönüştür
      };

      console.log("Otel verileri:", hotelData);

      this.hotelService.addHotel(hotelData).subscribe(
        response => {
          console.log("Otel başarıyla eklendi:", response);
          alert('Otel başarıyla eklendi!');
          this.hotelForm.reset();
        },
        error => {
          console.error("Otel eklenirken bir hata oluştu:", error);
          alert('Otel eklenirken bir hata oluştu.');
        }
      );
    } else {
      console.log("Form geçersiz");
      alert('Lütfen tüm alanları doğru doldurun.');
    }
  }
}
