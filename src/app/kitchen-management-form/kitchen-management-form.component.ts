import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitchenManagementService } from '../kitchen-management.service';

@Component({
  selector: 'app-kitchen-management-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kitchen-management-form.component.html',
  styleUrls: ['./kitchen-management-form.component.css'],
})
export class KitchenManagementFormComponent {
  selectedSection: string = 'materials';
  materials: any[] = [];
  newMaterial: any = { name: '', code: '', stock: 0, unit: '', expiryDate: '' };
  dishes: any[] = [];
  newDish: any = { name: '', category: '', materials: [] };
  stockConsumptions: any[] = [];
  newStockConsumption: any = { menuId: '', consumptionDate: '' };
  logs: any[] = [];
  logFilter: string = '';  // Tarih filtresi için kullanılacak değer
  filteredLogs: any[] = [];  // Filtrelenecek logları tutacak dizi
  selectedMenu: string = '';  // Seçilen Menü
  selectedMenuDishes: any[] = [];  // Seçilen menüdeki yemekler
  menus: any[] = [];

  constructor(private kitchenService: KitchenManagementService) {}

  ngOnInit(): void {
    this.loadMaterials();
    this.loadDishes();
    this.loadMenus();
    this.loadLogs();  // Logları yükle
  }

  onSectionChange() {
    console.log('Seçilen bölüm:', this.selectedSection);
  }

  loadMaterials() {
    this.kitchenService.getMaterials().subscribe((data) => {
      this.materials = data;
    });
  }

  loadMenus() {
    this.kitchenService.getMenus().subscribe((data) => {
      this.menus = data;
    });
  }

  saveMaterial() {
    if (this.newMaterial.id) {
      this.kitchenService
        .updateMaterial(this.newMaterial.id, this.newMaterial)
        .subscribe(() => {
          this.loadMaterials();
          this.resetMaterialForm();
        });
    } else {
      this.kitchenService.addMaterial(this.newMaterial).subscribe(() => {
        this.loadMaterials();
        this.resetMaterialForm();
      });
    }
  }

  resetMaterialForm() {
    this.newMaterial = { name: '', code: '', stock: 0, unit: '', expiryDate: '' };
  }

  loadDishes() {
    this.kitchenService.getDishes().subscribe((data) => {
      this.dishes = data;
    });
  }

  addDish() {
    this.kitchenService.addDish(this.newDish).subscribe(() => {
      this.loadDishes();  // Yemek eklendikten sonra yemekleri yeniden yükle
      this.resetDishForm();  // Formu sıfırla
    });
  }

  saveDish() {
    this.kitchenService.addDish(this.newDish).subscribe(() => {
      this.loadDishes();
      this.resetDishForm();
    });
  }

  resetDishForm() {
    this.newDish = { name: '', category: '', materials: [] };
  }

  loadStockConsumptions() {
    this.kitchenService.getStockConsumptions().subscribe((data) => {
      this.stockConsumptions = data;
    });
  }

  saveStockConsumption() {
    this.kitchenService.addStockConsumption(this.newStockConsumption).subscribe(() => {
      this.loadStockConsumptions();
      this.resetStockConsumptionForm();
    });
  }

  resetStockConsumptionForm() {
    this.newStockConsumption = { menuId: '', consumptionDate: '' };
  }

  loadLogs() {
    this.kitchenService.getLogs().subscribe((data) => {
      this.logs = data;
      this.filterLogs();  // Filtreyi uygulayarak logları güncelle
    });
  }

  // Logları tarih filtresine göre filtreleyen fonksiyon
  filterLogs() {
    if (this.logFilter) {
      this.filteredLogs = this.logs.filter((log) =>
        log.date.includes(this.logFilter)
      );
    } else {
      this.filteredLogs = this.logs;  // Filtresiz tüm logları göster
    }
  }

  // Tarih filtresi değiştiğinde logları filtrele
  onLogFilterChange() {
    this.filterLogs();  // Logları filtrele
  }

  // Stok güncelleme fonksiyonu
  updateStock() {
    if (this.selectedMenu && this.selectedMenuDishes.length > 0) {
      // Burada stok güncellemeyi gerçekleştirecek işlemleri yapın
      this.kitchenService.updateStock(this.selectedMenu, this.selectedMenuDishes).subscribe(() => {
        console.log('Stok başarıyla güncellendi');
        this.loadStockConsumptions();  // Güncellenen stokları tekrar yükleyin
      });
    } else {
      console.log('Menü veya yemekler seçilmemiş');
    }
  }

  // Menü seçiminden sonra yemekleri yükleyin
  loadMenuDishes() {
    this.kitchenService.getMenuDishes(this.selectedMenu).subscribe((data) => {
      this.selectedMenuDishes = data;
    });
  }
}
