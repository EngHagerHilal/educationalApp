import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChlidProfilePage } from './chlid-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ChlidProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChlidProfilePageRoutingModule {}
