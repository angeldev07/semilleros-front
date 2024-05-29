import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h2>Crear Capacitación</h2>
      <form (submit)="guardarCapacitacion()">
        		
		
		<table class="table table-borderless">
          <thead>
            <tr>
              <th>
                <div class="form-group">
            <label for="titulo">Titulo del Curso:</label>
            <input type="text" id="titulo" #nombre required class="form-control" >
          </div>
              </th>

              <th>
			                <div class="form-group">
            <label for="fechai">Fecha Inicial:</label>
            <input type="date" id="fechai" #nombre required class="form-control" >
          </div>
			  </th>


		  
		  <th>
			                <div class="form-group">
            <label for="fechaf">Fecha Final:</label>
            <input type="date" id="fechaf" #nombre required class="form-control" >
          </div>
			  </th>
		  
		  
		  
		  
		  <th>
			
			  </th>
		  
		 

             
            </tr>

            
			
			<tr>
              <th>
                <div class="form-group">
            <label for="modalidad">Modalidad:</label>
            <input type="text" id="modalidad" #nombre required class="form-control" >
          </div>
              </th>

              <th>

              <div class="form-group">
            <label for="ubicacion">Ubicacion del Curso:</label>
            <input type="text" id="ubicacion" #nombre required class="form-control" >
          </div>
		  
		  </th>

              <th>
		  
		  <div class="form-group">
            <label for="costo">Costo Capacitacion:</label>
            <input type="text" id="costo" #nombre required class="form-control" >
          </div>
		  
		  </th>

               <th>
                <div></div>
              </th>
            </tr>
             
            
			
			<tr>
              <th>
                <div class="form-group">
            <label for="responsable">Responsable del Curso:</label>
            <input type="text" id="responsable" #nombre required class="form-control" >
          </div>
              </th>

              <th>

              <div class="form-group">
            <label for="cargo">Cargo:</label>
            <input type="text" id="cargo" #nombre required class="form-control" >
          </div>
		  
		  </th>

              <th>
		  
		  <div class="form-group">
            <label for="correo">Correo Electronico:</label>
            <input type="text" id="correo" #nombre required class="form-control" >
          </div>
		  
		  </th>

              <th>
                <div></div>
              </th>
            </tr>
			
			
			
			
			<tr>
              <th>
                <div class="form-group">
            <label for="telefono">Telefono:</label>
            <input type="text" id="telefono" #nombre required class="form-control" >
          </div>
              </th>

              <th>

              <div class="form-group">
            <label for="cupos">N° Cupos:</label>
            <input type="text" id="cupos" #nombre required class="form-control" >
          </div>
		  
		  </th>


			<th>
      <div class="form-group">
            <label for="logo">Logo:</label>
            <input type="file" id="logo" accept="image/*" (change)="onFileSelected($event, 'image')" class="form-control">
          </div>
              </th>
              

              <th>
                <div></div>
              </th>
            </tr>
			
			
			
			
          </thead>
          <tbody></tbody>
        </table>
		
		
		 <div class="form-group">
            <label for="objetivos">Objetivos:</label>
            <textarea id="objetivos" #mision required class="form-control" ></textarea>
          </div>
		  
		 <div class="form-group">
            <label for="mision">Descripción General:</label>
            <textarea id="descripcion" #mision required class="form-control" ></textarea>
          </div>
		  
		  <div class="form-group">
            <label for="contenido">Contenido de la Capacitacion:</label>
            <input type="file" id="contenido" accept="application/pdf" (change)="onFileSelected($event, 'pdf')" class="form-control">
          </div>
		  
		  
				

               <button type="submit" class="btn btn-primary">Publicar</button>
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
export class CapacitacionesComponent {
  selectedFiles: { pdf: File | null, image: File | null } = { pdf: null, image: null };

  constructor(private http: HttpClient) {}

  informacion : any = {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.informacion = JSON.parse(localStorage.getItem('semillero') || '{}');

  }


  guardarCapacitacion(): void {
    const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    const fechai = (document.getElementById('fechai') as HTMLInputElement).value;
    const fechaf = (document.getElementById('fechaf') as HTMLInputElement).value;

    const modalidad = (document.getElementById('modalidad') as HTMLInputElement).value;
    const ubicacion = (document.getElementById('ubicacion') as HTMLInputElement).value;
    const costo = (document.getElementById('costo') as HTMLInputElement).value;

    const responsable = (document.getElementById('responsable') as HTMLInputElement).value;
    const cargo = (document.getElementById('cargo') as HTMLInputElement).value;
    const correo = (document.getElementById('correo') as HTMLInputElement).value;

    const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
    const cupos = (document.getElementById('cupos') as HTMLInputElement).value;

    const objetivos = (document.getElementById('objetivos') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;

    console.log('Registro guardado:', { titulo, fechai, fechaf, modalidad, ubicacion, costo, responsable, cargo, correo, telefono, cupos, objetivos, descripcion });
    localStorage.setItem('semillero', JSON.stringify({ titulo, fechai, fechaf, modalidad, ubicacion, costo, responsable, cargo, correo, telefono, cupos, objetivos, descripcion }));
  }



  onFileSelected(event: Event, fileType: 'pdf' | 'image') {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles[fileType] = target.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFiles.pdf && this.selectedFiles.image) {
      const formData = new FormData();
      formData.append('pdf', this.selectedFiles.pdf);
      formData.append('image', this.selectedFiles.image);

      this.http.post('http://localhost:8080/upload', formData)
        .subscribe(response => {
          console.log('Archivos cargados', response);
        }, error => {
          console.error('Error al cargar archivos', error);
        });
    } else {
      alert('Por favor seleccione ambos archivos');
    }
  }

}
