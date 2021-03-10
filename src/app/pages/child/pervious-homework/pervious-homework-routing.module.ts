import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerviousHomeworkPage } from './pervious-homework.page';

const routes: Routes = [
  {
    path: '',
    component: PerviousHomeworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerviousHomeworkPageRoutingModule {}
