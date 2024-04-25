import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  template: `
  
  <div class="layout-topbar">
    <a class="layout-topbar-logo" routerLink="">
      <img src="assets/layout/images/{{layoutService.config().colorScheme === 'light' ? 'logo-dark' : 'logo-white'}}.svg" alt="logo">
      <p>Semilleros <span class="text-red-500">UFPS</span> </p>
    </a>

    <button #menubutton class="p-link layout-menu-button layout-topbar-button" (click)="layoutService.onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button #topbarmenubutton class="p-link layout-topbar-menu-button layout-topbar-button" (click)="layoutService.showProfileSidebar()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div #topbarmenu class="layout-topbar-menu" [ngClass]="{'layout-topbar-menu-mobile-active': layoutService.state.profileSidebarVisible}">
      <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Calendar</span>
      </button>
      <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
      </button>
      <button class="p-link layout-topbar-button" [routerLink]="'/documentation'">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
      </button>
    </div>
  </div>
  
  
  `,
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent { 

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) { }
}
