import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,  // Import ReactiveFormsModule here
    DropdownModule
  ],
  template: `
    <div class="p-fluid">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <!-- Form fields go here -->
        <button type="submit" pButton label="Register" [disabled]="!registerForm.valid"></button>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
    .p-field {
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit {
  registerForm: FormGroup;
  roles = [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'DIRECTOR' },
    { id: 3, name: 'USER' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      codigoUniversidad: ['', Validators.required],
      semestreActual: ['', Validators.required],
      edad: ['', Validators.required],
      direccionResidencia: ['', Validators.required],
      celular: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Additional initialization tasks can be performed here
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8080/api/users/register', this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully!', response);
          this.cdr.markForCheck();  // Trigger change detection manually
        },
        error: (error) => {
          console.error('Error registering user', error);
          this.cdr.markForCheck();  // Trigger change detection manually
        }
      });
    }
  }
}
