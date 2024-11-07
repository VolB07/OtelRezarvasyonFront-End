import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5179/api/Hotels';

  constructor(private http: HttpClient) {}

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
  filterHotels(filters: { city?: string; stars?: number | null }): Observable<any[]> {
    let params = new HttpParams();
    if (filters.city) {
      params = params.set('city', filters.city);
    }
    if (filters.stars !== undefined && filters.stars !== null) {
      params = params.set('stars', filters.stars.toString());
    }
    return this.http.get<any[]>(`${this.apiUrl}/filter`, { params });
  }
}
