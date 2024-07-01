import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SemillerosService } from '../semilleros/semilleros.service';
import { ProyectosService } from './proyectos.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule
  ],
  template: `
    <p-toast></p-toast>
    <p-toolbar>
      <div class="p-toolbar-group-left">
        <button pButton label="Nuevo" icon="pi pi-plus" (click)="showDialog()"></button>
      </div>
    </p-toolbar>

    <p-table [value]="proyectos" [paginator]="true" [rows]="10" [responsive]="true" selectionMode="single" [(selection)]="selectedProyecto">
      <ng-template pTemplate="header">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Archivos</th>
          <th>Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-proy>
        <tr>
          <td>{{proy.nombre}}</td>
          <td>{{proy.descripcion}}</td>
          <td>
            <ng-container *ngFor="let archivo of proy.archivos_urls">
              <a [href]="archivo" target="_blank">{{ archivo }}</a><br>
            </ng-container>
          </td>
          <td>
            <button pButton icon="pi pi-pencil" (click)="editProyecto(proy)"></button>
            <button pButton icon="pi pi-trash" (click)="deleteProyecto(proy.id)"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog header="Proyecto" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" [style]="{width: '50vw'}">
      <form [formGroup]="proyectoForm" (ngSubmit)="saveProyecto()" enctype="multipart/form-data">
        <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6">
            <label for="semillero_id">Semillero</label>
            <select formControlName="semillero_id" required>
              <option *ngFor="let semillero of semilleros" [value]="semillero.id">{{ semillero.nombre }}</option>
            </select>
            <div *ngIf="proyectoForm.get('semillero_id')?.invalid && proyectoForm.get('semillero_id')?.touched" class="error">
              Semillero es obligatorio.
            </div>
          </div>
          <div class="p-col-12 p-md-6">
            <label for="nombre">Nombre</label>
            <input pInputText id="nombre" formControlName="nombre" required>
            <div *ngIf="proyectoForm.get('nombre')?.invalid && proyectoForm.get('nombre')?.touched" class="error">
              Nombre es obligatorio.
            </div>
          </div>
          <div class="p-col-12">
            <label for="descripcion">Descripción</label>
            <textarea pInputTextarea id="descripcion" formControlName="descripcion" required></textarea>
            <div *ngIf="proyectoForm.get('descripcion')?.invalid && proyectoForm.get('descripcion')?.touched" class="error">
              Descripción es obligatoria.
            </div>
          </div>
          <div class="p-col-12">
            <label for="archivos">Archivos</label>
            <input type="file" (change)="onFilesChange($event)" multiple>
            <div *ngFor="let archivo of proyectoForm.get('archivos_urls')?.value">
              <a [href]="archivo" target="_blank">{{ archivo }}</a><br>
            </div>
          </div>
          <div class="p-col-12 p-md-6">
            <label for="fecha_inicio">Fecha de Inicio</label>
            <input type="date" pInputText id="fecha_inicio" formControlName="fecha_inicio">
          </div>
          <div class="p-col-12 p-md-6">
            <label for="fecha_fin">Fecha de Fin</label>
            <input type="date" pInputText id="fecha_fin" formControlName="fecha_fin">
          </div>
          <div class="p-col-12 p-md-6">
            <label for="calificacion">Calificación</label>
            <input type="number" pInputText id="calificacion" formControlName="calificacion">
          </div>
        </div>
        <p-footer>
          <button pButton label="Guardar" icon="pi pi-check" type="submit"></button>
        </p-footer>
      </form>
    </p-dialog>
  `,
  styles: [`
    :host {
      display: block;
      padding: 1rem;
    }
    .p-col-12.p-md-6 {
      padding-bottom: 1rem;
    }
    .error {
      color: red;
      font-size: 0.75rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ProyectosComponent implements OnInit {
  proyectoForm!: FormGroup;
  proyectos: any[] = [];
  semilleros: any[] = [];
  selectedProyecto: any;
  displayDialog: boolean = false;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private proyectosService: ProyectosService,
    private semillerosService: SemillerosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.proyectoForm = this.fb.group({
      semillero_id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      archivos_urls: [''],
      fecha_inicio: [new Date().toISOString().split('T')[0], Validators.required],
      fecha_fin: [new Date().toISOString().split('T')[0], Validators.required],
      calificacion: ['']
    });
    this.getAllProyectos();
    this.getAllSemilleros();
  }

  onFilesChange(event: any): void {
    const files: File[] = Array.from(event.target.files);
    if (files.length > 0) {
      this.selectedFiles = files;
      const urls = files.map(file => URL.createObjectURL(file));
      this.proyectoForm.patchValue({
        archivos_urls: urls
      });
    }
  }

  saveProyecto(): void {
    if (this.selectedProyecto) {
      this.updateProyecto();
    } else {
      this.createProyecto();
    }
  }

  createProyecto(): void {
    const formData = new FormData();
    Object.keys(this.proyectoForm.controls).forEach(key => {
      formData.append(key, this.proyectoForm.get(key)?.value);
    });
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        formData.append('archivo', file);
      });
    }
    this.proyectosService.crearProyecto(formData).subscribe({
      next: response => {
        this.proyectos.push(response);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Proyecto creado con éxito'});
        this.proyectoForm.reset();
        this.displayDialog = false;
      },
      error: error => {
        console.error('Error al crear proyecto', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo crear el proyecto'});
      }
    });
  }

  updateProyecto(): void {
    const formData = new FormData();
    Object.keys(this.proyectoForm.controls).forEach(key => {
      formData.append(key, this.proyectoForm.get(key)?.value);
    });
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        formData.append('archivo', file);
      });
    }
    this.proyectosService.updateProyecto(this.selectedProyecto.id, formData).subscribe({
      next: response => {
        const index = this.proyectos.findIndex(p => p.id === this.selectedProyecto.id);
        this.proyectos[index] = response;
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Proyecto actualizado con éxito'});
        this.displayDialog = false;
      },
      error: error => {
        console.error('Error al actualizar proyecto', error);
      }
    });
  }

  getAllProyectos(): void {
    this.proyectosService.getAllProyectos().subscribe({
      next: proyectos => this.proyectos = proyectos,
      error: error => console.error('Error al obtener proyectos', error)
    });
  }

  getAllSemilleros(): void {
    this.semillerosService.getAllSemilleros().subscribe({
      next: semilleros => this.semilleros = semilleros,
      error: error => console.error('Error al obtener semilleros', error)
    });
  }

  editProyecto(proyecto: any): void {
    this.selectedProyecto = { ...proyecto };
    this.proyectoForm.patchValue(this.selectedProyecto);
    this.displayDialog = true;
  }

  deleteProyecto(id: number): void {
    this.proyectosService.deleteProyecto(id).subscribe({
      next: response => {
        this.proyectos = this.proyectos.filter(p => p.id !== id);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Proyecto eliminado con éxito'});
      },
      error: error => console.error('Error al eliminar proyecto', error)
    });
  }

  showDialog(): void {
    this.displayDialog = true;
  }
}
