import { Injectable } from '@angular/core';

import { Spending } from './spending';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Config } from '../config';

import * as moment from 'moment';

import { Token } from './token';
import { Category } from './category';

@Injectable()
export class SpendingService {
  private token: string;

  pageSize = 20;

  constructor(private http: HttpClient) { }

  login(email: String, pw: String) {
    let header = new HttpHeaders();

    let url = Config.url + 'api/signIn';

    return this.http.post<Token>(url, { email: email, password: pw, rememberMe: true })
      .map(x => this.token = x.token);
  }

  signUp(email: String, pw: String) {
    let header = new HttpHeaders();

    let url = Config.url + 'api/signUp';

    return this.http.post<Token>(url, { email: email, password: pw, firstName: email, lastName: "" })
      .map(x => this.token = x.token);
  }

  getSpendings(search: String, from: Date,
               to: Date, page: number, sort: string) : Observable<Spending[]>{
    console.log(this.token);
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token',this.token);
    header = header.set('X-Page',page + "");
    header = header.set('X-Page-Size',this.pageSize + "-");

    let url = Config.url + 'api/spending?sort=' + sort + '&sortDir=true&from='
      + moment(from).format("YYYY-MM-DD") + "&to=" + moment(to).format("YYYY-MM-DD") + "&search=" + search;

    return this.http.get<Spending[]>(url, { headers: header });
  }

  getCategories(): Observable<Category> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token',this.token);

    let url = Config.url + 'api/category';

    return this.http.get<Category>(url, { headers: header });
  }

  sumSpendings(from: Date, to: Date) {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token',this.token);

    let url = Config.url + 'api/spending/sum?from='
      + moment(from).format("YYYY-MM-DD") + "&to=" + moment(to).format("YYYY-MM-DD");

    return this.http.get<Category>(url, { headers: header });
  }
}
