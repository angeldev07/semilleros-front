import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { MenuitemComponent } from '../menuitem/menuitem.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuitemComponent, ButtonModule],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index;">
          <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
          <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
      
      <li class="mt-8 ">
        <p-button label="Salir" icon="pi pi-power-off" iconPos="right" [styleClass]="'w-full'">
        </p-button>
      </li>

    </ul>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Navegación',
        items: [
          { label: 'Configuracion', icon: 'pi pi-fw pi-cog', routerLink: ['./configuracion'] },
          { label: 'Semilleros', icon: 'pi pi-fw pi-briefcase', routerLink: ['./semilleros'] },
          { label: 'Eventos', icon: 'pi pi-fw pi-calendar', routerLink: ['./eventos'] },
          { label: 'Publicaciones', icon: 'pi pi-fw pi-map', routerLink: ['./publicaciones'] },
          { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['./usuarios'] },
          { label: 'Multimedia', icon: 'pi pi-fw pi-camera', routerLink: ['./multimedia'] },
          { label: 'Capacitaciones', icon: 'pi pi-fw pi-flag-fill', routerLink: ['./capacitaciones'] },
          { label: 'PQR', icon: 'pi pi-fw pi-qrcode', routerLink: ['./pqr'] },
          { label: 'Reportes', icon: 'pi pi-fw pi-file', routerLink: ['./reportes'] },
        ],
      }
    ];
  }
}
