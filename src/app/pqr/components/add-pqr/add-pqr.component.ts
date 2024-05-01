import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PQR } from '../../api/pqr';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-add-pqrs',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    TabViewModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  template: `
    <p-dialog
        header="Crear Radicado PQR"
          [modal]="true"
          [draggable]="false"
          [resizable]="false"
          [(visible)]="visible"
          (onHide)="visibleChange.emit(false)"
          [style]="{ width: '50rem' }"
          [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
    >
          <form
            [formGroup]="pqrsForm"
            (ngSubmit)="submitPqrs()"
          >
          <div class="mb-3">
                <label for="tipoPqrs" class="font-semibold block mb-2"
                    >Tipo de Solicitud</label
                >
                @for(tipo of tiposPQRS; track tipo.key){
                  <input class="m-2 border-round-sm" type="button" severity="secondary" pButton (click)="selectTipoPQRS(tipo.key)" [value]="tipo.name">
                }
                <!-- @if (validateInput('tipoPqrs')) {
                <span class="text-red-500 text-md block p-2"
                     >Escoge el tipo de solicitud</span
                >
                } -->
            </div>
          <div class="mb-3">
                <label for="title" class="font-semibold block mb-2"
                    >Título</label
                >
                <input
                    id="title"
                    type="text"
                    formControlName="title"
                    pInputText
                    class="w-full"
                />
                @if (validateInput('title')) {
                <span class="text-red-500 text-md block p-2"
                     >El Título es obligatorio</span
                >
                }
            </div>
            <div class="mb-3">
                <label for="desc" class="font-semibold block mb-2"
                    >Descripcion</label
                >
                <textarea
                  rows="5"
                  cols="30"
                  pInputTextarea
                  [autoResize]="true"
                  formControlName="desc"
                  class="w-full">
              </textarea>
                @if (validateInput('desc')) {
                <span class="text-red-500 text-md block p-2"
                     >La descripción del problema es obligatoria</span
                >
                }
            </div>
            <div class="mb-3">
                <label for="email" class="font-semibold block mb-2"
                    >Correo</label
                >
                <input
                    id="email"
                    type="email"
                    formControlName="email"
                    pInputText
                    class="w-full"
                />
                @if (validateInput('email')) {
                <span class="text-red-500 text-md block p-2"
                     >El correo es obligatorio</span
                >
                }
            </div>
            <div class="mb-3">
                <label for="anonimo" class="font-semibold block mb-2"
                    >¿Desea enviar el PQRS anonimamente?</label
                >
                    @for(option of anonimous; track option.key){
                      <p-radioButton [inputId]="option.key" [value]="option.key" formControlName="anonimo"
                      (onClick)="togglePersonalInfo(option.key)"></p-radioButton>
                      <label [for]="option.key" class="mx-3 mt-2">{{ option.name }}</label>
                    }
                    @if (validateInput('anonimo')) {
                    <span class="text-red-500 text-md block p-2"
                        >Esta seleccion es obligatorio</span
                >
                    }
            </div>
            @if (showPersonalInfo) {
            <div class="mb-3">
                <label for="nombre" class="font-semibold block mb-2"
                    >Nombre</label
                >
                <input
                    id="nombre"
                    type="text"
                    formControlName="nombre"
                    pInputText
                    class="w-full"
                />
                @if (validateInput('nombre')) {
                <span class="text-red-500 text-md block p-2"
                     >El nombre es obligatorio</span
                >
                }
            </div>
            <div class="mb-3">
                <label for="apellido" class="font-semibold block mb-2"
                    >Apellido</label
                >
                <input
                    id="apellido"
                    type="text"
                    formControlName="apellido"
                    pInputText
                    class="w-full"
                />
                @if (validateInput('apellido')) {
                <span class="text-red-500 text-md block p-2"
                     >El apellido es obligatorio</span
                >
                }
            </div>
            <div class="mb-3">
                <label for="dni" class="font-semibold block mb-2"
                    >Cedula</label
                >
                <input
                    id="dni"
                    type="text"
                    formControlName="dni"
                    pInputText
                    class="w-full"
                />
                @if (validateInput('dni')) {
                <span class="text-red-500 text-md block p-2"
                     >El Cedula es obligatorio</span
                >
                }
            </div>
              }
          </form>
          <ng-template pTemplate="footer">
          <div class="card flex justify-content-center">
                <p-button label="Enviar" icon="pi pi-check" (onClick)="submitPqrs()"></p-button>
            </div>
          </ng-template>
    </p-dialog>
  `,
      styles: `
      :host {
        display: block;
      }
    `,
        changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPqrsComponent implements OnInit{
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() savePQRS = new EventEmitter<PQR>();

  showPersonalInfo : boolean = true;
  pqrsTypes: number = 0;
  anonimous = [ { key: 'true', name: 'Si' }, { key: 'false', name: 'No' } ];
  tiposPQRS = [
    {
      key: 1,
      name: 'Petición',
    },
    {
      key: 2,
      name: 'Queja',
    },
    {
      key: 3,
      name: 'Reclamo',
    },
    {
      key: 4,
      name: 'Sugerencia',
    }
  ]
  pqrs : PQR | undefined = undefined;

  selectTipoPQRS(tipoKey: number) {
    this.pqrsTypes = tipoKey;
    console.log(this.pqrsTypes);
  }

  pqrsForm = this.fb.group({
    title: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    email: ['', [Validators.required]],
    anonimo: [true, [Validators.required]],
    nombre: [''],
    apellido: [''],
    dni: [''],
    semillero: ['', [Validators.required]],
    tipoPqrs: [this.tiposPQRS[0].key]
});


constructor(private fb: FormBuilder) {}

ngOnInit(): void {
    this.showPersonalInfo = false;
    if(!!this.pqrs) {
        this.pqrsForm.patchValue({
            title: this.pqrs.titulo,
            desc: this.pqrs.descripcion,
            email: this.pqrs.correo,
            anonimo: this.pqrs.anonimo,
            nombre: this.pqrs.nombre,
            apellido: this.pqrs.apellido,
            dni: this.pqrs.cedula,
            tipoPqrs: this.pqrs.tipoPqrs,
        });
    }
}

togglePersonalInfo(event: string) {
  // const value = event.value;
  console.log(event);
  if (event === "false") {
    this.showPersonalInfo = true;
    this.pqrsForm.get('nombre')?.enable();
    this.pqrsForm.get('apellido')?.enable();
    this.pqrsForm.get('cedula')?.enable();
  } else {
    this.showPersonalInfo = false;
    this.pqrsForm.get('nombre')?.disable();
    this.pqrsForm.get('apellido')?.disable();
    this.pqrsForm.get('cedula')?.disable();
  }
}

public validateInput(input: string) {
  return (
    this.pqrsForm.get(input)?.invalid &&
    this.pqrsForm.get(input)?.touched
  );
}

public submitPqrs() {
    // if (this.pqrsForm.invalid) {
    //     this.pqrsForm.markAllAsTouched();
    //     this.pqrsForm.markAsDirty();
    //     return;
    // }

    const pqrs: PQR = {
      titulo: this.pqrsForm.get('title')?.value ?? '',
      descripcion: this.pqrsForm.get('desc')?.value ?? '',
      correo: this.pqrsForm.get('email')?.value ?? '',
      anonimo: Boolean(this.pqrsForm.get('anonimo')?.value),
      nombre: this.pqrsForm.get('nombre')?.value ?? '',
      apellido: this.pqrsForm.get('apellido')?.value ?? '',
      cedula: this.pqrsForm.get('dni')?.value ?? '',
      tipoPqrs: this.pqrsTypes,
    };

    console.log(pqrs);
    this.savePQRS.emit(pqrs);
    this.visibleChange.emit(false)
}

}
