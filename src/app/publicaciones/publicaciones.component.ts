import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BlogAdminListComponent } from './components/blog-admin-list/blog-admin-list.component';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule, 
    BlogAdminListComponent
  ],
  template: `

    <section class="card flex align-items-center justify-content-between">
      <h2 class="m-0">Publicaciones</h2>
      <p-button label="Nueva" icon="pi pi-plus" iconPos="right" (onClick)="navigateToNewPost()" > </p-button>
    </section>

    <section>

      <div class="">
        <app-blog-admin-list  />
      </div>

    </section>
  
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicacionesComponent implements OnInit {



  constructor(private router: Router, private postService: PostService){ }

  ngOnInit(): void { 

  }

  navigateToNewPost(){
    this.router.navigate(['admin/publicaciones/nuevo-publicacion'])
  }

}
