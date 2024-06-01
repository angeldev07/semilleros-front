import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { AlumnosService } from './services/alumnos.service';
import { PostsService } from './services/posts.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {
  public usuariosMatriculados: any[] = [];
  public postsPublicados: any[] = [];
  public titulo = "Reportes"; // titulo principal

  constructor(private alumnosService: AlumnosService, private postsService: PostsService) { }

  ngOnInit() {
    this.getUsuariosMatriculados();
    this.getPosts();
  }

  getUsuariosMatriculados() {
    this.alumnosService.getUsuariosMatriculados()
      .subscribe(
        (res: any) => {
          console.log('Respuesta de la petición HTTP de usuarios matriculados:', res);
          this.usuariosMatriculados = res;
          console.log('Usuarios matriculados asignados:', this.usuariosMatriculados);
        },
        error => {
          console.error('Error al obtener los usuarios matriculados:', error);
        }
      );
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe(
        (res: any) => {
          console.log('Respuesta de la petición HTTP de publicaciones:', res);
          this.postsPublicados = res;
          console.log('Publicaciones asignadas:', this.postsPublicados);
        },
        error => {
          console.error('Error al obtener las publicaciones:', error);
        }
      );
  }

  generarReporteAlumnos() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos Matriculados', 20, 20);
    doc.setFontSize(12);
    this.usuariosMatriculados.forEach((alumno, index) => {
      const y = 40 + (index * 10);
      doc.text(`${alumno.codigoUniversidad} - ${alumno.name} - ${alumno.email} - ${alumno.semestreActual}`, 20, y);
    });
    doc.save('reporte-alumnos.pdf');
  }

  generarReportePublicaciones() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Publicaciones', 20, 20);
    doc.setFontSize(12);

    this.postsPublicados.forEach((post, index) => {
      const y = 40 + (index * 10);
      const fechaCreacion = new Date(post.fechaCreacion);
      const fechaFormateada = `${fechaCreacion.getFullYear()}-${('0' + (fechaCreacion.getMonth() + 1)).slice(-2)}-${('0' + fechaCreacion.getDate()).slice(-2)}`;
      doc.text(`${post.titulo} - ${fechaFormateada} - ${post.tag}`, 20, y);
    });

    doc.save('reporte-publicaciones.pdf');
  }

  generarReporteGeneral() {
    const doc = new jsPDF();

    // Agregar sección de alumnos matriculados
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos Matriculados', 20, 20);
    doc.setFontSize(12);

    this.usuariosMatriculados.forEach((alumno, index) => {
      const y = 40 + (index * 10);
      doc.text(`${alumno.codigoUniversidad} - ${alumno.name} - ${alumno.email} - ${alumno.semestreActual}`, 20, y);
    });

    // Agregar sección de publicaciones
    const yOffset = 40 + (this.usuariosMatriculados.length * 10) + 20;
    doc.setFontSize(18);
    doc.text('Reporte de Publicaciones', 20, yOffset);
    doc.setFontSize(12);

    this.postsPublicados.forEach((post, index) => {
      const y = yOffset + 20 + (index * 10);
      doc.text(`${post.titulo} - ${post.fechaCreacion} - ${post.tag}`, 20, y);
    });

    doc.save('reporte-general.pdf');
  }
}
