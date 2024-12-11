import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelFormComponent } from './hotel-form/hotel-form.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { RoomManagementFormComponent } from './room-management-form/room-management-form.component';
import { RoomService } from './room.service';
import { ReservationPaymentComponent } from './reservation-payment/reservation-payment.component';
import { RoleManagementFormComponent } from './role-management-form/role-management-form.component';

@NgModule({
  declarations: [


  ],
  imports: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HotelFormComponent,
    EditHotelComponent,
    ReservationPaymentComponent,
    RoleManagementFormComponent
  ],
  providers: [provideHttpClient(),RoomService],
// AppComponent'i burada kullanıyoruz
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
