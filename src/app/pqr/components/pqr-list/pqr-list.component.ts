import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PQR } from '../../api/pqr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pqrs-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MessagesModule,
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
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="id" style="width: 3rem">ID <p-sortIcon field="id" /></th>
                    <th pSortableColumn="title">Título <p-sortIcon field="title" /></th>
                    <th pSortableColumn="desc" style="width: 200px;">Descripción <p-sortIcon field="desc" /></th>
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
                    <td>{{ pqrsLista.id }}</td>
                    <td>{{ pqrsLista.titulo }}</td>
                    <!-- <td>{{ pqrsLista.descripcion }}</td> -->
                    <td style="max-width: 200px; word-wrap: break-word;">
                {{pqrsLista.descripcion}}
            </td>
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
                        <button
                            pButton
                            icon="pi pi-question"
                            class="p-button-rounded p-button-info"
                            (click)="changeStatePQRS.emit({ id: pqrsLista.id, state: pqrsLista.estadoRadicado.estado })"
                        ></button>
                        <button
                            pButton
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-danger"
                            (click)="deletePQRS.emit(pqrsLista.id)"
                        ></button>
                    </td>
                </tr>
                }
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
  @Output() deletePQRS = new EventEmitter<number>();
  @Output() changeStatePQRS = new EventEmitter<{ id: number, state: string }>();



  selectedPQRS!: any;
  messages: Message[] = [{ severity: 'info', summary: 'Lista vacia', detail: 'No hay pqrs por mostrar' }];

}
