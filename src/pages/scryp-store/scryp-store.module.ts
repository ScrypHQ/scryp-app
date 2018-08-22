import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScrypStorePage } from './scryp-store';

@NgModule({
  declarations: [
    ScrypStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ScrypStorePage),
  ],
})
export class ScrypStorePageModule {}
