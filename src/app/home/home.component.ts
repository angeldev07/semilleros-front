import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PostHomeService } from './service/post-home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
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
    },
    {
      label: 'Normatividad',
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
