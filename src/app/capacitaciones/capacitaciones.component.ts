import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>capacitaciones works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapacitacionesComponent implements OnInit {

  ngOnInit(): void { }

}
