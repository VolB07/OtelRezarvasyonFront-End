import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5179/api/Hotels';

  constructor(private http: HttpClient) { }

  addHotel(hotelData: any): Observable<any> {
    return this.http.post(this.apiUrl, hotelData);
  }

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateHotel(hotelId: number, updatedHotel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${hotelId}`, updatedHotel);
  }

  deleteHotel(hotelId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${hotelId}`);
  }

  // Otel filtreleme isteği
  // hotel.service.ts
  filterHotels(filter: { address?: string; star_rating?: number | null }): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:5179/api/Hotels/filter', filter);
  }

  // Oteli ID'ye göre getiren fonksiyon
  getHotelById(hotelId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${hotelId}`);
  }

}
