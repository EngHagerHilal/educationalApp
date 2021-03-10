import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewHomeworkPage } from './new-homework.page';

const routes: Routes = [
  {
    path: '',
    component: NewHomeworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewHomeworkPageRoutingModule {}
