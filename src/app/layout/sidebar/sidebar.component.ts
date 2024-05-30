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
      .layout-menu {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      .layout-menu li {
        margin-bottom: 1em;
      }

      .layout-menu li a {
        text-decoration: none;
      }

      .layout-menu li a:hover {
        text-decoration: none;
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent { 
  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}
