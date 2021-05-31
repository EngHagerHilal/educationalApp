import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectResultPageRoutingModule } from './subject-result-routing.module';

import { SubjectResultPage } from './subject-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectResultPageRoutingModule
  ],
  declarations: []
})
export class SubjectResultPageModule {}
