import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debug } from 'node:console';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  isMenuOpen: boolean = false;
  users!: FormGroup;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.getElementById('menu');
    if (this.isMenuOpen) {
      menu?.classList.add('show-menu');
    } else {
      menu?.classList.remove('show-menu');
    }
  }

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private user_: UserService
  ) {}

  ngOnInit(): void {
    this.users = this.formBuilder.group({
      name: [''],
      email:[''],
      password: [''],
      phone: [''],
      age: [''],
      gender: ['']
    })
  }

  // Form verilerini tutmak için
  user = {
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: ''
  };

 register() {
  debugger;
  console.log(this.users);
  const userPayload = {
    name: this.users.value.name,
    email: this.users.value.email,
    password: this.users.value.password,
    phone: this.users.value.phone,
    age: this.users.value.age,
    gender: this.users.value.gender
  };

  this.http.post('http://localhost:5179/api/Users/register', userPayload)
    .subscribe({
      next: (response) => {
        console.log('Kayıt başarılı:', response);
        alert('Kayıt başarılı!');
      },
      error: (error) => {
        if (error.status === 400 && error.error.message === "Bu e-posta zaten kullanılıyor.") {
          alert('Bu e-posta zaten kullanılıyor.');
        } else {
          alert('Kayıt sırasında bir hata oluştu.');
        }
        console.log('Kayıt hatası:', error);
      }
    });
}

  
  
  
  
  
  

}
