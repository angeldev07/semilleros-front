import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PqrsListComponent } from './components/pqr-list/pqr-list.component';
import { AddPqrsComponent } from './components/add-pqr/add-pqr.component';
import { PQR } from './api/pqr';
import { PqrsService } from './services/pqr.service';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-pqr',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    TabViewModule,
    PqrsListComponent,
    AddPqrsComponent
  ],
  template: `
      <main>
        <section
            class="card flex justify-content-between align-items-center px-4"
            >
              <h2 class="mb-0 text-2xl md:text-3xl">Radicados PQR</h2>
        </section>
        <section>

        <p-tabView>
                    <p-tabPanel header="Listado">
                      <app-pqrs-list
                        [pqrs]="pqrsLista"
                        (deletePQRS)="deletePQRS($event.id, $event.state)"
                        (changeStatePQRS)="changeStatePQRS($event.id, $event.state)"
                       ></app-pqrs-list>
                    </p-tabPanel>
                    <p-tabPanel header="Pendientes">
                        <ng-template pTemplate="content">
                            <app-pqrs-list [pqrs]="pqrPendiente" />
                        </ng-template>
                    </p-tabPanel>
                    <p-tabPanel header="Revision">
                        <ng-template pTemplate="content">
                            <app-pqrs-list [pqrs]="pqrRevision" />
                        </ng-template>
                    </p-tabPanel>
                    <p-tabPanel header="Resuelto">
                        <ng-template pTemplate="content">
                            <app-pqrs-list [pqrs]="pqrResuelto" />
                        </ng-template>
                    </p-tabPanel>
                </p-tabView>
<!--
          <app-pqrs-list
              [pqrs]="pqrsLista"
              (deletePQRS)="deletePQRS($event.id, $event.state)"
              (changeStatePQRS)="changeStatePQRS($event.id, $event.state)"
          ></app-pqrs-list> -->
        </section>
          <p-toast></p-toast>
      </main>
  `,
  styles: ``,
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqrComponent implements OnInit{
  nextState = '';
  stateMayus = '';
  pqrsList = signal<PQR[]>([]);
  selectedPQRS = signal<PQR | null | number[]>(null);

  constructor(
    private pqrsService: PqrsService,
    private message: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.getPQRSList();
  }

  get pqrPendiente() {
    return this.pqrsList().filter((pqr) => pqr.estadoRadicado && pqr.estadoRadicado.estado === 'PENDIENTE');
  }

  get pqrRevision() {
    return this.pqrsList().filter((pqr) => pqr.estadoRadicado && pqr.estadoRadicado.estado === 'REVISION');
  }

  get pqrResuelto() {
    return this.pqrsList().filter((pqr) => pqr.estadoRadicado && pqr.estadoRadicado.estado === 'RESUELTO');
  }

  get pqrsLista(){
    return this.pqrsList();
  }

  getPQRSList(){
    this.pqrsService.getPqrs().subscribe({
      next: (res: any) => {
        this.pqrsList.set(res);
        console.log(res)
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
      estado: pqrs.estadoRadicado,
      descripcion: pqrs.descripcion,
      tipoPqrs: pqrs.tipoPqrs,
      id: pqrs.id
    };
    console.log(data);
    this.pqrsService.savePqrs(data, pqrs.tipoPqrs).subscribe({
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


  deletePQRS(id: number, state: string) {
    if(state != 'RESUELTO'){
      this.message.add({ severity: 'error', summary: 'Error :(', detail: 'El radicado no se encuentra resuelto, por ende no se puede eliminar' });
      return;
    }
      this.confirmationService.confirm({
          message: 'Desea borrar esta solicitud PQRS?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass:"p-button-danger p-button-text",
          rejectButtonStyleClass:"p-button-text p-button-text",
          acceptIcon:"none",
          rejectIcon:"none",
          accept: () => {
              this.pqrsService.deletePqrs(id).subscribe({
                next: () => {
                    this.getPQRSList();
                    this.message.clear();
                    this.message.add({ severity: 'success', summary: 'Eliminado', detail: 'Se ha eliminado la solicitud con éxito' });
                },
                error: (err) => {
                    this.message.clear();
                    this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
                    console.log(err);
                },
              });
          },
          reject: () => {
              this.message.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
      });

}

changeStatePQRS(id: number, state: string){
  if(state === 'RESUELTO'){
    this.message.add({ severity: 'error', summary: 'Error :(', detail: 'El radicado ya se encuentra resuelto' });
    return;
  }
  if(state === 'PENDIENTE'){
    this.nextState = 'revision';
    this.stateMayus = 'REVISION';
  }else{
    this.nextState = 'resuelto';
    this.stateMayus = 'RESUELTO';
  }
  this.pqrsService.changeStatePqrs(id, this.nextState).subscribe({
    next: () => {
      this.getPQRSList();
      this.message.clear();
      this.message.add({ severity: 'success', summary: 'Actualizado', detail: 'Se ha actualizado el estado de '+state+' a '+this.stateMayus+' con éxito'});
    },
    error: (err) => {
      this.message.clear();
      this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
      console.log(err);
    }
  })

}


}
