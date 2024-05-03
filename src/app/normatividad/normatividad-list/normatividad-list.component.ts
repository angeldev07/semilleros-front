import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normatividad-list',
  template: `
    <div>
      <h1>List of Normatividad</h1>
      <ul>
        <!-- Each normatividad item will be rendered here -->
        <li *ngFor="let normatividad of normatividades">
          {{ normatividad.name }}
        </li>
      </ul>
    </div>
  `,
  //styleUrls: ['./normatividad-list.component.css']
})
export class NormatividadListComponent implements OnInit {
  normatividades = [];

  constructor() { }

  ngOnInit(): void {
    // Load normatividades from a service
  }
}
