import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PQR } from '../../api/pqr';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PqrsService } from '../../services/pqr.service';

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
    <div class="w-10 mx-auto">
          <form
            [formGroup]="pqrsForm"
            (ngSubmit)="submitPqrs()"
          >
          <div class="flex">
            <div class="mb-3">
                  <label for="tipoPqrs" class="font-semibold block mb-2"
                      >Tipo de Solicitud</label
                  >
                  @for(tipo of tiposPQRS; track tipo.key){
                    <input class="m-2 border-round-sm" type="button" severity="secondary" pButton (click)="selectTipoPQRS(tipo.key, tipo.desc)" [value]="tipo.name">
                  }
                  <!-- @if (validateInput('tipoPqrs')) {
                  <span class="text-red-500 text-md block p-2"
                      >Escoge el tipo de solicitud</span
                  >
                  } -->
            </div>
            <div class="w-8 font-semibold block ml-5">
              <span>Descripcion tipo solicitud:</span>
              <p>{{pqrsDesc}}</p>
            </div>
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
          <div class="card flex justify-content-center">
                <p-button label="Enviar" icon="pi pi-check" (onClick)="submitPqrs()"></p-button>
            </div>
            <p-toast></p-toast>
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
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() savePQRS = new EventEmitter<PQR>();

  showPersonalInfo : boolean = true;
  pqrsDesc = "";
  pqrsTypes: number = 0;
  anonimous = [ { key: 'true', name: 'Si' }, { key: 'false', name: 'No' } ];
  tiposPQRS = [
    {
      key: 1,
      name: 'Petición',
      desc: 'PETICION: Es el derecho fundamental que tiene toda persona natural o jurídica a presentar solicitudes de interés general o particular. Las peticiones podrán ser presentadas de manera escrita o verbal a través de los diferentes canales de atención o de gestión dispuestos por la entidad'
    },
    {
      key: 2,
      name: 'Queja',
      desc: 'QUEJA: Es la manifestación verbal o escrita de insatisfacción, molestia o disgusto hecha por una persona natural o jurídica respecto a la conducta o actuar de un servidor de la entidad o de los particulares que cumplan una función en el servicio.'
    },
    {
      key: 3,
      name: 'Reclamo',
      desc: 'RECLAMO: Manifestación verbal o escrita de insatisfacción, molestia o disgusto hecha por una persona natural o jurídica en la prestación de alguno de los servicios y/o productos ofrecidos por la Entidad.'
    },
    {
      key: 4,
      name: 'Sugerencia',
      desc: 'SUGERENCIA: Manifestación verbal o escrita de una idea o propuesta para mejorar los productos o servicios ofrecidos por la entidad'
    }
  ]
  pqrs : PQR | undefined = undefined;

  selectTipoPQRS(tipoKey: number, tipoDesc: string) {
    this.pqrsTypes = tipoKey;
    this.pqrsDesc = tipoDesc;
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


constructor(
  private fb: FormBuilder,
  private pqrsService: PqrsService,
  private message: MessageService,
  private confirmationService: ConfirmationService) {}


ngOnInit(): void {
    this.pqrsDesc = 'ATENCION!!! Selecciona un tipo de solicitud para continuar'
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
      anonimo: this.pqrsForm.get('anonimo')?.value ?? false,
      nombre: this.pqrsForm.get('nombre')?.value ?? '',
      apellido: this.pqrsForm.get('apellido')?.value ?? '',
      cedula: this.pqrsForm.get('dni')?.value ?? '',
      tipoPqrs: this.pqrsTypes,
      id: this.pqrs?.id ?? 0  
    };

    console.log(pqrs);
    this.pqrsService.savePqrs(pqrs).subscribe({
      next: (res: any) => {
        this.pqrsForm.reset();
        this.message.clear();
        this.message.add({ severity: 'success', summary: 'Agregado', detail: 'Se ha enviado el PQRS con exito, se le dará respuesta pronto vía email.' });
      },
      error: (err: any) => {
        this.message.clear();
        this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
        console.log(err);
      }
    })
}

}
