import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class PersonalService {
    headers:any;
    constructor(private http: Http) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
    }

    updateEmail(memberKey: number, email: string) {
    }
}