import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/configuracion.service';
import { Router } from '@angular/router';


@Component({
  imports: [
    CommonModule // Asegúrate de importar CommonModule aquí
  ],
  selector: 'app-semillero',
  standalone: true,
  templateUrl: './semillero.component.html',
  styleUrl: './configuracion.component.css'  
})
export class SemilleroComponent implements OnInit{

  informacion : any = {}
  templateLoaded: boolean = false;

  constructor(private router: Router, private configService: ConfigService, private cdr: ChangeDetectorRef){ }
    
    async ngOnInit(): Promise<void> {
      try {
        this.configService.getConfig().subscribe(res => {
          this.informacion = res
          console.log(res);
          this.cdr.detectChanges();
          /*(document.getElementById('nombre') as HTMLInputElement).value = this.informacion.nombre,
          (document.getElementById('sigla') as HTMLInputElement).value = this.informacion.sigla,
          (document.getElementById('mision') as HTMLTextAreaElement).value = this.informacion.mision,
          (document.getElementById('vision') as HTMLTextAreaElement).value = this.informacion.vision,
          (document.getElementById('palabrasClave') as HTMLInputElement).value = this.informacion.palabrasClave,
          (document.getElementById('director') as HTMLInputElement).value = this.informacion.director,
          (document.getElementById('whatsapp') as HTMLInputElement).value = this.informacion.whatsapp,
          (document.getElementById('instagram') as HTMLInputElement).value = this.informacion.instagram,
          (document.getElementById('facebook') as HTMLInputElement).value = this.informacion.facebook,
          (document.getElementById('correo') as HTMLInputElement).value = this.informacion.correo*/
        })} catch (error) {
        console.error('Error getting config:', error);
      }
    }

  

  onFileSelected(event: any): void {
    // Lógica para manejar la selección de archivo
  }
}
