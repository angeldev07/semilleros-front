import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostHomeService } from '../service/post-home.service';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  @if (post()) {
    <div class="container">
    <main class="cont ">

      <div class="grid">
        
      <!-- contenido va aca -->
        <section class="col-9">
          <div class="w-full h-20rem mb-4">
            <img src="{{post().imagenEncabezado}}" alt="{{post().titulo}}" width="100%" height="100%" class="img">
          </div>

          <div>
           @for (contenido of getContent(); track $index) {
            <div [innerHTML]="contenido.title + contenido.content">

            </div>
           }
          </div>

        </section>

        <section class="col-3">
            <span>Secciones del articulo</span>
            <div>
              <ul class="list-none p-0">
                @for ( encabezado of post().encabezados; track $index) {
                  <li class="mb-3">
                    <a [href]="getAncle(encabezado)">
                      {{encabezado}}
                    </a>
                  </li>
                }
              </ul>
            </div>
        </section>

      </div>
    
    </main>

    </div>
  }@else {
    <h1>Cargando informacion...</h1>
  }
  
  `,
  styles: `
    .cont {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    color-background: rgb(2,2,2);
  }
  .img {
    object-fit: cover;
    object-position: center;
  }
  .titulo {
    font-size: 2rem;
    font-weight: bold;
  }
  .content-container p{
    margin-bottom: 2rem !important;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostViewComponent implements OnInit {

  post = signal<any>(undefined)

  constructor(private postService: PostHomeService, private route: ActivatedRoute) { }

  ngOnInit(): void { 

    this.postService.searchByTitle(this.route.snapshot.params['id']).subscribe({
      next: (res: any) =>{
        this.post.set(res)
      }
    })
  }

  getAncle(encabezado: string){
    // retornoar la rutra actual + # + encabeza
    return  this.route.snapshot.url.join('/') + '#' + encabezado
  }

  getContent(){
    return this.post().encabezados.map((encabezado: string, index:number) => {
      return {
        title: `<h1 class="my-3">${encabezado}</h1>`,
        content: `<div class="content-container"> ${this.post().contenidos[index].replaceAll("<p><br></p>", '')} </div>`
      }
    })
  }



}
