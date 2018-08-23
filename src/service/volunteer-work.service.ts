import { Injectable } from "../../node_modules/@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class VolunteerWorkService {
  constructor(private http: HttpClient){ }

  async GetVolunteerData(): Promise<any> {
    return await this.http.get('https://jkeb24szhf.execute-api.us-east-1.amazonaws.com/GetVolunteers').toPromise();
  }
}