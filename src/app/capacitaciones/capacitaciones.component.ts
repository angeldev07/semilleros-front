import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="search">
      <form action="#">
        <button>
          <i class="fa fa-search" style="font-size: 18px;"> </i>
        </button>
        <input type="text" placeholder="Search..." />
      </form>
    </div>

    <br />

    <div
      class="card-header"
      style="background-color: rgb(247, 246, 250);height:50px;"
    >
      ,
      <h1
        style="font-family: 'Dyuthi';font-size: 40px; color: rgb(43, 32, 96);top: -30px; position:relative;"
      >
        Gestionar Capacitación
      </h1>
    </div>

    <br />

    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th>
                <div>
                  <label style="text-align:left;">Nombre* </label>
                </div>

                <div>
                  <input
                    type="text"
                    name="fechaix"
                    id="fechaix"
                    value=""
                    style="height:40px; width: 1250px; vertical-align:10px"
                  />
                </div>
              </th>
            </tr>

            <tr>
              <th>
                <div>
                  <label style="text-align:left;">Descripción General* </label>
                </div>

                <div>
                  <textarea
                    name="fechaix"
                    id="fechaix"
                    value=""
                    style="height:150px; width: 1250px; vertical-align:10px"
                  >
                  </textarea>
                </div>
              </th>
            </tr>
          </thead>
        </table>

        <table class="table table-borderless">
          <thead>
            <tr>
              <th>
                <div>
                  <label style="text-align:left;"
                    >Contenido de la Capacitación*</label
                  >
                </div>

                <div
                  style="height:40px; background-color: rgb(0, 124, 127); width: 360px;"
                >
                  <div
                    style="top: 5px; position:relative; color: rgb(255, 255, 255);"
                  >
                    <input
                      name="tablah"
                      id="tablah"
                      style="display: none;"
                      value=""
                    />
                    <input id="fileInput1" type="file" accept="" />
                  </div>
                </div>
              </th>

              <th></th>

              <th>
                <div>
                  <label style="text-align:left;"
                    >Formato de Certificado*</label
                  >
                </div>

                <div
                  style="height:40px; background-color: rgb(0, 124, 127); width: 360px;"
                >
                  <div
                    style="top: 5px; position:relative; color: rgb(255, 255, 255);"
                  >
                    <input
                      name="tablah"
                      id="tablah"
                      style="display: none;"
                      value=""
                    />
                    <input id="fileInput2" type="file" accept="" />
                  </div>
                </div>
              </th>

              <th></th>
            </tr>

            <tr>
              <th>
                <div>
                  <label style="text-align:left;">Cuestionario*</label>
                </div>

                <div
                  style="height:40px; background-color: rgb(0, 124, 127); width: 360px;"
                >
                  <div
                    style="top: 5px; position:relative; color: rgb(255, 255, 255);"
                  >
                    <input
                      name="tablah"
                      id="tablah"
                      style="display: none;"
                      value=""
                    />
                    <input id="fileInput3" type="file" accept="" />
                  </div>
                </div>
              </th>

              <th></th>

              <th>
                <div></div>
              </th>

              <th></th>

              <th>
                <div></div>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <table class="table table-borderless">
          <thead>
            <tr>
              <th>
                <div>
                  <button
                    type="button"
                    value="pg-calendarioprevios/listarPrevios.jsp?mens=0"
                    class="btn"
                    style="height: 45px; width: 100px; background:rgb(28, 124, 152)"
                  >
                    Publicar
                  </button>

                  <button
                    type="button"
                    value="pg-calendarioprevios/listarSemestre.jsp?mens=0"
                    class="btn"
                    style="height: 45px; width: 100px; background:rgb(28, 124, 152)"
                  >
                    Borrar
                  </button>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    <div id="boxListar"></div>

    <div id="boxGuardar"></div>

    <div class="card-footer"></div>

    <input name="tipo" id="tipo" style="display: none;" value="1" />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapacitacionesComponent implements OnInit {
  ngOnInit(): void {}
}
