import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-management-form',
  templateUrl: './role-management-form.component.html',
  styleUrls: ['./role-management-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule]
})
export class RoleManagementFormComponent implements OnInit {
  users: any[] = []; // Kullanıcı listesini tutacak
  roles: string[] = ['admin', 'receptionist', 'chef', 'cleaner', 'user']; // Roller
  selectedUserId: number | null = null; // Seçilen kullanıcı ID'si
  selectedRole: string | null = null; // Seçilen rol

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Kullanıcıları yükle
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Kullanıcıları ata
        console.log('Users loaded:', this.users);
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  // Kullanıcı seçildiğinde rolü al
  onUserSelect(): void {
    if (this.selectedUserId) {
      this.userService.getRole(this.selectedUserId).subscribe({
        next: (data) => {
          this.selectedRole = data.role; // Backend'den dönen rolü ata
          console.log(`Role for user ID ${this.selectedUserId} is ${this.selectedRole}`);
        },
        error: (err) => {
          console.error('Error fetching role:', err);
        }
      });
    } else {
      this.selectedRole = null; // Kullanıcı seçilmediğinde rolü temizle
    }
  }

  // Rol atama
  assignRole(): void {
    if (this.selectedUserId && this.selectedRole) {
      console.log(`Assigning role ${this.selectedRole} to user ID ${this.selectedUserId}`);
      
      // Rolü string olarak backend'e gönder
      this.userService.assignRole(this.selectedUserId, this.selectedRole).subscribe({
        next: () => {
          alert('Rol başarıyla atandı!');
        },
        error: (err) => {
          console.error('Error assigning role:', err);
          alert('Rol atama işlemi başarısız oldu.');
        }
      });
    } else {
      alert('Lütfen bir kullanıcı ve rol seçin.');
    }
  }
  
}
