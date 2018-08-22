import { Injectable } from "../../node_modules/@angular/core";
import { Storage } from '@ionic/storage';
import { Account } from "../models/account.model";

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {}

  async getAccount(): Promise<Account> {
    return await this.storage.get('account');
  }

  async setAccount(account: Account) {
    await this.storage.set('account', account);
  }
}