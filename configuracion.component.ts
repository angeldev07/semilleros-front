import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h2>Registro de Semillero</h2>
      <form (submit)="guardarRegistro()">
        <div class="form-section">
          <div class="section-title">Información General</div>
          <div class="form-group">
            <label for="logo">Logo o Imagen:</label>
            <input type="file" id="logo" accept="image/*" (change)="onFileSelected($event)" class="form-control">
          </div>
          <div class="form-group">
            <label for="nombre">Nombre del Semillero:</label>
            <input type="text" id="nombre" #nombre required class="form-control">
          </div>
          <div class="form-group">
            <label for="sigla">Sigla del Semillero:</label>
            <input type="text" id="sigla" #sigla required class="form-control">
          </div>
        </div>

        <div class="form-section">
          <div class="section-title">Descripción</div>
          <div class="form-group">
            <label for="mision">Misión:</label>
            <textarea id="mision" #mision required class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="vision">Visión:</label>
            <textarea id="vision" #vision required class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="palabrasClave">Palabras Clave:</label>
            <input type="text" id="palabrasClave" #palabrasClave required class="form-control">
          </div>
        </div>

        <div class="form-section">
          <div class="section-title">Contacto</div>
          <div class="form-group">
            <label for="director">Director del Semillero:</label>
            <input type="text" id="director" #director required class="form-control">
          </div>
          <div class="form-group">
            <label for="whatsapp">Whatsapp:</label>
            <input type="text" id="whatsapp" #whatsapp required class="form-control">
          </div>
          <div class="form-group">
            <label for="instagram">Instagram:</label>
            <input type="text" id="instagram" #instagram required class="form-control">
          </div>
          <div class="form-group">
            <label for="facebook">Facebook:</label>
            <input type="text" id="facebook" #facebook required class="form-control">
          </div>
          <div class="form-group">
            <label for="correo">Correo Electrónico:</label>
            <input type="email" id="correo" #correo required class="form-control">
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
    </div>
  `,
  styles: [`
    .form-section {
      margin-bottom: 20px;
    }
    .section-title {
      background-color: #f0f0f0;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }
    .btn {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .btn:hover {
      background-color: #0056b3;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfiguracionComponent {
  guardarRegistro(): void {
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
  }

  onFileSelected(event: any): void {
    // Lógica para manejar la selección de archivo
  }
}
