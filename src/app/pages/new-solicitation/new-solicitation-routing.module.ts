import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSolicitationPage } from './new-solicitation.page';

const routes: Routes = [
  {
    path: '',
    component: NewSolicitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSolicitationPageRoutingModule {}
