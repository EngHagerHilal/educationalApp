import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChlidProfilePageRoutingModule } from './chlid-profile-routing.module';

import { ChlidProfilePage } from './chlid-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChlidProfilePageRoutingModule
  ],
  declarations: [ChlidProfilePage]
})
export class ChlidProfilePageModule {}
