import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../user.service'; // Servis dosyasının doğru yolu
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: object // Tarayıcı kontrolü için platform ID
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Sadece tarayıcı ortamında çalıştırılır
      const userId = Number(localStorage.getItem('userId'));
      if (userId) {
        this.userService.getUserById(userId).subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (err) => {
            console.error('Kullanıcı bilgileri alınamadı:', err);
          },
        });
      }
    }
  }
}
