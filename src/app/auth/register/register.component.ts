import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    username: '',
    name: '',
    email: '',
    password: '',
    codigoUniversidad: '',
    semestreActual: 0,
    edad: 0,
    direccionResidencia: '',
    celular: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.userData).subscribe(
      (response) => {
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.errorMessage = 'Error en el registro';
      }
    );
  }
}
