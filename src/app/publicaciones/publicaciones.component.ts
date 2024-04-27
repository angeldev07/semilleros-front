import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>publicaciones works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicacionesComponent implements OnInit {

  ngOnInit(): void { }

}
