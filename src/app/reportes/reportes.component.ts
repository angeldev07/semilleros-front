import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'], // Agregar la ruta del archivo CSS
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesComponent {
  public cant_publicaciones = 10; // cantidad de publicaciones x mes
  public alumnosMes = 30; // cantidad de alumnos matriculados en el mes
  public titulo = "Reportes"; // titulo principal

  generarAlumnos() {
    const doc = new jsPDF();
    // Agregar contenido al PDF
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos Matriculados', 20, 20);
    doc.setFontSize(12);
    doc.text(`Cantidad de alumnos: ${this.alumnosMes}`, 20, 40);
    // Guardar el PDF
    doc.save('reporte-alumnos.pdf');
  }

  generarPublicaciones() {
    const doc = new jsPDF();
    // Agregar contenido al PDF
    doc.setFontSize(18);
    doc.text('Reporte de Publicaciones del mes', 20, 20);
    doc.setFontSize(12);
    doc.text(`Cantidad de publicaciones: ${this.cant_publicaciones}`, 20, 40);
    // Guardar el PDF
    doc.save('reporte-publicaciones.pdf');
  }

  generarGeneral() {
    const doc = new jsPDF();
    // Agregar contenido al PDF
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos Matriculados en el mes', 20, 20);
    doc.setFontSize(12);
    doc.text(`Cantidad de alumnos: ${this.alumnosMes}`, 20, 40);
    doc.setFontSize(18);
    doc.text('Reporte de Publicaciones del mes', 20, 60);
    doc.setFontSize(12);
    doc.text(`Cantidad de publicaciones: ${this.cant_publicaciones}`, 20, 80);
    // Guardar el PDF
    doc.save('reporte-general.pdf');
  }

}
