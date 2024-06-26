import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        const token = response.token;
        const userRole = response.role;
        localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
        if (userRole === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (userRole === 'DIRECTOR') {
          this.router.navigate(['/director/dashboard']);
        } else {
          this.router.navigate(['/user/semilleros']);
        }
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    );
  }
}
