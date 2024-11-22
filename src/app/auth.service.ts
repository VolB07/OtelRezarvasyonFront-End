import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private token: string | null = null;





  getTokenExpiration(token: string): Date | null {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp ? new Date(decoded.exp * 1000) : null;
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpiration(token);
    return expirationDate ? new Date() > expirationDate : false;
  }

  // Token ayarlama metodu
  setToken(token: string) {
    if (this.isTokenExpired(token)) {
      this.clearToken();
      console.log('Token expired, clearing token');
      return;
    }
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      console.log('Token saved to localStorage:', localStorage.getItem('token'));
    }
  }



  // Token alma metodu
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = this.token || localStorage.getItem('token');
      return token;
    }
    return null;
  }

  // Token'ı temizleme metodu
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); // Token'ı localStorage'dan kaldırıyoruz
      console.log('Token temizlendi');
    }
  }

  // Token'ı header olarak döndürme metodu
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    console.log('Auth Headers:', token ? `Bearer ${token}` : 'Token yok'); // Header'ı görmek için log ekledik
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Token'ın geçerli olup olmadığını kontrol etme metodu
  isAuthenticated(): boolean {
    const token = this.getToken(); 
    return token !== null; // Token varsa, kullanıcı doğrulandı demektir
  }

  // Kullanıcı giriş durumunu kontrol etme metodu
  isLoggedIn(): boolean {
    return this.isAuthenticated(); // Bu, isAuthenticated metodunu çağırır
  }

  // Kullanıcı bilgilerini almak için metot
  getUserInfo(): any {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      console.log('Kullanıcı bilgisi:', user); // Kullanıcı bilgilerini görmek için log ekledik
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Kullanıcı bilgilerini localStorage'a kaydetme metodu
  setUserInfo(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user)); // Kullanıcı bilgilerini localStorage'a kaydediyoruz
      console.log('Kullanıcı bilgisi set edildi:', user); // Kullanıcı bilgilerini görmek için log ekledik
    }
  }

  // Kullanıcı ID'sini almak için metot
  getUserId(): number | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem('userId');
      console.log('Kullanıcı ID\'si:', userId); // Kullanıcı ID'sini görmek için log ekledik
      return userId ? parseInt(userId) : null;
    }
    return null;  // Eğer localStorage mevcut değilse null döndür
  }
  
  

}
