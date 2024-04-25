import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="layout-footer">
        <img src="assets/layout/images/{{layoutService.config().colorScheme === 'light' ? 'logo-dark' : 'logo-white'}}.svg" alt="Logo" height="20" class="mr-2"/>
        <span class="font-medium ml-2">Universidad Franciso de Paula Santander</span>
    </div>  
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  constructor(public layoutService: LayoutService) { }

}
