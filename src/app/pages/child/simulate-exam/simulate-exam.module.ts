import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulateExamPageRoutingModule } from './simulate-exam-routing.module';

import { SimulateExamPage } from './simulate-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SimulateExamPageRoutingModule
  ],
  declarations: [SimulateExamPage]
})
export class SimulateExamPageModule {}
