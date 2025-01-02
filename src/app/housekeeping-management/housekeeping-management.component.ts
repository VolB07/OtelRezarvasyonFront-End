import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-housekeeping-management',
  templateUrl: './housekeeping-management.component.html',
  styleUrls: ['./housekeeping-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HousekeepingManagementComponent implements OnInit {
  // Dropdown seçim durumu
  selectedSection: string='cleaningStatus';

  // Oda ve çalışan verileri
  rooms: any[] = []; // Odalar (şimdilik boş)
  employees: any[] = []; // Çalışanlar (şimdilik boş)

  // Seçili oda bilgileri
  selectedRoom: number | null = null;
  selectedRoomDetails: any = null;

  // Temizlik durumu
  cleanStatus: string = 'clean';

  // Görev bilgileri
  newTask = {
    description: '',
    assignedTo: null,
    priority: 'medium',
  };

  // İşlem logları
  logs: any[] = []; // Loglar (şimdilik boş)

  ngOnInit(): void {}

  // Dropdown seçim değişikliği
  onSectionChange(): void {
    console.log('Seçilen Bölüm:', this.selectedSection);
    // Burada bölüme göre işlemler yapılabilir
  }


}
