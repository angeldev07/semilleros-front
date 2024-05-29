// src/app/semilleros/semilleros.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SemillerosService } from './semilleros.service';

@Component({
  selector: 'app-semilleros',
  standalone: true,
  imports: [
    ReactiveFormsModule  // Ensure ReactiveFormsModule is imported here
  ],
  template: `
    <form [formGroup]="semilleroForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Nombre:</label>
        <input type="text" formControlName="nombre">
      </div>
      <div>
        <label>Descripción:</label>
        <textarea formControlName="descripcion"></textarea>
      </div>
      <button type="submit" [disabled]="!semilleroForm.valid">Crear Semillero</button>
    </form>

    <div>
      <button (click)="getAllSemilleros()">Cargar Todos los Semilleros</button>
      <button (click)="getSemillero(1)">Cargar Semillero por ID</button>
      <button (click)="updateSemillero(1)">Actualizar Semillero</button>
      <button (click)="deleteSemillero(1)">Eliminar Semillero</button>
    </div>
  `,
  styles: [
    `input, textarea {
      margin-bottom: 10px;
      width: 100%;
      padding: 8px;
    }`
  ]
})
export class SemillerosComponent implements OnInit {
  semilleroForm!: FormGroup;

  constructor(private fb: FormBuilder, private semillerosService: SemillerosService) {}

  ngOnInit(): void {
    this.semilleroForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.semilleroForm.valid) {
      this.semillerosService.crearSemillero(this.semilleroForm.value).subscribe({
        next: response => console.log('Semillero creado con éxito', response),
        error: error => console.error('Error al crear semillero', error)
      });
    }
  }

  getAllSemilleros(): void {
    this.semillerosService.getAllSemilleros().subscribe({
      next: semilleros => console.log('Todos los semilleros:', semilleros),
      error: error => console.error('Error al obtener semilleros', error)
    });
  }

  getSemillero(id: number): void {
    this.semillerosService.getSemillero(id).subscribe({
      next: semillero => console.log('Semillero cargado:', semillero),
      error: error => console.error('Error al cargar el semillero', error)
    });
  }

  updateSemillero(id: number): void {
    const updatedData = { nombre: 'Updated Name', descripcion: 'Updated Description' };
    this.semillerosService.updateSemillero(id, updatedData).subscribe({
      next: response => console.log('Semillero actualizado con éxito', response),
      error: error => console.error('Error al actualizar semillero', error)
    });
  }

  deleteSemillero(id: number): void {
    this.semillerosService.deleteSemillero(id).subscribe({
      next: response => console.log('Semillero eliminado con éxito', response),
      error: error => console.error('Error al eliminar semillero', error)
    });
  }
}
