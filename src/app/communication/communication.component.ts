import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupportRequestService } from '../support-request.service'; // Servis dosyasını içe aktar

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css'],
})
export class CommunicationComponent {
  contactForm: FormGroup;
  supportRequests: any[] = [];
  isSidebarVisible = false;

  constructor(
    private fb: FormBuilder,
    private supportRequestService: SupportRequestService // Servis üzerinden istekleri yöneteceğiz
  ) {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    if (this.isBrowser()) {
      this.getUserSupportRequests();
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getUserSupportRequests(): void {
    if (!this.isBrowser()) {
      console.error('localStorage tarayıcı ortamında mevcut değil.');
      return;
    }

    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    if (!userId) {
      alert('Kullanıcı kimliği bulunamadı!');
      return;
    }

    this.supportRequestService.getSupportRequests(userId).subscribe({
      next: (requests) => {
        this.supportRequests = requests;
      },
      error: (err) => {
        console.error('Destek istekleri alınırken hata oluştu:', err);
      },
    });
  }

  onSubmit(): void {
    if (!this.isBrowser()) {
      console.error('localStorage tarayıcı ortamında mevcut değil.');
      return;
    }

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const userId = parseInt(localStorage.getItem('userId') || '0', 10);

      if (!userId) {
        alert('Kullanıcı kimliği bulunamadı!');
        return;
      }

      const requestData = { ...formData, user_id: userId };

      this.supportRequestService.createSupportRequest(requestData).subscribe({
        next: () => {
          alert('Mesajınız başarıyla gönderildi.');
          this.contactForm.reset();
          this.getUserSupportRequests();
        },
        error: (err) => {
          if (
            err.status === 400 &&
            err.error === 'You cannot have more than 5 pending support requests.'
          ) {
            alert(
              'Beklemede 5 veya daha fazla mesajınız var. Yeni bir mesaj gönderemezsiniz.'
            );
          } else {
            alert('Mesaj gönderilirken bir hata oluştu.');
          }
          console.error(err);
        },
      });
    } else {
      alert('Lütfen tüm alanları doğru şekilde doldurun.');
    }
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  closeSidebar(): void {
    this.isSidebarVisible = false;
  }
}
