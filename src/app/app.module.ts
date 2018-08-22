import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import {ScrypWalletPage} from "../pages/scryp-wallet/scryp-wallet";
import {ScrypMenuPage} from "../pages/scryp-menu/scryp-menu";
import {ScrypSettingsPage} from "../pages/scryp-settings/scryp-settings";
import {ScrypStorePage} from "../pages/scryp-store/scryp-store";
import {ScrypVolunteerPage} from "../pages/scryp-volunteer/scryp-volunteer";
import {ScrypVolunteerLocationPage} from "../pages/scryp-volunteer-location/scryp-volunteer-location";
import {ScrypOffersPage} from "../pages/scryp-offers/scryp-offers";
import {ScrypFriendsPage} from "../pages/scryp-friends/scryp-friends";
import { Geolocation } from '@ionic-native/geolocation';
import { VolunteerWorkService } from '../service/volunteer-work.service';
import { OffersService } from '../service/offers.service';
import { Web3Service } from '../service/web3.service';
import { LoginPage } from '../pages/login/login';
import { StorageService } from '../service/storage.service';
import { RecoverPage } from '../pages/recover/recover';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ScrypWalletPage,
    ScrypMenuPage,
    ScrypSettingsPage,
    ScrypStorePage,
    ScrypOffersPage,
    ScrypVolunteerPage,
    ScrypVolunteerLocationPage,
    ScrypFriendsPage,
    RecoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ClipboardModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ScrypWalletPage,
    ScrypMenuPage,
    ScrypSettingsPage,
    ScrypStorePage,
    ScrypOffersPage,
    ScrypVolunteerPage,
    ScrypVolunteerLocationPage,
    ScrypFriendsPage, 
    RecoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    VolunteerWorkService,
    OffersService,
    Web3Service,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
