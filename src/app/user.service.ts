import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Assuming you have an AuthService to manage JWT

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5179/api/Users'; // ASP.NET Core API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getRole(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5179/api/users/role/${userId}`);
  }


  assignRole(userId: number, role: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5179/api/Users/role/${userId}`, 
      JSON.stringify(role), // Role'ü JSON olarak göndermek için stringify kullanıyoruz
      { headers: { 'Content-Type': 'application/json' } } // Content-Type'ı belirt
    );
  }
  
  
  


}
