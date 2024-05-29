import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  template: `
    <div>
      <div class="grid">
        <div class="col">
          <div class="p-3 border-round-sm bg-primary opacity-70 font-bold">
            <div class="mb-3">Estudiantes</div>
            <div class="text-center text-xl">0</div>
          </div>
        </div>
        <div class="col">
          <div class="p-3 border-round-sm bg-primary opacity-70 font-bold">
            <div class="mb-3">Eventos</div>
            <div class="text-center text-xl">0</div>
          </div>
        </div>
        <div class="col">
          <div class="p-3 border-round-sm bg-primary opacity-70 font-bold">
            <div class="mb-3">Publicaciones</div>
            <div class="text-center text-xl">0</div>
          </div>
        </div>
      </div>

      <div class="grid mt-2">
        <div class="col-12 sm:col-6">
          <div class="text-lg">Usuarios</div>
          <p-chart type="bar" [data]="data" />
        </div>
        <div class="col-12 sm:col-6">
          <div class="text-lg">Publicaciones</div>
          <p-chart type="line" [data]="dataEventos" />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DashboardComponent {
  data: any;
  dataEventos: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: ['Administradores', 'Directores', 'Estudiantes'],
      datasets: [
        {
          label: 'Cantidad',
          data: [2, 2, 12],
        }
      ],
    };

    this.dataEventos = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Cantidad',
          data: [0, 0, 8, 2, 2, 1, 1, 0, 2, 3, 1, 1, 0, 0, 0],
        }
      ],
    }
  }
}
