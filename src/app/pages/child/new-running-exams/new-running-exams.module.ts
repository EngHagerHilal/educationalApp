import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRunningExamsPageRoutingModule } from './new-running-exams-routing.module';

import { NewRunningExamsPage } from './new-running-exams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NewRunningExamsPageRoutingModule
  ],
  declarations: [NewRunningExamsPage]
})
export class NewRunningExamsPageModule {}
