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
import { PQR, Semilleros } from '../../api/pqr';
import { ButtonModule } from 'primeng/button';

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
    TabViewModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  template: `
  <div class="mx-auto border-black border-2 w-72">
          <div class="bg-black">
            <h1 class="text-white">PQRS</h1>
          </div>
          <form
            [formGroup]="pqrsForm"
            (ngSubmit)="submitPqrs()"
          >
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
                <input
                    id="desc"
                    type="text"
                    formControlName="desc"
                    pInputText
                    class="w-full"
                />
                @if (validateInput('desc')) {
                <span class="text-red-500 text-md block p-2"
                     >El desc es obligatorio</span
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
                    >Anonimo?</label
                >
                    @for(option of anonimous; track option.key){
                      <p-radioButton [inputId]="option.key" [value]="option.key" formControlName="anonimo"
                      (onClick)="togglePersonalInfo(option.key)"></p-radioButton>
                      <label [for]="option.key" class="ml-2">{{ option.name }}</label>
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
            <div class="mb-3">
                <label for="semillero" class="font-semibold block mb-2"
                    >semillero</label
                >
                <p-dropdown formControlName="semillero" [options]="semilleros" optionLabel="name" optionValue="id" placeholder="Selecciona un semillero"></p-dropdown>

                @if (validateInput('semillero')) {
                <span class="text-red-500 text-md block p-2"
                     >El semillero es obligatorio</span
                >
                }
            </div>
            <div class="mb-3">
                <label for="tipoPqrs" class="font-semibold block mb-2"
                    >tipoPqrs</label
                >
                <p-dropdown formControlName="tipoPqrs" [options]="tiposPQRS" optionLabel="name" optionValue="key" placeholder="Selecciona el tipo"></p-dropdown>
                @if (validateInput('tipoPqrs')) {
                <span class="text-red-500 text-md block p-2"
                     >El tipoPqrs es obligatorio</span
                >
                }
            </div>
            <div class="card flex justify-content-center">
                <p-button label="Check" icon="pi pi-check" (onClick)="submitPqrs()"></p-button>
            </div>
          </form>
    </div>
  `,
      styles: `
      :host {
        display: block;
      }
    `,
        changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPqrsComponent implements OnInit{
  @Input() semilleros: Semilleros[] = [];
  @Output() savePQRS = new EventEmitter<{pqrs: PQR, semillero: string}>();

  showPersonalInfo : boolean = true;
  anonimous = [ { key: 'true', name: 'Si' }, { key: 'false', name: 'No' } ];
  tiposPQRS = [
    {
      key: 1,
      name: 'Queja',
    },
    {
      key: 2,
      name: 'Reclamo',
    },
    {
      key: 3,
      name: 'Sugerencia',
    },
    {
      key: 4,
      name: 'Peticion',
    }
  ]
  pqrs : PQR | undefined = undefined;

  pqrsForm = this.fb.group({
    title: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    email: ['', [Validators.required]],
    anonimo: [true, [Validators.required]],
    nombre: [''],
    apellido: [''],
    dni: [''],
    semillero: ['', [Validators.required]],
    tipoPqrs: ['', [Validators.required]],
});


constructor(private fb: FormBuilder) {}

ngOnInit(): void {
    this.showPersonalInfo = true;
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
    if (this.pqrsForm.invalid) {
        this.pqrsForm.markAllAsTouched();
        this.pqrsForm.markAsDirty();
        return;
    }

    const pqrs: PQR = {
      titulo: this.pqrsForm.get('title')?.value ?? '',
      descripcion: this.pqrsForm.get('desc')?.value ?? '',
      correo: this.pqrsForm.get('email')?.value ?? '',
      anonimo: Boolean(this.pqrsForm.get('anonimo')?.value),
      nombre: this.pqrsForm.get('nombre')?.value ?? '',
      apellido: this.pqrsForm.get('apellido')?.value ?? '',
      cedula: this.pqrsForm.get('dni')?.value ?? '',
      tipoPqrs: this.pqrsForm.get('tipoPqrs')?.value ?? '',
    };

  const semillero = this.pqrsForm.get('semillero')?.value ?? ''

    this.savePQRS.emit({pqrs, semillero});
    // this.visibleChange.emit(false)
}

}
