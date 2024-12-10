import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule] // RouterModule burada eklendi
})
export class LoginComponent {
  loginForm: FormGroup;
  isMenuOpen: boolean = false;

  ngOnInit() {
  const token = this.authService.getToken();
  if (token) {
    console.log('Yükleme sırasında alınan token:', token);
  } else {
    console.log('Token bulunamadı');
  }
}

  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // Router burada inject edildi
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:5179/api/Users/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Giriş başarılı:', response);
            if (response && response.token) {
              const token = response.token;
              localStorage.setItem('token', token);
  
              // Kullanıcı ID'sini kaydet
              if (response.userId) {
                localStorage.setItem('userId', response.userId);
                console.log('Kullanıcı ID kaydedildi:', response.userId);
              }
  
              // Kullanıcı rolünü kaydet
              if (response.role) {
                localStorage.setItem('role', response.role);
                console.log('Kullanıcı rolü kaydedildi:', response.role);
              }
  
              // Rol bazlı yönlendirme
              if (response.role === 'admin' || response.role === 'receptionist' || response.role === 'cleaner' || response.role === 'chef') {
                this.router.navigate(['/admin']); // Admin paneline yönlendirme
              } else {
                this.router.navigate(['/']); // Ana sayfaya yönlendirme
              }
            } else {
              alert('Token alınamadı. Lütfen tekrar deneyin.');
            }
          },
          error: (error) => {
            console.log('Giriş hatası:', error);
            alert('Giriş sırasında bir hata oluştu. Lütfen kontrol edin.');
          }
        });
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }
  
  
  



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.getElementById('menu');
    if (this.isMenuOpen) {
      menu?.classList.add('show-menu');
    } else {
      menu?.classList.remove('show-menu');
    }
  }
}
