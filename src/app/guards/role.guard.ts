import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Role bilgisini localStorage'dan al
    if (role === 'admin' || role === 'receptionist' || role === 'chef' || role === 'cleaner') { // Sadece belirtilen rollere izin ver
      return true;
    } else {
      // Yetkisi olmayan kullanıcıyı yönlendir
      this.router.navigate(['/unauthorized']); // Unauthorized sayfasına yönlendirin (oluşturmanız gerekir)
      return false;
    }
  }
}
