import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingExamsPage } from './coming-exams.page';

const routes: Routes = [
  {
    path: '',
    component: ComingExamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComingExamsPageRoutingModule {}
