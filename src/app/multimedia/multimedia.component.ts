import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>multimedia works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaComponent implements OnInit {

  ngOnInit(): void { }

}
