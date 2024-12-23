import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:5179/api/Employees';  // API URL'si

  constructor(private http: HttpClient) {}

  // Tüm çalışanları getir
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Çalışanın rolünü getir
  getEmployeesByHotel(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/role/${employeeId}`);
  }

  // Rol atama işlemi
  assignRole(employeeId: number, roleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/assign-role/${employeeId}`, roleData);
  }
  
  

  // Çalışan ekleme işlemi
  addEmployee(employeeData: any): Observable<any> {
    return this.http.post('http://localhost:5179/api/Employees', employeeData, { responseType: 'json' });
  }
  
  
  
  

  // Çalışan güncelleme işlemi
  updateEmployee(employeeId: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${employeeId}`, employee);  // Çalışan bilgilerini güncellemek için PUT isteği
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${employeeId}`);
  }
}
