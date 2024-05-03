import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-normatividad-detail',
  template: `
    <div>
      <h1>Normatividad Details</h1>
      <p>{{ normatividad.name }}</p>
      <p>{{ normatividad.description }}</p>
    </div>
  `,
  //styleUrls: ['./normatividad-detail.component.css']
})
export class NormatividadDetailComponent implements OnInit {
  normatividad: any = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Fetch the normatividad details using the id from params
    });
  }
}
