import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultOfSubjectsPageRoutingModule } from './result-of-subjects-routing.module';

import { ResultOfSubjectsPage } from './result-of-subjects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ResultOfSubjectsPageRoutingModule
  ],
  declarations: [ResultOfSubjectsPage]
})
export class ResultOfSubjectsPageModule {}
