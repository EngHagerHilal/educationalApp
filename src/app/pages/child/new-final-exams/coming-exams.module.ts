import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComingExamsPageRoutingModule } from './coming-exams-routing.module';

import { ComingExamsPage } from './coming-exams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComingExamsPageRoutingModule
  ],
  declarations: [ComingExamsPage]
})
export class ComingExamsPageModule {}
