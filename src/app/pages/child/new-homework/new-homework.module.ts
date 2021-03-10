import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewHomeworkPageRoutingModule } from './new-homework-routing.module';

import { NewHomeworkPage } from './new-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NewHomeworkPageRoutingModule
  ],
  declarations: [NewHomeworkPage]
})
export class NewHomeworkPageModule {}
