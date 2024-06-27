import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SemillerosComponent } from './semilleros.component';
import { SEMILLEROS_ROUTES } from './semilleros.routes';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [SemillerosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SEMILLEROS_ROUTES),
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule
  ]
})
export class SemillerosModule { }
