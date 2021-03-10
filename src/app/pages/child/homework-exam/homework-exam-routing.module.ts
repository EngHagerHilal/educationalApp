import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkExamPage } from './homework-exam.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworkExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeworkExamPageRoutingModule {}
