import { Component, OnInit } from '@angular/core';
import { SemilleroService } from '../semilleros/semilleros.service';

@Component({
  selector: 'app-semilleros',
  templateUrl: './semilleros.component.html',
  styleUrls: ['./semilleros.component.css']
})
export class SemillerosComponent implements OnInit {
  semilleros: any[] = [];
  user = {
    id: 1, // Puedes cambiar esto según la lógica para obtener el ID del usuario actual
    email: 'user@example.com'
  };
  codigo = '12345'; // Puedes cambiar esto según tu lógica para obtener el código

  constructor(private semilleroService: SemilleroService) {}

  ngOnInit() {
    this.semilleroService.getSemilleros().subscribe(
      (data) => {
        this.semilleros = data;
      },
      (error) => {
        console.error('Error fetching semilleros', error);
      }
    );
  }

  inscribirse(semilleroId: number) {
    this.semilleroService.inscribirse(semilleroId, this.codigo, this.user).subscribe(
      (response) => {
        console.log('Inscripción exitosa', response);
      },
      (error) => {
        console.error('Error inscribiéndose en el semillero', error);
      }
    );
  }
}
