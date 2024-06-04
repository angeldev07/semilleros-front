import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/configuracion.service';
import { Router } from '@angular/router';


@Component({
  imports: [
    CommonModule // Asegúrate de importar CommonModule aquí
  ],
  selector: 'app-configuracion',
  standalone: true,
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'  
})
export class ConfiguracionComponent implements OnInit{

  informacion : any = {}
  templateLoaded: boolean = false;

  constructor(private router: Router, private configService: ConfigService){ }

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /*ngOnInit(){
    const nombre = "ola";
    const sigla = "ola";
    const mision = "ola";
    const vision = "ola";
    const palabrasClave = "ola";
    const director = "ola";
    const whatsapp = "ola";
    const instagram = "ola";
    const facebook = "ola";
    const correo = "ola";
      localStorage.setItem('semillero', JSON.stringify({ nombre, sigla, mision, vision, palabrasClave, director, whatsapp, instagram, facebook, correo }));
      this.informacion = JSON.parse(localStorage.getItem('semillero') || '{}');
      console.log(this.informacion)
    }*/
    
    async ngOnInit(): Promise<void> {
      try {
        /*
        this.informacion = await this.configService.getConfig().subscribe({
        );
        console.log(this.informacion.correo, "el correo");
        this.templateLoaded = true;
        setTimeout(() => {
          console.log('ya viene')
        }, 3000);
        setTimeout(() => {
          this.submitConfig();
          setTimeout(() => {
            this.submitConfig();          
          }, 3000);       
        }, 3000);
         */

        this.configService.getConfig().subscribe(res => {
          this.informacion = res
          console.log(res);
          (document.getElementById('nombre') as HTMLInputElement).value = this.informacion.nombre,
          (document.getElementById('sigla') as HTMLInputElement).value = this.informacion.sigla,
          (document.getElementById('mision') as HTMLTextAreaElement).value = this.informacion.mision,
          (document.getElementById('vision') as HTMLTextAreaElement).value = this.informacion.vision,
          (document.getElementById('palabrasClave') as HTMLInputElement).value = this.informacion.palabrasClave,
          (document.getElementById('director') as HTMLInputElement).value = this.informacion.director,
          (document.getElementById('whatsapp') as HTMLInputElement).value = this.informacion.whatsapp,
          (document.getElementById('instagram') as HTMLInputElement).value = this.informacion.instagram,
          (document.getElementById('facebook') as HTMLInputElement).value = this.informacion.facebook,
          (document.getElementById('correo') as HTMLInputElement).value = this.informacion.correo
        })} catch (error) {
        console.error('Error getting config:', error);
      }
    }

  

  public submitConfig() {
    
    const configuracion: any = {
      nombre: (document.getElementById('nombre') as HTMLInputElement).value,
      sigla: (document.getElementById('sigla') as HTMLInputElement).value,
      mision: (document.getElementById('mision') as HTMLTextAreaElement).value,
      vision: (document.getElementById('vision') as HTMLTextAreaElement).value,
      palabrasClave: (document.getElementById('palabrasClave') as HTMLInputElement).value,
      director: (document.getElementById('director') as HTMLInputElement).value,
      whatsapp: (document.getElementById('whatsapp') as HTMLInputElement).value,
      instagram: (document.getElementById('instagram') as HTMLInputElement).value,
      facebook: (document.getElementById('facebook') as HTMLInputElement).value,
      correo: (document.getElementById('correo') as HTMLInputElement).value
    };

    console.log(configuracion);
    this.configService.putConfig(configuracion).subscribe({
      next: (res: any) => {
        this.displayMessage('success', 'Se ha agregado la nueva configuración con éxito.');
      },
      error: (err: any) => {
        this.displayMessage('error', 'Ha ocurrido un error inesperado. Intentelo de nuevo');
        console.log(err);
      }
    })
}


  /*guardarRegistro(): void {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const sigla = (document.getElementById('sigla') as HTMLInputElement).value;
    const mision = (document.getElementById('mision') as HTMLTextAreaElement).value;
    const vision = (document.getElementById('vision') as HTMLTextAreaElement).value;
    const palabrasClave = (document.getElementById('palabrasClave') as HTMLInputElement).value;
    const director = (document.getElementById('director') as HTMLInputElement).value;
    const whatsapp = (document.getElementById('whatsapp') as HTMLInputElement).value;
    const instagram = (document.getElementById('instagram') as HTMLInputElement).value;
    const facebook = (document.getElementById('facebook') as HTMLInputElement).value;
    const correo = (document.getElementById('correo') as HTMLInputElement).value;

    console.log('Registro guardado:', { nombre, sigla, mision, vision, palabrasClave, director, whatsapp, instagram, facebook, correo });
    localStorage.setItem('semillero', JSON.stringify({ nombre, sigla, mision, vision, palabrasClave, director, whatsapp, instagram, facebook, correo }));
  }*/

  private displayMessage(type: string, message: string): void {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      const messageElement = document.createElement('div');
      messageElement.className = type;
      messageElement.textContent = message;
      messageContainer.appendChild(messageElement);

      // Remove the message after 5 seconds
      setTimeout(() => {
        messageContainer.removeChild(messageElement);
      }, 5000);
    }
  }

  onFileSelected(event: any): void {
    // Lógica para manejar la selección de archivo
  }
}
