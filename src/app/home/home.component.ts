import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PostHomeService } from './service/post-home.service';
import { PqrComponent } from '../pqr/pqr.component';
import { PqrsListComponent } from '../pqr/components/pqr-list/pqr-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  options: any = [
    {
      label: 'Semillero',
      routerLink: ['semillero']
    },
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
      routerLink: ['pqr']
    },
    {
      label: 'Normatividad',
      routerLink: ['']
    },
    {
      label: 'Redes Sociales ',
      routerLink: ['']
    },
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
