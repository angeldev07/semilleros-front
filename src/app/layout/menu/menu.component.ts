import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { MenuitemComponent } from '../menuitem/menuitem.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuitemComponent],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index;">
          <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
          <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>

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
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      }
    ];
  }
}
