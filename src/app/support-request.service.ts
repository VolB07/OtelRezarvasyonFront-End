import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupportRequestService {
  private apiUrl = 'http://localhost:5179/api/SupportRequests'; // API temel URL

  constructor(private http: HttpClient) {}

  /**
   * Kullanıcı destek isteklerini al
   * @param userId Kullanıcı ID'si
   * @returns Kullanıcı destek istekleri
   */
  getSupportRequests(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  /**
   * Yeni bir destek isteği gönder
   * @param requestData Gönderilecek destek isteği verisi
   * @returns Gönderim işleminin sonucu
   */
  createSupportRequest(requestData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, requestData);
  }
}
