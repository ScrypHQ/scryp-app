import { Injectable } from "../../node_modules/@angular/core";
import Web3 from 'web3';
import bip39 from 'bip39';
import hdkey from 'hdkey';
import * as ethUtil from 'ethereumjs-util';
import { Account } from "../models/account.model";
import { StorageService } from "./storage.service";

@Injectable()
export class Web3Service{
  web3: any;

  constructor(public storage:StorageService) {
    this.checkAndInstantiateWeb3();
  }

  private checkAndInstantiateWeb3 = () => {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/7ec87430b5b148ec93858a96d6747e75")
    );
  };

  public async createAccount() {
    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic);
    const account = this.restoreAccount(mnemonic);
    await this.storage.setAccount(account);
    return mnemonic;
  }

  public restoreAccount(recoveryPassphrase: string){
    if (!bip39.validateMnemonic(recoveryPassphrase)) {
      return null;
    }
    const seed = bip39.mnemonicToSeed(recoveryPassphrase);
    const root = hdkey.fromMasterSeed(seed);
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const privateKey = addrNode._privateKey.toString('hex');
    const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
    const address = ethUtil.publicToAddress(pubKey).toString('hex');
    console.log(pubKey)
    return new Account(address, pubKey.toString('hex'), privateKey);
  }

  public async getBalance() {
    // need to access sc for this info
  }

  public async getTransactions(){
    // need to access sc for this info
  }
}