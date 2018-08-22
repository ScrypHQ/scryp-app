export class Account {
  constructor(addr, pubKey, pvtKey) {
    this.address = addr;
    this.publickey = pubKey;
    this.privateKey = pvtKey;
  }
  public address: string;
  public publickey: string;
  public privateKey:string;
}