import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class KitchenManagementService {
  private apiUrl = 'https://localhost:5179/api'; // Backend API base URL
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Malzemelerle ilgili API çağrıları
  getMaterials(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Materials`);
  }

  addMaterial(material: any): Observable<any> {
    console.log('Adding new material:', material);
    return this.http.post(`${this.apiUrl}/Materials`, material, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error adding material:', error);
        return throwError(error);
      })
    );
  }
  
  
  

  updateMaterial(materialId: number, material: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Materials/${materialId}`, material, { headers: this.headers });
  }

  deleteMaterial(materialId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Materials/${materialId}`);
  }

  // Yemeklerle ilgili API çağrıları
  getDishes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Dishes`);
  }

  addDish(dish: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Dishes`, dish, { headers: this.headers });
  }

  updateDish(dishId: number, dish: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Dishes/${dishId}`, dish, { headers: this.headers });
  }

  deleteDish(dishId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Dishes/${dishId}`);
  }

  // Stok tüketimi API çağrıları
  getStockConsumptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/StockConsumptions`);
  }

  addStockConsumption(stockConsumption: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/StockConsumptions`, stockConsumption, { headers: this.headers });
  }

  updateStockConsumption(stockConsumptionId: number, stockConsumption: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/StockConsumptions/${stockConsumptionId}`, stockConsumption, { headers: this.headers });
  }

  deleteStockConsumption(stockConsumptionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/StockConsumptions/${stockConsumptionId}`);
  }

  // İşlem logları API çağrıları
  getLogs(filterDate?: string): Observable<any> {
    const url = filterDate ? `${this.apiUrl}/StockLogs?date=${filterDate}` : `${this.apiUrl}/StockLogs`;
    return this.http.get(url);
  }

  addLog(log: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/StockLogs`, log, { headers: this.headers });
  }

  getMenuDishes(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/menus/${menuId}/dishes`); // API endpoint'i burada düzenlenebilir
  }

  updateStock(stockId: string, updatedStock: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/stock/${stockId}`, updatedStock); // API endpoint'i burada düzenlenebilir
  }

  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/menus`);  // Menüler endpoint'i
  }
}
