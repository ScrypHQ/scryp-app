import { Injectable } from "../../node_modules/@angular/core";
import { HttpClient } from "../../node_modules/@angular/common/http";

@Injectable()
export class OffersService {
  constructor(private http: HttpClient){}

  async GetOffersData(): Promise<any> {
    return await this.http.get('https://wpwrr7z66j.execute-api.us-east-1.amazonaws.com/GetOffers').toPromise()
  }
}