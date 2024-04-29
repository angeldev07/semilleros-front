import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PqrsListComponent } from './components/pqr-list/pqr-list.component';
import { AddPqrsComponent } from './components/add-pqr/add-pqr.component';
import { PQR } from './api/pqr';
import { PqrsService } from './services/pqr.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pqr',
  standalone: true,
  imports: [PqrsListComponent, AddPqrsComponent],
  template: `
  <app-pqrs-list
      [pqrs]="pqrsLista"
  ></app-pqrs-list>
  `,
  styles: ``,
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqrComponent implements OnInit{
  pqrsList = signal<PQR[]>([]);

  constructor(
    private pqrsService: PqrsService,
    private message: MessageService
  ) {
  }


  ngOnInit(): void {
    this.getPQRSList();
  }

  get pqrsLista(){
    return this.pqrsList();
  }

  getPQRSList(){
    this.pqrsService.getPqrs().subscribe({
      next: (res: any) => {
        this.pqrsList.set(res);
      },
      error: (err: any) => {
        console.log(err)
      }

    })
  }
}
