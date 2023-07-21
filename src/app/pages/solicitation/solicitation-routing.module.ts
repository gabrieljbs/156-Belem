import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitationPage } from './solicitation.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitationPageRoutingModule {}
