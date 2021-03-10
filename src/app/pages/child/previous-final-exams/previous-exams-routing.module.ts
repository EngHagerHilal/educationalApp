import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousExamsPage } from './previous-exams.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousExamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousExamsPageRoutingModule {}
