import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerviousRunningExamsPage } from './pervious-running-exams.page';

const routes: Routes = [
  {
    path: '',
    component: PerviousRunningExamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerviousRunningExamsPageRoutingModule {}
