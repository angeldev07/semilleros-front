import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormatividadListComponent } from './normatividad-list/normatividad-list.component';
import { NormatividadDetailComponent } from './normatividad-detail/normatividad-detail.component';
import { NormatividadAddEditComponent } from './normatividad-add-edit/normatividad-add-edit.component';

const routes: Routes = [
  { path: '', component: NormatividadListComponent },
  { path: 'detail/:id', component: NormatividadDetailComponent },
  { path: 'add', component: NormatividadAddEditComponent },
  { path: 'edit/:id', component: NormatividadAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormatividadRoutingModule {}
