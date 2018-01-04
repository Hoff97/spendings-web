import { Injectable } from '@angular/core';

import { Spending } from './spending';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class SpendingService {
  private token: String;

  constructor(private http: HttpClient) { }

  login(email: String, pw: String) {

  }

  signUp(firstName: String, lastName: String,
         email: String, pw: String) {

  }

  getSpendings(search: String, fromD: String,
               toD: String) : Observable<Spending[]>{
    return this.http.get<Spending[]>('localhost:9000/api/spendings',options )
      .map(x => {
        console.log(x);
        return x;
      });
  }

  getCategories(): Observable<String[]> {
    return Observable.of([]);
  }

  sumSpendings(fromD: String, toD: String) {

  }
}
