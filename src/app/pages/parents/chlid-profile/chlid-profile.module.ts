import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChlidProfilePageRoutingModule } from './chlid-profile-routing.module';

import { ChlidProfilePage } from './chlid-profile.page';

import { SubjectResultPage } from './../subject-result/subject-result.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    TranslateModule,
    ChlidProfilePageRoutingModule
  ],
  declarations: [ChlidProfilePage, SubjectResultPage]
})
export class ChlidProfilePageModule {}
