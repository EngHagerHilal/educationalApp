import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildExamsPage } from './child-exams.page';

const routes: Routes = [
  {
    path: '',
    component: ChildExamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildExamsPageRoutingModule {}
