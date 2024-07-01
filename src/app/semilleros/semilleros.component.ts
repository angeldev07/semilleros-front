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
import { SemillerosService } from './semilleros.service';

@Component({
  selector: 'app-semilleros',
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

    <p-table [value]="semilleros" [paginator]="true" [rows]="10" [responsive]="true" selectionMode="single" [(selection)]="selectedSemillero">
      <ng-template pTemplate="header">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Director</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-sem>
        <tr>
          <td>{{sem.nombre}}</td>
          <td>{{sem.descripcion}}</td>
          <td>{{sem.director}}</td>
          <td>
            <img *ngIf="sem.imagen_url" [src]="sem.imagen_url" alt="Imagen" width="50">
          </td>
          <td>
            <button pButton icon="pi pi-pencil" (click)="editSemillero(sem)"></button>
            <button pButton icon="pi pi-trash" (click)="deleteSemillero(sem.id)"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog header="Semillero" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" [style]="{width: '50vw'}">
      <form [formGroup]="semilleroForm" (ngSubmit)="saveSemillero()" enctype="multipart/form-data">
        <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6">
            <label for="nombre">Nombre</label>
            <input pInputText id="nombre" formControlName="nombre" required>
            <div *ngIf="semilleroForm.get('nombre')?.invalid && semilleroForm.get('nombre')?.touched" class="error">
              Nombre es obligatorio.
            </div>
          </div>
          <div class="p-col-12 p-md-6">
            <label for="director">Director</label>
            <input pInputText id="director" formControlName="director" required>
            <div *ngIf="semilleroForm.get('director')?.invalid && semilleroForm.get('director')?.touched" class="error">
              Director es obligatorio.
            </div>
          </div>
          <div class="p-col-12">
            <label for="descripcion">Descripción</label>
            <textarea pInputTextarea id="descripcion" formControlName="descripcion" required></textarea>
            <div *ngIf="semilleroForm.get('descripcion')?.invalid && semilleroForm.get('descripcion')?.touched" class="error">
              Descripción es obligatoria.
            </div>
          </div>
          <div class="p-col-12">
            <label for="imagen">Imagen</label>
            <input type="file" (change)="onFileChange($event)" [required]="!semilleroForm.get('imagen_url')?.value">
            <div *ngIf="!selectedFile && semilleroForm.get('imagen_url')?.invalid && semilleroForm.get('imagen_url')?.touched" class="error">
              Imagen es obligatoria.
            </div>
            <img *ngIf="semilleroForm.get('imagen_url')?.value" [src]="semilleroForm.get('imagen_url')?.value" alt="Imagen" width="100" style="margin-top: 10px;">
          </div>
        </div>
        <p-footer>
          <button pButton label="Guardar" icon="pi pi-check" type="submit" [disabled]="semilleroForm.invalid"></button>
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
export class SemillerosComponent implements OnInit {
  semilleroForm!: FormGroup;
  semilleros: any[] = [];
  selectedSemillero: any;
  displayDialog: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb : FormBuilder,
    private semillerosService: SemillerosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.semilleroForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      director: ['', Validators.required],
      imagen_url: ['', Validators.required],
      logo_url: ['']
    });
    this.getAllSemilleros();
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.semilleroForm.patchValue({
          imagen_url: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.semilleroForm.controls).forEach(key => {
      formData.append(key, this.semilleroForm.get(key)?.value);
    });
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }
    if (this.semilleroForm.valid) {
      this.semillerosService.crearSemillero(formData).subscribe({
        next: response => {
          this.semilleros.push(response);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Semillero creado con éxito'});
          this.semilleroForm.reset();
          this.displayDialog = false;
        },
        error: error => {
          console.error('Error al crear semillero', error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo crear el semillero'});
        }
      });
    }
  }

  getAllSemilleros(): void {
    this.semillerosService.getAllSemilleros().subscribe({
      next: semilleros => this.semilleros = semilleros,
      error: error => console.error('Error al obtener semilleros', error)
    });
  }

  editSemillero(semillero: any): void {
    this.selectedSemillero = { ...semillero };
    this.semilleroForm.patchValue(this.selectedSemillero);
    this.displayDialog = true;
  }

  deleteSemillero(id: number): void {
    this.semillerosService.deleteSemillero(id).subscribe({
      next: response => {
        this.semilleros = this.semilleros.filter(s => s.id !== id);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Semillero eliminado con éxito'});
      },
      error: error => console.error('Error al eliminar semillero', error)
    });
  }

  saveSemillero(): void {
    if (this.selectedSemillero) {
      this.semillerosService.updateSemillero(this.selectedSemillero.id, this.semilleroForm.value).subscribe({
        next: response => {
          const index = this.semilleros.findIndex(s => s.id === this.selectedSemillero.id);
          this.semilleros[index] = response;
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Semillero actualizado con éxito'});
          this.displayDialog = false;
        },
        error: error => console.error('Error al actualizar semillero', error)
      });
    } else {
      this.onSubmit();
    }
  }

  showDialog(): void {
    this.displayDialog = true;
  }
}
