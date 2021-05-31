import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildExamsPageRoutingModule } from './child-exams-routing.module';

import { ChildExamsPage } from './child-exams.page';

import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChildExamsPageRoutingModule
  ],
  declarations: [ChildExamsPage]
})
export class ChildExamsPageModule {}
