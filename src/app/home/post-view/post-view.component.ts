// post-view.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostHomeService } from '../service/post-home.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewComponent implements OnInit {
  post: any; // Consider defining a more specific type

  constructor(private postService: PostHomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.postService.searchByTitle(id).subscribe({
      next: (res: any) => this.post = res,
      error: () => this.post = null
    });
  }

  getAnchor(encabezado: string): string {
    return this.route.snapshot.url.join('/') + '#' + encabezado;
  }

  getContent(): Array<{ title: string; content: string }> {
    return this.post.encabezados.map((encabezado: string, index: number) => {
      return {
        title: `<h1 class="my-3">${encabezado}</h1>`,
        content: `<div class="content-container">${this.post.contenidos[index].replace(/<p><br><\/p>/g, '')}</div>`
      };
    });
  }
}
