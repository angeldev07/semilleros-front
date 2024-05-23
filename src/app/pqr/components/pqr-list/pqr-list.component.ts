import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PQR } from '../../api/pqr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Message } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PqrsService } from '../../services/pqr.service';

@Component({
  selector: 'app-pqrs-list',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    ButtonModule,
    MessagesModule,
    ConfirmDialogModule,
    FormsModule,
  ],
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
            <ng-template pTemplate="caption">
                <div class="flex flex-wrap justify-content-end gap-2">
                    <p-button label="Expand All" icon="pi pi-plus" text (onClick)="expandAll()" />
                    <p-button label="Collapse All" icon="pi pi-minus" text (onClick)="collapseAll()" />
                </div>
            </ng-template>
            <ng-template pTemplate="header">
                <tr>
                    <th style="width: 5rem"></th>
                    <th pSortableColumn="id" style="width: 3rem">ID <p-sortIcon field="id" /></th>
                    <th pSortableColumn="title">Título <p-sortIcon field="title" /></th>
                    <!-- <th pSortableColumn="desc" style="width: 200px;">Descripción <p-sortIcon field="desc" /></th> -->
                    <th pSortableColumn="dateRad">Fecha Radicado <p-sortIcon field="dateRad" /></th>
                    <th pSortableColumn="stateRad">Estado <p-sortIcon field="stateRad" /></th>
                    <th pSortableColumn="email">Correo <p-sortIcon field="email" /></th>
                    <th pSortableColumn="typePqrs">Tipo PQRS <p-sortIcon field="typePqrs" /></th>
                    <th pSortableColumn="radCode">Código Radicado <p-sortIcon field="radCode" /></th>
                    <th pSortableColumn="anonimo">Anónimo <p-sortIcon field="anonimo" /></th>
                    <th pSortableColumn="name">Nombre <p-sortIcon field="name" /></th>
                    <th pSortableColumn="lastName">Apellido <p-sortIcon field="lastName" /></th>
                    <th pSortableColumn="dni">Cédula <p-sortIcon field="dni" /></th>
                    <th >Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-pqrsLista let-expanded="expanded">
                @if (pqrs.length > 0) {
                <tr>
                    <td>
                        <p-button
                        type="button"
                        pRipple
                        [pRowToggler]="pqrsLista"
                        [text]="true"
                        [rounded]="true"
                        [plain]="true"
                        [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
                        (onClick) = "getPqrsById(pqrsLista.id)"
                        />
                    </td>
                    <td>{{ pqrsLista.id }}</td>
                    <td>{{ pqrsLista.titulo }}</td>
                    <!-- <td>{{ pqrsLista.descripcion }}</td> -->
                    <!-- <td style="max-width: 200px; word-wrap: break-word;">
                {{pqrsLista.descripcion}}
            </td> -->
                    <td>{{ pqrsLista.fechaRadicado | date }}</td>
                    <td>{{ pqrsLista.estadoRadicado.estado }}</td>
                    <td>{{ pqrsLista.correo }}</td>
                    <td>{{ pqrsLista.tiposPqrs.tipo }}</td>
                    <td>{{ pqrsLista.codigoRadicado }}</td>
                    <td>{{ pqrsLista.anonimo }}</td>
                    <td>{{ pqrsLista.nombre }}</td>
                    <td>{{ pqrsLista.apellido }}</td>
                    <td>{{ pqrsLista.cedula }}</td>
                    <td>
                        <p-confirmDialog></p-confirmDialog>
                        <button
                            pButton
                            icon="pi pi-pencil"
                            label="Cambio Estado"
                            class="p-button-rounded p-button-info"
                            (click)="changeStatePQRS.emit({ id: pqrsLista.id, state: pqrsLista.estadoRadicado.estado })"
                        ></button>
                        <button
                            pButton
                            icon="pi pi-trash"
                            label="Eliminar"
                            class="p-button-rounded p-button-danger"
                            (click)="deletePQRS.emit({ id: pqrsLista.id, state: pqrsLista.estadoRadicado.estado })"
                        ></button>
                    </td>
                </tr>
                }
            </ng-template>
            <ng-template pTemplate="rowexpansion">
            <tr>
                <td colspan="7">
                    <div class="p-3">
                        <h2>Descripción de esta solicitud</h2>
                        <p>{{pqrs[idPqr].descripcion}}</p>
                    </div>
                </td>
            </tr>
        </ng-template>
        </p-table>
        } @else {
          <p-messages [value]="messages" [enableService]="false" [closable]="false"></p-messages>
        }

  `,
    styles: `
    :host {
      display: block;
    }
    td, th {
      text-align: center;
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PqrsListComponent {
  @Input() pqrs: PQR[] = [];
  @Input() visible: boolean = false;
  @Output() deletePQRS = new EventEmitter<{ id: number, state: string }>();
  @Output() changeStatePQRS = new EventEmitter<{ id: number, state: string }>();
  expandedRows = {};
  pqrsD: PQR | undefined;
  idPqr: number = 0;

  constructor(
    private pqrsService: PqrsService
  ) { }

  expandAll() {
    this.expandedRows = this.pqrs.reduce((acc: { [key: number]: boolean }, p: { id: number }) => {
      acc[p.id] = true;
      return acc;
    }, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getPqrsById(id: number) {
    this.idPqr = id-1;
    console.log(id);
    this.pqrsService.getPQRSById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.pqrsD = res;
        console.log(this.pqrsD);
        console.log(this.pqrsD?.descripcion);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  selectedPQRS!: any;
  messages: Message[] = [{ severity: 'info', summary: 'Lista vacia', detail: 'No hay pqrs por mostrar' }];

}
