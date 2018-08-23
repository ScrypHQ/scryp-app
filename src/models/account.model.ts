export class Account {
  constructor(addr, pubKey, pvtKey, phrase) {
    this.address = addr;
    this.publickey = pubKey;
    this.privateKey = pvtKey;
    this.phrase = phrase;
  }
  public address: string;
  public publickey: string;
  public privateKey:string;
  public phrase: string;
}