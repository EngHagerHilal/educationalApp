import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRunningExamsPage } from './new-running-exams.page';

const routes: Routes = [
  {
    path: '',
    component: NewRunningExamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRunningExamsPageRoutingModule {}
