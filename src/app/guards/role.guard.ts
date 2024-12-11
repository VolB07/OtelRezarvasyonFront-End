import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Tarayıcı ortamında olup olmadığını kontrol et
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role'); // Role bilgisini localStorage'dan al
      if (
        role === 'admin' || 
        role === 'receptionist' || 
        role === 'chef' || 
        role === 'cleaner'
      ) {
        // Belirtilen rollere izin ver
        return true;
      }
    }

    // Yetkisi olmayan kullanıcıyı yönlendir
    // this.router.navigate(['/unauthorized']); // Unauthorized sayfasına yönlendirme
    return false;
  }
}
