import { Injectable } from "../../node_modules/@angular/core";
import Web3 from 'web3';
import bip39 from 'bip39';
import hdkey from 'hdkey';
import HDWalletProvider from 'truffle-hdwallet-provider';
import * as ethUtil from 'ethereumjs-util';
import { Account } from "../models/account.model";
import { StorageService } from "./storage.service";
import { SCRYP_ABI } from '../scryp/scryp.abi';

@Injectable()
export class Web3Service{
  web3: any;
  provider: any;
  contract: any;
  masterWeb3: any;
  masterAccount: any;
  masterContract: any;
  masterProvider:any;
  private contractAddress = '0xEdcEf355b7958b18E5F5b23667380A9B20739428';
  constructor(public storage:StorageService) {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    this.instantiateMasterWeb3();
    this.ifAccountExists();
  }

  private async ifAccountExists(){
    const account = await this.storage.getAccount();
    if (!account || !account.address) {
      return;
    }
    this.checkAndInstantiateWeb3(account.phrase);
  }

  private checkAndInstantiateWeb3 = async(phrase) => {
    this.web3 = new Web3(
      new HDWalletProvider(
        phrase,
        'https://rinkeby.infura.io/v3/7ec87430b5b148ec93858a96d6747e75'
      )
    );
    this.contract = new this.web3.eth.Contract(SCRYP_ABI, this.contractAddress);
  };

  private async instantiateMasterWeb3() {
    this.masterProvider = new HDWalletProvider(
      'erupt today spell blind sail image rib debris silent budget matrix wear',
      'https://rinkeby.infura.io/v3/7ec87430b5b148ec93858a96d6747e75'
    );
    this.masterWeb3 = new Web3(this.masterProvider);
    const accounts = await this.masterWeb3.eth.getAccounts();
    this.masterAccount = accounts[0];
    this.masterContract = new this.masterWeb3.eth.Contract(SCRYP_ABI, this.contractAddress);
  }

  public async createAccount() {
    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic);
    const account = this.restoreAccount(mnemonic);
    await this.storage.setAccount(account);
    await this.checkAndInstantiateWeb3(mnemonic);
    // send ether
    await this.masterWeb3.eth.sendTransaction({to:account.address, from:this.masterAccount, value: this.masterWeb3.utils.toWei("0.01", "ether")});
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
    return new Account(address, pubKey.toString('hex'), privateKey, recoveryPassphrase);
  }

  public async getBalance(): Promise<number> {
    // need to access sc for this info
    const account = await this.storage.getAccount();
    const balance = await this.contract.methods.balanceOf(account.address).call();
    return balance;
  }

  public async earnScryp(amount): Promise<boolean>{
    try {
      // allow the transfer
      const account = await this.storage.getAccount();
      const allowed = await this.masterContract.methods.approve(account.address, amount).send({ from: this.masterAccount, gas:'1000000'});

      //transfer the coin after that
      if(allowed) {
        const result = await this.contract.methods.transferFrom(this.masterAccount, account.address, amount).send({from: account.address, gas:'1000000'});
      }
      return true;
    } catch(e) {
      console.log(e)
      return false
    }
  }

  public async burnScryp(amount) : Promise<boolean> {
    try {
      const account = await this.storage.getAccount();
      await this.contract.methods.burn(amount).send({from: account.address, gas:'1000000'});
      return true;
    } catch(e) {
      console.log(e)
      return false;
    }
  }
}