import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerviousRunningExamsPageRoutingModule } from './pervious-running-exams-routing.module';

import { PerviousRunningExamsPage } from './pervious-running-exams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PerviousRunningExamsPageRoutingModule
  ],
  declarations: [PerviousRunningExamsPage]
})
export class PerviousRunningExamsPageModule {}
