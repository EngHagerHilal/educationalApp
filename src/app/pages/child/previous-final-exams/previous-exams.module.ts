import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousExamsPageRoutingModule } from './previous-exams-routing.module';

import { PreviousExamsPage } from './previous-exams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PreviousExamsPageRoutingModule
  ],
  declarations: [PreviousExamsPage]
})
export class PreviousExamsPageModule {}
