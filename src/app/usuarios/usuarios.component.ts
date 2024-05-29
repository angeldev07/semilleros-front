import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';


import { PqrsListComponent } from './components/usr-list/usr-list.component';
import { AddPqrsComponent } from './components/add-usr/add-usr.component';
import { PQR } from './api/usr';
import { PqrsService } from './services/usr.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({

  selector: 'app-usuarios',
  standalone: true,
  imports: [
   ButtonModule,
    PqrsListComponent,
    AddPqrsComponent
  ],
  template: `
          <section
        class="card flex justify-content-between align-items-center px-4"
        >
        <h2 class="mb-0 text-2xl md:text-3xl">Crear un nuevo usuario</h2>
                <p-button
                    label="Agregar"
                    icon="pi pi-plus"
                    [iconPos]="'right'"
                    [outlined]="true"
                    (onClick)="openAddPQRDialog = true"
                ></p-button>
        </section>
        <section>
        <app-pqrs-list
            [pqrs]="pqrsLista"
            (deletePQRS)="deletePQRS($event)"
            (changeStatePQRS)="changeStatePQRS($event.id, $event.state)"
        ></app-pqrs-list>
        </section>
        @if (openAddPQRDialog) {
          <app-add-pqrs
            (savePQRS)="savePQRS($event)"
            [(visible)]="openAddPQRDialog"
          ></app-add-pqrs>
            }
  `,
  styles: ``,
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class UsuariosComponent implements OnInit {
  openAddPQRDialog = false;
  nextState = '';
  pqrsList = signal<PQR[]>([]);
  selectedPQRS = signal<PQR | null | number[]>(null);

  constructor(
    private pqrsService: PqrsService,
    private message: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getPQRSList();
  }

  get pqrsLista(){
    return this.pqrsList();
  }

  getPQRSList(){
    this.pqrsService.getPqrs().subscribe({
      next: (res: any) => {
        this.pqrsList.set(res);
      },
      error: (err: any) => {
        console.log(err)
      }

    })
  }

  savePQRS(pqrs: PQR){
    const data = {
      nombre: pqrs.nombre,
      apellido: pqrs.apellido,
      cedula: pqrs.cedula,
      correo: pqrs.correo,
      anonimo: pqrs.anonimo,
      titulo: pqrs.titulo,
      descripcion: pqrs.descripcion,
      tipoPqrs: pqrs.tipoPqrs,
    };
    console.log(data);
    this.pqrsService.savePqrs(data).subscribe({
      next: (res: any) => {
        this.getPQRSList();
        this.message.clear();
        this.message.add({ severity: 'success', summary: 'Agregado', detail: 'Se ha enviado el PQRS con exito' });
      },
      error: (err: any) => {
        this.message.clear();
        this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
        console.log(err);
      }
    })
  }


  deletePQRS(id: number) {
    this.pqrsService.deletePqrs(id).subscribe({
        next: () => {
            this.getPQRSList();
            this.message.clear();
            this.message.add({ severity: 'success', summary: 'Eliminado', detail: 'Se ha eliminado el radicado con éxito' });
        },
        error: (err) => {
            this.message.clear();
            this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
            console.log(err);
        },
    });
}

changeStatePQRS(id: number, state: string){
  if(state === 'PENDIENTE'){
    this.nextState = 'revision';
  }else{
    this.nextState = 'resuelto';
  }
  this.pqrsService.changeStatePqrs(id, this.nextState).subscribe({
    next: () => {
      this.getPQRSList();
      this.message.clear();
      this.message.add({ severity: 'success', summary: 'Actualizado', detail: 'Se ha actualizado el estado del radicado con éxito' });
    },
    error: (err) => {
      this.message.clear();
      this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
      console.log(err);
    }
  })
}

  

}

