import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5179/api/Rooms'; // API URL'sini buraya ekleyin

  constructor(private http: HttpClient) {}

  // Oda ekleme metodu
  addRoom(roomData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, roomData);
  }

  // Oda güncelleme metodu
  updateRoom(roomId: number, roomData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${roomId}`, roomData);
  }

  // Oda silme metodu
  deleteRoom(roomId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${roomId}`);
  }

  // Oda listeleme metodu
  getRoomsByHotel(hotel_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotel/${hotel_id}`);
  }

  getRoomTypes(): Observable<any> {
    return this.http.get(`http://localhost:5179/api/RoomTypes`); // Oda tipleri için doğru endpoint
  }

  getRoomsByHotelId(hotelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?hotelId=${hotelId}`);
  }
}
