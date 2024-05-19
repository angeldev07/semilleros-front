import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostHomeService } from './service/post-home.service';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface NavOption {
  label: string;
  routerLink: string[];
  children?: NavOption[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  options: NavOption[] = [
    {
      label: 'Eventos',
      routerLink: ['']
    },
    {
      label: 'Capacitaciones',
      routerLink: ['']
    },
    {
      label: 'Proyectos',
      routerLink: [''],
      children: [
        {
          label: 'Registro',
          routerLink: ['']
        },
        {
          label: 'PQR',
          routerLink: ['pqr']
        },
        {
          label: 'Redes Sociales',
          routerLink: ['']
        }
      ]
    },
    {
      label: 'Normatividad',
      routerLink: ['']
    }
  ];

  recentPost = {
    loading: true,
    data: [] as Post[]
  };

  constructor(private postService: PostHomeService, private router: Router) {}

  ngOnInit() {
    this.postService.getPostRecientes().subscribe({
      next: (data: Post[]) => {
        this.recentPost = {
          loading: false,
          data
        };
      },
      error: (err) => {
        console.error(err);
        this.recentPost.loading = false;
      }
    });
  }

  navigateTo(id: string) {
    this.router.navigate(['publicaciones', id]);
  }
}
