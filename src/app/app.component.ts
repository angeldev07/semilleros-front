import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { CalendarComponent } from './calendar/calendar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,  CalendarComponent],
  template: `
    <router-outlet />
    <app-calendar></app-calendar>
  `,
  styles: `
  
  `
})
export class AppComponent implements OnInit{
  
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  
}
