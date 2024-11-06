import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  // Token ayarlama metodu
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') { // Tarayıcıda olduğumuzu kontrol et
      localStorage.setItem('token', token); // Token'ı localStorage'a kaydediyoruz
    }
  }

  // Token alma metodu
  getToken(): string | null {
    if (typeof window !== 'undefined') { // Tarayıcıda olduğumuzu kontrol et
      return localStorage.getItem('token');
    }
    return null; // Tarayıcıda değilsek null döndür
  }

  // Token'ı temizleme metodu
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') { // Tarayıcıda olduğumuzu kontrol et
      localStorage.removeItem('token'); // Token'ı localStorage'dan kaldırıyoruz
    }
  }

  // Token'ın geçerli olup olmadığını kontrol etme metodu
  isAuthenticated(): boolean {
    return this.getToken() !== null; // Token'ın varlığını kontrol et
  }

  // Kullanıcı giriş durumunu kontrol etme metodu
  isLoggedIn(): boolean {
    return this.isAuthenticated(); // Bu, isAuthenticated metodunu çağırır
  }
}
