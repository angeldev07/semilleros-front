import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { AlumnosService } from './services/alumnos.service';
import { PostsService } from './services/posts.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public alumnos: any[] = [];
  public posts: any[] = [];
  public titulo = "Reportes"; // titulo principal


  public cant_publicaciones = 10;
  public alumnosMes = 30;


  constructor(private alumnosService: AlumnosService, private postsService: PostsService) { }

  ngOnInit() {
    this.getEnrolledStudents();
    this.getPosts();
  }

  getEnrolledStudents() {
    this.alumnosService.getEnrolledStudents()
      .subscribe(
        (res: any) => {
          console.log('Respuesta de la petición HTTP:', res);
          this.alumnos = res;
          console.log('Alumnos asignados:', this.alumnos);
          this.generarAlumnos();
        },
        error => {
          console.error('Error al obtener los alumnos:', error);
        }
      );
  }

  generarAlumnos() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos Matriculados', 20, 20);
    doc.setFontSize(12);
    this.alumnos.forEach((alumno, index) => {
      const y = 40 + (index * 10);
      doc.text(`${alumno.name} - ${alumno.email}`, 20, y);
    });
    doc.save('reporte-alumnos.pdf');
  }


  getPosts() {
    this.postsService.getPosts()
      .subscribe(
        (res: any) => {
          console.log('Respuesta de la petición HTTP de publicaciones:', res);
          this.posts = res;
          console.log('Publicaciones asignadas:', this.posts);
          this.generarPublicaciones();
        },
        error => {
          console.error('Error al obtener las publicaciones:', error);
        }
      );
  }


  generarPublicaciones() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Publicaciones', 20, 20);
    doc.setFontSize(12);

    this.posts.forEach((post, index) => {
      const y = 40 + (index * 10);
      doc.text(`${post.titulo} - ${post.fechaCreacion}`, 20, y);
    });

    doc.save('reporte-publicaciones.pdf');
  }

  generarGeneral() {
    const doc = new jsPDF();

    // Agregar sección de alumnos matriculados
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos Matriculados', 20, 20);
    doc.setFontSize(12);

    this.alumnos.forEach((alumno, index) => {
      const y = 40 + (index * 10);
      doc.text(`${alumno.name} - ${alumno.email}`, 20, y);
    });

    // Agregar sección de publicaciones
    const yOffset = 40 + (this.alumnos.length * 10) + 20;
    doc.setFontSize(18);
    doc.text('Reporte de Publicaciones', 20, yOffset);
    doc.setFontSize(12);

    this.posts.forEach((post, index) => {
      const y = yOffset + 20 + (index * 10);
      doc.text(`${post.titulo} - ${post.fechaCreacion}`, 20, y);
    });

    doc.save('reporte-general.pdf');
  }
}
