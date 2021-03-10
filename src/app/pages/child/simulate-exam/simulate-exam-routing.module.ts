import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulateExamPage } from './simulate-exam.page';

const routes: Routes = [
  {
    path: '',
    component: SimulateExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulateExamPageRoutingModule {}
