import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScrypWalletPage } from './scryp-wallet';

@NgModule({
  declarations: [
    ScrypWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(ScrypWalletPage),
  ]
})
export class ScrypWalletPageModule {}
