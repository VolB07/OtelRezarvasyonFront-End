import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenManagementFormComponent } from './kitchen-management-form.component';

describe('KitchenManagementFormComponent', () => {
  let component: KitchenManagementFormComponent;
  let fixture: ComponentFixture<KitchenManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenManagementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
