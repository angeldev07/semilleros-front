import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, type OnInit } from '@angular/core';
import { PostHomeService } from '../service/post-home.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <!-- redes sociales -->

    <main class="w-full ">
      <section class="post-header ">
        @if (!recentPost().loading) {
        <div class="grid  img-container">
          <div
            class="col-5 mr-1 h-full p-2 relative cursor-pointer"
            (click)="navigateTo(recentPost().data[0].uniqueTitleId)"
          >
            <span
              class="inline-block p-3 border-round bg-yellow-400 text-white absolute tag "
              >{{ recentPost().data[0].tag }}</span
            >
            <img
              src="{{ recentPost().data[0].imagenEncabezado }}"
              alt="{{ recentPost().titulo }}"
              class="w-full h-full"
            />
            <div class="desc px-3">
              <span class="inline-block py-2">{{
                recentPost().data[0].fechaCreacion | date
              }}</span>
              <h2 class="m-0 my-3 text-white">
                {{ recentPost().data[0].titulo }}
              </h2>
            </div>
          </div>
          <div class="col-7 grid img-r">
            <div
              class=" col-6  p-2 relative cursor-pointer"
              (click)="navigateTo(recentPost().data[1].uniqueTitleId)"
            >
              <span
                class="inline-block p-3 border-round bg-yellow-400 text-white absolute tag "
                >{{ recentPost().data[1].tag }}</span
              >
              <img
                src="{{ recentPost().data[1].imagenEncabezado }}"
                alt="{{ recentPost().titulo }}"
                class="w-full"
              />
              <div class="desc px-3">
                <span class="inline-block py-2">{{
                  recentPost().data[1].fechaCreacion | date
                }}</span>
                <h2 class="m-0 my-3 text-white">
                  {{ recentPost().data[1].titulo }}
                </h2>
              </div>
            </div>
            <div
              class=" col-6 p-2 relative cursor-pointer"
              (click)="navigateTo(recentPost().data[2].uniqueTitleId)"
            >
              <span
                class="inline-block p-3 border-round bg-yellow-400 text-white absolute tag "
                >{{ recentPost().data[2].tag }}</span
              >
              <img
                src="{{ recentPost().data[2].imagenEncabezado }}"
                alt="{{ recentPost().titulo }}"
                class="w-full"
              />
              <div class="desc px-3">
                <span class="inline-block py-2">{{
                  recentPost().data[2].fechaCreacion | date
                }}</span>
                <h2 class="m-0 my-3 text-white">
                  {{ recentPost().data[2].titulo }}
                </h2>
              </div>
            </div>
            <div
              class="col-12 p-2 relative cursor-pointer"
              (click)="navigateTo(recentPost().data[3].uniqueTitleId)"
            >
              <span
                class="inline-block p-3 border-round bg-yellow-400 text-white absolute tag "
                >{{ recentPost().data[3].tag }}</span
              >
              <img
                src="{{ recentPost().data[3].imagenEncabezado }}"
                alt="{{ recentPost().titulo }}"
                class="w-full"
              />
              <div class="desc px-3">
                <span class="inline-block py-2">{{
                  recentPost().data[3].fechaCreacion | date
                }}</span>
                <h2 class="m-0 my-3 text-white">
                  {{ recentPost().data[3].titulo }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        } @else{
        <div>
          <i class="pi pi-spin pi-spinner"></i>
        </div>
        }
      </section>
    </main>`,
  styles: `


  .post-header{
      width: 100%;
      max-width: 1200px;
      margin: auto;
  }

  .img-container{
      width: 100%;
      height: 500px;
  }


  .img-container  .img-r img{
      width: 100%;
      height: 250px;
      object-fit: cover;
  }

  .tag{
      top: 25px;
      left: 25px;
  }

  .desc{
      position: absolute;
      width: 98%;
      bottom: 5px;
      background-color: #f5f5dc34;
      color: #fff;
  }

    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  options: any = [
    {
      label: 'Eventos',
      routerLink: ['']
    },
    {
      label: 'Capacitaciones',
      routerLink: ['']
    },
    {
      label: 'Registro',
      routerLink: ['']
    },
    {
      label: 'Proyectos',
      routerLink: ['']
    },
    {
      label: 'PQR',
      routerLink: ['']
    }

  ]

  recentPost = signal<any>({
    loading: true,
    data: []
  })

  constructor(private postService: PostHomeService, private router: Router) { }

  ngOnInit() {

    this.postService.getPostRecientes().subscribe({
      next: (data) => {
        this.recentPost.set({
          loading: false,
          data
        })
      }
    })
  }

  navigateTo(id: string) {
    this.router.navigate(['publicaciones', id])
  }

}
