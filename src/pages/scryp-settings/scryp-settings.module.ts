import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScrypSettingsPage } from './scryp-settings';

@NgModule({
  declarations: [
    ScrypSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScrypSettingsPage),
  ],
})
export class ScrypSettingsPageModule {}
