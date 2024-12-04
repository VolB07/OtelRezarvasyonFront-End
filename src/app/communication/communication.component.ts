import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css'],
})
export class CommunicationComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
  
      // Kullanıcı ID'sini localStorage'dan alın ve integer'a çevirin
      const userId = parseInt(localStorage.getItem('userId') || '0', 10);  // default '0' ekledim, eğer userId bulunamazsa
      
  
      if (!userId) {
        alert('Kullanıcı kimliği bulunamadı!');
        return;
      }
  
      // Form verilerine UserId ekleyin
      const requestData = { ...formData, user_id: userId };
      
  
      // HTTP isteğini gönderin
      this.http.post('http://localhost:5179/api/SupportRequests', requestData)
        .subscribe({
          next: (response) => {
            alert('Mesajınız başarıyla gönderildi.');
            this.contactForm.reset();
          },
          error: (err) => {
            alert('Mesaj gönderilirken bir hata oluştu.');
            console.error(err);
          },
        });
    } else {
      alert('Lütfen tüm alanları doğru şekilde doldurun.');
    }
  }
  
  
}
