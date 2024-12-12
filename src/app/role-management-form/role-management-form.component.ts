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
  users: any[] = []; // Kullanıcı listesi
  filteredUsers: any[] = []; // Filtrelenmiş kullanıcı listesi
  roles: string[] = ['admin', 'receptionist', 'chef', 'cleaner', 'user'];
  selectedUserId: number | null = null;
  selectedUserName: string | null = null;
  selectedRole: string | null = null;
  nameFilter: string = ''; // Ad filtresi
  emailFilter: string = ''; // E-posta filtresi
  dropdownVisible: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Kullanıcı seçildiğinde rolü güncelle
  selectUser(user: any) {
    this.selectedUserId = user.id;
    this.selectedUserName = user.name;
    this.dropdownVisible = false;
    this.onUserSelect(user.id); // Kullanıcı rolünü yükle
  }

  // Dropdown göster/gizle
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Kullanıcıları yükle
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data; // Başlangıçta tüm kullanıcıları ata
        console.log('Users loaded:', this.users);
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  // Filtre uygulama
  applyFilters(): void {
    const nameFilterLower = this.nameFilter.toLowerCase();
    const emailFilterLower = this.emailFilter.toLowerCase();

    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(nameFilterLower) &&
        user.email.toLowerCase().includes(emailFilterLower)
    );
  }

  // Kullanıcı rolünü yükle
  onUserSelect(userId: number): void {
    if (userId) {
      this.userService.getRole(userId).subscribe({
        next: (data) => {
          this.selectedRole = data.role;
          console.log(
            `Role for user ID ${userId} is ${this.selectedRole}`
          );
        },
        error: (err) => {
          console.error('Error fetching role:', err);
        }
      });
    } else {
      this.selectedRole = null;
    }
  }

  // Rol atama
  assignRole(): void {
    if (this.selectedUserId && this.selectedRole) {
      console.log(
        `Assigning role ${this.selectedRole} to user ID ${this.selectedUserId}`
      );
  
      this.userService.assignRole(this.selectedUserId, this.selectedRole).subscribe({
        next: () => {
          alert('Rol başarıyla atandı!');
          
          
          this.selectedUserId = null;
          this.selectedUserName = null;
          this.selectedRole = null;
          this.nameFilter = '';
          this.emailFilter = '';
          this.filteredUsers = this.users;
  
          
          this.dropdownVisible = false;
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
