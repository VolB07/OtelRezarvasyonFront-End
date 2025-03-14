import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5179/api/Reservations'; // API URL'si

  constructor(private http: HttpClient) { }

  // Yeni rezervasyon oluşturma
  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.apiUrl, reservationData);
  }

  // Tüm rezervasyonları getirme
  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ID'ye göre rezervasyonu getirme
  getReservationById(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reservationId}`);
  }

  // Rezervasyonu güncelleme
  updateReservation(reservationId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reservationId}`, updatedData);
  }

  // Rezervasyonu silme
  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservationId}`);
  }

  getReservationsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  // Otel ID'sine göre beklemedeki rezervasyonları getirme
  getReservationsByHotelId(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  // Rezervasyon Durumu Güncelleme
  updateReservationStatus(reservationId: number, status: string, roomId: number | null): Observable<any> {
    const body = { status, room_id: roomId }; // status ve room_id'yi birlikte gönderiyoruz
    return this.http.put(`${this.apiUrl}/${reservationId}`, body);
  }

}
