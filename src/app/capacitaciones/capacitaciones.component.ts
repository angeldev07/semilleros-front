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
            <label for="logo">Logo (url):</label>
            <input type="url" id="logo" #mision required class="form-control">
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
            <label for="contenido">Contenido de la Capacitacion (url):</label>
            <input type="url" id="contenido" #mision required class="form-control">
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
    
      const formData = new FormData();

      formData.append('titulo',(document.getElementById('titulo') as HTMLInputElement).value);
      formData.append('fechai', (document.getElementById('fechai') as HTMLInputElement).value);
      formData.append('fechaf', (document.getElementById('fechaf') as HTMLInputElement).value);

      formData.append('modalidad', (document.getElementById('modalidad') as HTMLInputElement).value);
      formData.append('ubicacion',(document.getElementById('ubicacion') as HTMLInputElement).value);
      formData.append('costo', (document.getElementById('costo') as HTMLInputElement).value);

      formData.append('responsable', (document.getElementById('responsable') as HTMLInputElement).value)
      formData.append('cargo', (document.getElementById('cargo') as HTMLInputElement).value);
      formData.append('correo', (document.getElementById('correo') as HTMLInputElement).value);

      formData.append('telefono', (document.getElementById('telefono') as HTMLInputElement).value);
      formData.append('cupos',(document.getElementById('cupos') as HTMLInputElement).value);

      formData.append('objetivos', (document.getElementById('objetivos') as HTMLInputElement).value);
      formData.append('descripcion', (document.getElementById('descripcion') as HTMLInputElement).value);

      formData.append('objetivos', (document.getElementById('objetivos') as HTMLInputElement).value);
      formData.append('descripcion', (document.getElementById('descripcion') as HTMLInputElement).value);


      formData.append('logo', (document.getElementById('logo') as HTMLInputElement).value);
      formData.append('contenido', (document.getElementById('contenido') as HTMLInputElement).value);

      this.http.post('http://localhost:8080/guardarCapacitaciones', formData)
        .subscribe(response => {
          console.log('Datos cargados', response);
        }, error => {
          console.error('Error al cargar los Datos', error);
        });
    
  }

}
