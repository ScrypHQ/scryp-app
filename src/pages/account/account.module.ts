import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AccountHomeComponent } from './home/account-home.component';
import { RecoveryPhrase2Page } from './recovery-phrase2/recovery-phrase2-component';
import { RecoveryPhrasePage } from './recovery-phrase/recovery-phrase-component';

@NgModule({
  declarations: [
    AccountHomeComponent,
    RecoveryPhrasePage,
    RecoveryPhrase2Page
  ],
  entryComponents: [
    AccountHomeComponent,
    RecoveryPhrasePage,
    RecoveryPhrase2Page
  ],
  imports: [
    IonicModule.forRoot(AccountHomeComponent)
  ]
})
export class AccountModule {}

//TODO: Move providers, entry components, declarations to individual modules
