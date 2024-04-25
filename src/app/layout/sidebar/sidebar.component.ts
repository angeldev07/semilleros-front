import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MenuComponent
  ],
  template: `
  <app-menu></app-menu>
`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent { 
  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}
