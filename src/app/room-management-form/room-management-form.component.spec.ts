import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomManagementFormComponent } from './room-management-form.component';

describe('RoomManagementFormComponent', () => {
  let component: RoomManagementFormComponent;
  let fixture: ComponentFixture<RoomManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomManagementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
