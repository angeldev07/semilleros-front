import { Component, OnInit } from '@angular/core';
import { NormatividadService } from '../services/normatividad.service';  // Asegúrate de que la ruta al servicio es correcta
import { Normatividad } from '../models/normatividad.model';  // Asegúrate de que la ruta al modelo es correcta

@Component({
  selector: 'app-normatividad-list',
  templateUrl: './normatividad-list.component.html',
  styleUrls: ['./normatividad-list.component.css'],
})
export class NormatividadListComponent implements OnInit {
  normatividades: Normatividad[] = [];  // Usando el modelo Normatividad
  router: any;

  constructor(private normatividadService: NormatividadService) {}

  ngOnInit(): void {
    this.loadNormatividades();
  }

  loadNormatividades(): void {
    this.normatividadService.listRegulations().subscribe({
      next: (data) => {
        this.normatividades = data;
      },
      error: (error) => {
        console.error('Error loading normatividades', error);
      }
    });
  }

  addNormatividad(): void {
    // Redirigir al usuario a la ruta del formulario de añadir normatividad
    this.router.navigate(['/normatividad/']);
  }
}
