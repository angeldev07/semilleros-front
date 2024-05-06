import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Album } from '../../api/multimedia';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
  ],
  template: `
    <p-dialog
      header="Crear Album"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [(visible)]="visible"
      (onHide)="visibleChange.emit(false)"
      [style]="{ width: '50rem' }"
      [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form [formGroup]="albumForm" (ngSubmit)="submitAlbum()">
        <div class="mb-3">
          <label for="titulo" class="font-semibold block mb-2">Título</label>
          <input id="titulo" type="text" formControlName="titulo" pInputText class="w-full" />
          <span *ngIf="validateInput('titulo')" class="text-red-500 text-md block p-2">El título es obligatorio</span>
        </div>
        <div class="mb-3">
          <label for="descripcion" class="font-semibold block mb-2">Descripción</label>
          <textarea
            rows="5"
            cols="30"
            pInputTextarea
            [autoResize]="true"
            formControlName="descripcion"
            class="w-full"
          ></textarea>
          <span *ngIf="validateInput('descripcion')" class="text-red-500 text-md block p-2">La descripción es obligatoria</span>
        </div>
      </form>
      <ng-template pTemplate="footer">
        <div class="card flex justify-content-center">
          <p-button label="Enviar" icon="pi pi-check" (onClick)="submitAlbum()"></p-button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAlbumComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveAlbum = new EventEmitter<Album>();

  albumForm = this.fb.group({
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private multimediaService: MultimediaService) {}

  ngOnInit(): void {}

  validateInput(input: string) {
    return this.albumForm.get(input)?.invalid && this.albumForm.get(input)?.touched;
  }

  submitAlbum() {
    if (this.albumForm.invalid) {
      this.albumForm.markAllAsTouched();
      return;
    }

    const album: Album = {
      id: 0, // El ID será asignado por el backend
      titulo: this.albumForm.get('titulo')?.value ?? '',
      descripcion: this.albumForm.get('descripcion')?.value ?? '',
      fechaCreacion: new Date(), // Puedes establecer una fecha predeterminada o dejar que el backend la asigne
      fechaActualizacion: new Date(), // Puedes establecer una fecha predeterminada o dejar que el backend la asigne
      ubicacionAlbum: '', // Esta propiedad será asignada por el backend
      ruta: '', // Esta propiedad será asignada por el backend
    };

    this.multimediaService.createAlbum(album).subscribe(
      (createdAlbum) => {
        console.log('Album creado exitosamente:', createdAlbum);
        this.saveAlbum.emit(createdAlbum);
        this.visibleChange.emit(false);
      },
      (error) => {
        console.error('Error al crear el album:', error);
      }
    );
  }
}