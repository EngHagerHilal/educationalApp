import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultOfSubjectsPage } from './result-of-subjects.page';

const routes: Routes = [
  {
    path: '',
    component: ResultOfSubjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultOfSubjectsPageRoutingModule {}
