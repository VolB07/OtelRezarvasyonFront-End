
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { ReservationPaymentComponent } from './reservation-payment/reservation-payment.component';


export const routes: Routes = [  
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'hotel/:id', component: HotelDetailComponent },
    { path: 'reservation-payment/:hotelId/:roomId', component: ReservationPaymentComponent },
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
