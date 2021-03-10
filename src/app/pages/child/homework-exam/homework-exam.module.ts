import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { HomeworkExamPageRoutingModule } from './homework-exam-routing.module';

import { HomeworkExamPage } from './homework-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HomeworkExamPageRoutingModule
  ],
  declarations: [HomeworkExamPage]
})
export class HomeworkExamPageModule {}
