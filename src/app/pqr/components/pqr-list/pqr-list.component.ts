import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PQR } from '../../api/pqr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Message, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PqrsService } from '../../services/pqr.service';
import { AnonimoPipe } from "../../pipes/anonimo.pipe";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-pqrs-list',
    standalone: true,
    template: `
        @if (pqrs.length > 0) {
        <p-table
            [value]="pqrs"
            [tableStyle]="{ 'min-width': '50rem' }"
            styleClass="p-datatable-striped"
            [paginator]="true"
            [rows]="5"
            [selectionPageOnly]="true"
            [(selection)]="selectedPQRS"
            [rowsPerPageOptions]="[5, 10, 20]"
            [globalFilterFields]="['name']"
            dataKey="id"
        >
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="id" style="width: 3rem">ID <p-sortIcon field="id" /></th>
                    <th pSortableColumn="title">Título</th>
                    <th pSortableColumn="dateRad">Fecha Radicado <p-sortIcon field="dateRad" /></th>
                    <th pSortableColumn="stateRad">Estado</th>
                    <th pSortableColumn="email">Correo</th>
                    <th pSortableColumn="typePqrs">Tipo PQRS <p-sortIcon field="typePqrs" /></th>
                    <th pSortableColumn="radCode">Código Radicado</th>
                    <th pSortableColumn="anonimo">Anónimo</th>
                    <th >Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-pqrsLista let-expanded="expanded">
                @if (pqrs.length > 0) {
                <tr>
                    <td>{{ pqrsLista.id }}</td>
                    <td>{{ pqrsLista.titulo }}</td>
                    <td>{{ pqrsLista.fechaRadicado | date }}</td>
                    <td>{{ pqrsLista.estadoRadicado.estado }}</td>
                    <td>{{ pqrsLista.correo }}</td>
                    <td>{{ pqrsLista.tipoPqrs.tipo }}</td>
                    <td>{{ pqrsLista.codigoRadicado }}</td>
                    <td>{{ pqrsLista.anonimo | anonimo}}</td>
                    <td>
                        <p-confirmDialog></p-confirmDialog>
                        <button
                            pButton
                            icon="pi pi-pencil"
                            label="Acciones PQRS"
                            class="p-button-rounded p-button-info"
                            (click)="pqrsActions(pqrsLista.id)"
                        ></button>
                        <button
                            pButton
                            icon="pi pi-info-circle"
                            label="Ver a detalle"
                            class="p-button-rounded p-button-info"
                            (click)="pqrsDetail(pqrsLista.id)"
                        ></button>
                    </td>
                </tr>
                }

            </ng-template>
        </p-table>
        } @else {
          <p-messages [value]="messages" [enableService]="false" [closable]="false"></p-messages>
        }
        <p-dialog
              header="Detalles de la Solicitud PQRS"
              [modal]="true"
              [(visible)]="pqrsDetailDialog"
              [style]="{ width: '50rem' }"
              [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
              >
                <h4>Titulo Pqr</h4>
                <p class="text-xl">{{pqrsD?.titulo}}</p>
                <h4>Descripción Pqr</h4>
                <p class="desc text-xl">{{pqrsD?.descripcion}}</p>
                <h4>Correo</h4>
                <p class="text-xl">{{pqrsD?.correo}}</p>
                <h4>Fecha Solicitud</h4>
                <p class="text-xl">{{pqrsD?.fechaRadicado | date}}</p>
                <h4>Nombres Solicitante</h4>
                <p class="text-xl">{{pqrsD?.nombre}}</p>
                <h4>Apellidos Solicitante</h4>
                <p class="text-xl">{{pqrsD?.apellido}}</p>
                <h4>Cédula Solicitante</h4>
                <p class="text-xl">{{pqrsD?.cedula}}</p>

          </p-dialog>

          <p-dialog
              header="Acciones para el PQRS"
              [modal]="true"
              [(visible)]="pqrsActionsDialog"
              [style]="{ width: '50rem' }"
              [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
              >
            <div>
              <h3>Remitir al departamento:</h3>
              <p-dropdown [options]="departamentos" optionLabel="nombre"></p-dropdown>
              <button
                pButton
                icon="pi pi-send"
                label="Enviar al Dpto"
                class="p-button-rounded p-button-primary"
                (click)="enviarPqrDpto(pqrsD.id)"
              ></button>

              <h3>Enviar Respuesta al Solicitante</h3>
                <textarea
                  rows="5"
                  cols="30"
                  class="w-full"
                  pInputTextarea
                  [(ngModel)]="pqrsAnswer"
                  >
                </textarea>
              <button
                pButton
                icon="pi pi-send"
                label="Enviar Respuesta"
                class="p-button-rounded p-button-primary"
                (click)="enviarRespuestaPQRS(pqrsD.id, pqrsAnswer)"
              ></button>
                <hr>
              <button
                  pButton
                  icon="pi pi-pencil"
                  label="Cambio Estado"
                  class="p-button-rounded p-button-info"
                  (click)="cambiarEstadoPQRS(pqrsD.id, pqrsD.estadoRadicado.estado)"
              ></button>
                <button
                  pButton
                  icon="pi pi-trash"
                  label="Eliminar"
                  class="p-button-rounded p-button-danger"
                  (click)="eliminarPQRS(pqrsD.id, pqrsD.estadoRadicado.estado)"
                ></button>
            </div>
          </p-dialog>
          <p-toast></p-toast>
  `,
    styles: `
    :host {
      display: block;
    }
    td, th {
      text-align: center;
    }
    .desc{
      word-wrap: break-word;
      white-space: normal;
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        DialogModule,
        TableModule,
        ButtonModule,
        MessagesModule,
        ConfirmDialogModule,
        FormsModule,
        DropdownModule,
        AnonimoPipe,
        ToastModule,
        InputTextareaModule
    ],
    providers: [MessageService]
})
export class PqrsListComponent {
  @Input() pqrs: PQR[] = [];
  @Input() visible: boolean = false;
  @Output() deletePQRS = new EventEmitter<{ id: number, state: string }>();
  @Output() changeStatePQRS = new EventEmitter<{ id: number, state: string }>();
  pqrsD: any;
  pqrsActionsDialog: boolean = false;
  pqrsDetailDialog: boolean = false;
  pqrsAnswer: string = '';
  departamentos: any[] = [
    { id: 1, nombre: 'Director del semillero' },
    { id: 2, nombre: 'Líder del semillero' },
    { id: 3, nombre: 'Soporte Técnico' },
  ];

  constructor(
    private pqrsService: PqrsService,
    private message: MessageService
  ) { }

  pqrsActions(id : number) {
    this.pqrsActionsDialog = true;
    this.getPqrsById(id);
  }

  pqrsDetail(id: number) {
    this.pqrsDetailDialog = true;
    this.getPqrsById(id);
  }

  getPqrsById(id: number) {
    this.pqrsService.getPQRSById(id).subscribe({
      next: (res: any) => {
        this.pqrsD = res;
        console.log(this.pqrsD);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  enviarPqrDpto(id: number) {
    this.pqrsActionsDialog = false;
    console.log('Enviar a departamento', id);
    this.message.clear();
    this.message.add({ severity: 'success', summary: 'Agregado', detail: 'PQR remitida con exito' });
  }

  enviarRespuestaPQRS(id: number, respuesta: string) {
    this.pqrsActionsDialog = false;
    this.pqrsService.sendAnswerPqrs(id, respuesta).subscribe({
      next: (res: any) => {
        console.log(res);
        this.pqrsAnswer = '';
        this.message.clear();
        this.message.add({ severity: 'success', summary: 'Agregado', detail: 'Respuesta enviada con exito' });
      },
      error: (err: any) => {
        console.log(err);
        this.message.clear();
        this.message.add({ severity: 'error', summary: 'Error :(', detail: 'Ha ocurrido un error inesperado. Intentelo de nuevo' });
      }
    })

  }

  cambiarEstadoPQRS(id: number, state: string) {
    this.pqrsActionsDialog = false;
    this.changeStatePQRS.emit({ id, state });
  }

  eliminarPQRS(id: number, state: string) {
    this.pqrsActionsDialog = false;
    this.deletePQRS.emit({ id, state });
  }

  selectedPQRS!: any;
  messages: Message[] = [{ severity: 'info', summary: 'Lista vacia', detail: 'No hay pqrs por mostrar' }];

}
