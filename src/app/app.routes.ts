import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { ReservationPaymentComponent } from './reservation-payment/reservation-payment.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CommunicationComponent } from './communication/communication.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [  
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin', 
        component: AdminComponent,
        canActivate: [RoleGuard]  // Admin sayfası için RoleGuard ekleniyor
    },
    { path: 'profile', component: ProfileComponent},
    { path: 'hotel/:id', component: HotelDetailComponent },
    { path: 'reservation-payment/:hotelId/:roomId', component: ReservationPaymentComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: 'communication', component: CommunicationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
