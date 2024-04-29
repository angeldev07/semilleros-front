import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
        >
            <ng-template pTemplate="header">
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                    </th>
                    <th pSortableColumn="id">ID <p-sortIcon field="id" /></th>
                    <th pSortableColumn="title">Título <p-sortIcon field="title" /></th>
                    <th pSortableColumn="desc">Descripción <p-sortIcon field="desc" /></th>
                    <th pSortableColumn="dateRad">Fecha Radicado <p-sortIcon field="dateRad" /></th>
                    <th pSortableColumn="stateRad">Estado <p-sortIcon field="stateRad" /></th>
                    <th pSortableColumn="email">Correo <p-sortIcon field="email" /></th>
                    <th pSortableColumn="typePqrs">Tipo PQRS <p-sortIcon field="typePqrs" /></th>
                    <th pSortableColumn="semi">Semillero <p-sortIcon field="semi" /></th>
                    <th pSortableColumn="radCode">Código Radicado <p-sortIcon field="radCode" /></th>
                    <th pSortableColumn="anonimo">Anónimo <p-sortIcon field="anonimo" /></th>
                    <th pSortableColumn="name">Nombre <p-sortIcon field="name" /></th>
                    <th pSortableColumn="lastName">Apellido <p-sortIcon field="lastName" /></th>
                    <th pSortableColumn="dni">Cédula <p-sortIcon field="dni" /></th>
                    <th >Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-customer>
                @if (pqrs.length > 0) {
                <tr>
                    <th>
                        <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                    </th>
                    <td>{{ customer.id }}</td>
                    <td>{{ customer.titulo }}</td>
                    <td>{{ customer.descripcion }}</td>
                    <td>{{ customer.fechaRadicado | date }}</td>
                    <td>{{ customer.estadoRadicado.estado }}</td>
                    <td>{{ customer.correo }}</td>
                    <td>{{ customer.tiposPqrs.tipo }}</td>
                    <td>{{ customer.semillero.name }}</td>
                    <td>{{ customer.codigoRadicado }}</td>
                    <td>{{ customer.anonimo }}</td>
                    <td>{{ customer.nombre }}</td>
                    <td>{{ customer.apellido }}</td>
                    <td>{{ customer.cedula }}</td>
                    <td>
                        <!-- <button
                            pButton
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-danger"
                            (click)="deleteCustomer.emit(customer.id)"
                        ></button> -->
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

  selectedPQRS!: any;
  messages: Message[] = [{ severity: 'info', summary: 'Lista vacia', detail: 'No hay pqrs por mostrar' }];

}
