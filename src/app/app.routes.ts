
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

export const routes: Routes = [  
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'hotel/:id', component: HotelDetailComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
