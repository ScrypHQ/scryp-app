import { Component } from '@angular/core';
import { NavController, LoadingController, ViewController } from 'ionic-angular';
import { RecoveryPhrasePage } from '../recovery-phrase/recovery-phrase-component';
import { RecoveryPhrase2Page } from '../recovery-phrase2/recovery-phrase2-component';

@Component({
  selector: 'account-home',
  templateUrl: 'account-home.html'
})
export class AccountHomeComponent {

  constructor(
    private viewCtrl: ViewController,
    private navController: NavController,
  ) {
  }

  createAccount() {
        this.navController.push(RecoveryPhrasePage);
  }

  restoreAccount() {
    this.navController.push(RecoveryPhrase2Page);
  }
}
