import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SemillerosService } from './semilleros.service';

@Component({
  selector: 'app-semilleros',
  templateUrl: './semilleros.component.html',
  styleUrls: ['./semilleros.component.css'],
  providers: [MessageService]
})
export class SemillerosComponent implements OnInit {
  semilleroForm!: FormGroup;
  semilleros: any[] = [];
  selectedSemillero: any;
  displayDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private semillerosService: SemillerosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.semilleroForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.getAllSemilleros();
  }

  onSubmit(): void {
    if (this.semilleroForm.valid) {
      this.semillerosService.crearSemillero(this.semilleroForm.value).subscribe({
        next: response => {
          this.semilleros.push(response);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Semillero creado con éxito'});
          this.semilleroForm.reset();
          this.displayDialog = false;
        },
        error: error => console.error('Error al crear semillero', error)
      });
    }
  }

  getAllSemilleros(): void {
    this.semillerosService.getAllSemilleros().subscribe({
      next: semilleros => this.semilleros = semilleros,
      error: error => console.error('Error al obtener semilleros', error)
    });
  }

  editSemillero(semillero: any): void {
    this.selectedSemillero = { ...semillero };
    this.semilleroForm.patchValue(this.selectedSemillero);
    this.displayDialog = true;
  }

  deleteSemillero(id: number): void {
    this.semillerosService.deleteSemillero(id).subscribe({
      next: response => {
        this.semilleros = this.semilleros.filter(s => s.id !== id);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Semillero eliminado con éxito'});
      },
      error: error => console.error('Error al eliminar semillero', error)
    });
  }

  saveSemillero(): void {
    if (this.selectedSemillero) {
      this.semillerosService.updateSemillero(this.selectedSemillero.id, this.semilleroForm.value).subscribe({
        next: response => {
          const index = this.semilleros.findIndex(s => s.id === this.selectedSemillero.id);
          this.semilleros[index] = response;
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Semillero actualizado con éxito'});
          this.displayDialog = false;
        },
        error: error => console.error('Error al actualizar semillero', error)
      });
    } else {
      this.onSubmit();
    }
  }

  showDialog(): void {
    this.displayDialog = true;
  }
}