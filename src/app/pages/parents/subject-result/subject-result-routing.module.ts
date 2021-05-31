import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectResultPage } from './subject-result.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectResultPageRoutingModule {}
