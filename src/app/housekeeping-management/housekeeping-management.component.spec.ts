import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepingManagementComponent } from './housekeeping-management.component';

describe('HousekeepingManagementComponent', () => {
  let component: HousekeepingManagementComponent;
  let fixture: ComponentFixture<HousekeepingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousekeepingManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousekeepingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
