import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5179/api/Hotels'; // API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) {}

  // Otel ekleme
  addHotel(hotelData: any): Observable<any> {
    return this.http.post(this.apiUrl, hotelData);
  }

  // Tüm otelleri getirme
  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Otel güncelleme
  updateHotel(hotelId: number, updatedHotel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${hotelId}`, updatedHotel);
  }

  // Otel silme
  deleteHotel(hotelId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${hotelId}`);
  }
}
