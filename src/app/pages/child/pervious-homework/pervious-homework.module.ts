import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerviousHomeworkPageRoutingModule } from './pervious-homework-routing.module';

import { PerviousHomeworkPage } from './pervious-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PerviousHomeworkPageRoutingModule
  ],
  declarations: [PerviousHomeworkPage]
})
export class PerviousHomeworkPageModule {}
