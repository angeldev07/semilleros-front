// src/app/semilleros/semilleros.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { SemillerosService } from './semilleros.service';

@Component({
  selector: 'app-semilleros',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    CalendarModule // Si es necesario
  ],
  template: `
    <form [formGroup]="semilleroForm" (ngSubmit)="onSubmit()">
      <div class="p-fluid">
        <div class="p-field">
          <label for="nombre">Nombre:</label>
          <input id="nombre" type="text" pInputText formControlName="nombre" />
        </div>
        <div class="p-field">
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" pInputTextarea formControlName="descripcion"></textarea>
        </div>
        <button pButton type="submit" label="Crear Semillero" [disabled]="!semilleroForm.valid" class="p-mt-2"></button>
      </div>
    </form>

    <div class="p-mt-4">
      <button pButton label="Cargar Todos los Semilleros" (click)="getAllSemilleros()" class="p-mr-2"></button>
      <button pButton label="Cargar Semillero por ID" (click)="getSemillero(1)" class="p-mr-2"></button>
      <button pButton label="Actualizar Semillero" (click)="updateSemillero(1)" class="p-mr-2"></button>
      <button pButton label="Eliminar Semillero" (click)="deleteSemillero(1)" class="p-mr-2"></button>
    </div>

    <p-table [value]="semilleros" class="p-mt-4">
      <ng-template pTemplate="header">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-semillero>
        <tr>
          <td>{{ semillero.nombre }}</td>
          <td>{{ semillero.descripcion }}</td>
          <td>
            <button pButton icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2 pb-3" (click)="editSemillero(semillero)"></button>
            <button pButton icon="pi pi-trash" class="p-button-rounded p-button-danger pt-4" (click)="deleteSemillero(semillero.id)"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [
    `
      .p-field {
        margin-bottom: 1em;
      }
    `
  ]
})
export class SemillerosComponent implements OnInit {
  semilleroForm!: FormGroup;
  semilleros: any[] = [];

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
        next: response => {
          console.log('Semillero creado con éxito', response);
          this.getAllSemilleros(); // Actualizar la lista de semilleros
        },
        error: error => console.error('Error al crear semillero', error)
      });
    }
  }

  getAllSemilleros(): void {
    this.semillerosService.getAllSemilleros().subscribe({
      next: semilleros => {
        this.semilleros = semilleros;
        console.log('Todos los semilleros:', semilleros);
      },
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
      next: response => {
        console.log('Semillero actualizado con éxito', response);
        this.getAllSemilleros(); // Actualizar la lista de semilleros
      },
      error: error => console.error('Error al actualizar semillero', error)
    });
  }

  deleteSemillero(id: number): void {
    this.semillerosService.deleteSemillero(id).subscribe({
      next: response => {
        console.log('Semillero eliminado con éxito', response);
        this.getAllSemilleros(); // Actualizar la lista de semilleros
      },
      error: error => console.error('Error al eliminar semillero', error)
    });
  }

  editSemillero(semillero: any): void {
    // Implementar lógica de edición
  }
}
