import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reportes.component.html',
  styles: `
  h2 {
      text-align: center;
  }
  .post {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
  }
  .report {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesComponent implements OnInit {

  public cant_publicaciones = 10;   //cantidad de publicaciones x mes
  public alumnosMes = 30;           //cantidad de alumnos matriculados en el mes
  public titulo = "Reportes";       //titulo principal

  ngOnInit(): void { }

}
