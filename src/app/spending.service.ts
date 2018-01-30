import { Injectable } from '@angular/core';

import { Spending } from './spending';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Config } from '../config';

import * as moment from 'moment';

import { Token } from './token';
import { Category } from './category';
import { Sum } from './sum';

import { Option, None, Some } from 'option.ts';

@Injectable()
export class SpendingService {
  private token: string;

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
    to: Date, page: number, pageSize: number,
    sort: string, sortDir: boolean, category: number): Observable<Result<Spending[]>> {
    console.log(this.token);
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);
    header = header.set('X-Page', page + "");
    header = header.set('X-Page-Size', pageSize + "");

    let url = Config.url + 'api/spending?sort=' + sort + '&sortDir=' + sortDir + '&from='
      + moment(from).format("YYYY-MM-DD") + "&to=" + moment(to).format("YYYY-MM-DD")
      + "&search=" + search + (category > 0 ? "&category=" + category : "");

    return this.http.get<Spending[]>(url, { headers: header, observe: 'response' }).map(x => {
      return { result: x.body, total: parseInt(x.headers.get("X-Number-Items")) }
    });
  }

  saveSpending(category: number, amount: number, date: Date, description: string, scanId: Option<number>): Observable<Spending> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);

    let url = Config.url + 'api/spending';

    console.log(scanId);

    if (scanId.isDefined()) {
      return this.http.post<Spending>(url, {
        categoryFk: category,
        amount: amount,
        date: moment(date).format("YYYY-MM-DD"),
        description: description,
        userFk: 0,
        scanFk: scanId.get()
      }, { headers: header });
    } else {
      return this.http.post<Spending>(url, {
        categoryFk: category,
        amount: amount,
        date: moment(date).format("YYYY-MM-DD"),
        description: description,
        userFk: 0
      }, { headers: header });
    }
  }

  updateSpending(id: number, category: number, amount: number, date: Date, description: string): Observable<Spending> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);

    let url = Config.url + 'api/spending/' + id;

    return this.http.put<Spending>(url, {
      id: id,
      categoryFk: category,
      amount: amount,
      date: moment(date).format("YYYY-MM-DD"),
      description: description,
      userFk: 0
    }, { headers: header });
  }

  deleteSpending(id: number): Observable<number> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);

    let url = Config.url + 'api/spending/' + id;

    return this.http.delete<number>(url, { headers: header });
  }

  saveCategory(name: string): Observable<Category> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);

    let url = Config.url + 'api/category';

    return this.http.post<Category>(url, {
      name: name,
      parent: 0
    }, { headers: header });
  }

  getCategories(): Observable<Category[]> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);

    let url = Config.url + 'api/category';

    return this.http.get<Category[]>(url, { headers: header });
  }

  sumSpendings(from: Date, to: Date): Observable<Sum[]> {
    let header = new HttpHeaders();
    header = header.set('X-Auth-Token', this.token);

    let url = Config.url + 'api/spending/sum?from='
      + moment(from).format("YYYY-MM-DD") + "&to=" + moment(to).format("YYYY-MM-DD");

    return this.http.get<Sum[]>(url, { headers: header });
  }
}

interface Result<A> {
  result: A;
  total: number;
}
