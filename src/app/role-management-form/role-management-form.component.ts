import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { HotelService } from '../hotel.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-role-management-form',
  templateUrl: './role-management-form.component.html',
  styleUrls: ['./role-management-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, FormsModule],
})
export class RoleManagementFormComponent implements OnInit {
  employees: any[] = [];
  hotels: any[] = [];
  roles: string[] = ['admin', 'receptionist', 'chef', 'cleaner', 'user'];
  selectedEmployeeId: number | null = null;
  selectedRole: string | null = null;
  selectedHotelId: number | null = null;
  employeeName: string = '';
  email: string = '';
  phone: string = '';
  isEditMode: boolean = false;
  isLoading: boolean = false; // Yükleme durumu
  errorMessage: string = ''; // Hata mesajı

  constructor(
    private employeesService: EmployeesService,
    private hotelsService: HotelService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
    this.loadEmployees();
  }

  loadHotels(): void {
    this.isLoading = true;
    this.hotelsService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Oteller yüklenirken hata oluştu.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeesService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log('Yüklenen Çalışanlar:', this.employees); // Kontrol için
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Çalışanlar yüklenirken hata oluştu.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
  

  loadEmployeeDetails(): void {
    console.log('Çalışanlar:', this.employees); // Çalışanlar listesi
    console.log('Seçilen ID:', this.selectedEmployeeId); // Seçilen ID
  
    const selectedEmployee = this.employees.find(
      (emp) => emp.id === Number(this.selectedEmployeeId) // Tür dönüşümü
    );
  
    console.log('Seçilen Çalışan:', selectedEmployee); // Seçilen çalışanı kontrol edin
  
    if (selectedEmployee) {
      this.employeeName = selectedEmployee.name;
      this.selectedRole = selectedEmployee.role;
      this.selectedHotelId = selectedEmployee.hotel_id;
      this.email = selectedEmployee.email;
      this.phone = selectedEmployee.phone;
    } else {
      console.error('Çalışan bulunamadı!');
      this.resetForm();
    }
  }
  
  
  

  onEmployeeSelectChange(): void {
    console.log('Seçilen Çalışan ID:', this.selectedEmployeeId); // Kontrol için
    if (this.selectedEmployeeId) {
      this.isEditMode = true;
      this.loadEmployeeDetails();
    }
  }
  
  
  

  saveEmployee(): void {
    if (!this.selectedRole || !this.selectedHotelId || !this.employeeName.trim() || !this.email.trim() || !this.phone.trim()) {
      this.errorMessage = 'Lütfen tüm alanları doldurun.';
      return;
    }

    this.isLoading = true;
    const userId = Number(localStorage.getItem('userId'));
    const updatedAt = new Date().toISOString();

    const employeeData = {
      name: this.employeeName.trim(),
      role: this.selectedRole,
      hotel_id: this.selectedHotelId,
      user_id: userId,
      email: this.email.trim(),
      phone: this.phone.trim(),
      updated_at: updatedAt,
    };

    if (this.isEditMode && this.selectedEmployeeId) {
      this.employeesService.updateEmployee(this.selectedEmployeeId, employeeData).subscribe({
        next: () => {
          alert('Çalışan başarıyla güncellendi!');
          this.resetForm();
          this.loadEmployees();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Çalışan güncelleme işlemi başarısız oldu.';
          this.isLoading = false;
          console.error(err);
        },
      });
    } else {
      this.employeesService.addEmployee(employeeData).subscribe({
        next: () => {
          alert('Çalışan başarıyla eklendi!');
          this.resetForm();
          this.loadEmployees();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Çalışan ekleme işlemi başarısız oldu.';
          this.isLoading = false;
          console.error(err);
        },
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
    this.isEditMode = false;
    this.errorMessage = '';
  }

  resetForm(): void {
    this.selectedEmployeeId = null;
    this.selectedRole = null;
    this.selectedHotelId = null;
    this.employeeName = '';
    this.email = '';
    this.phone = '';
    this.isEditMode = false;
    this.errorMessage = '';
  }
}
