import { Injectable } from '@angular/core';

import { Spending } from './spending';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SpendingService {
  private token: String;

  constructor() { }

  login(email: String, pw: String) {

  }

  signUp(firstName: String, lastName: String,
         email: String, pw: String) {

  }

  getSpendings(search: String, fromD: String,
               toD: String) : Observable<Spending[]>{
    return Observable.of([]);
  }

  getCategories(): Observable<String[]> {
    return Observable.of([]);
  }

  sumSpendings(fromD: String, toD: String) {

  }
}
