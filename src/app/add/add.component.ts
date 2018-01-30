import { Component, OnInit, NgModule } from '@angular/core';

import { Spending } from '../spending';
import { Category } from '../category';
import { SpendingService } from '../spending.service';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

import { MessageService } from '../message.service';

import { ngfModule, ngf } from "angular-file"
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { BrowserModule } from '@angular/platform-browser'
import { Subscription } from 'rxjs'
import { ScanResult } from '../scanresult'

import { Option, None, Some } from 'option.ts';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  spending: Spending;
  categories: Category[];
  filteredCategories: Observable<Category[]>;

  postUrl = 'api/image/scanSpending';
  imageFormData: FormData;
  httpEvent: HttpEvent<Event>;

  categoryCtrl: FormControl;

  scan: ScanResult;
  scanPrice: number = 0;
  scanCategory: number = 0;
  scanDate: number = 0;

  constructor(private spendingService: SpendingService,
    private messageService: MessageService,
    private httpClient: HttpClient) {
    this.categoryCtrl = new FormControl();
    this.categories = [];

    this.filteredCategories = this.categoryCtrl.valueChanges
      .pipe(
      startWith(''),
      map(cat => cat ? this.filterCategories(cat) : this.categories.slice())
      );

    this.categoryCtrl.valueChanges.subscribe(x => this.spending.category.name = x);

    this.reset();
  }

  filterCategories(name: string) {
    return this.categories.filter(cat =>
      cat.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() { }

  reset() {
    this.spending = {
      id: 0, amount: 0, category: {
        id: 0, name: ""
      },
      description: "",
      date: new Date(),
      scanId: None
    }

    this.scan = null;

    this.scanPrice = 0;
    this.scanCategory = 0;
    this.scanDate = 0;

    this.categoryCtrl.setValue("");
  }

  loadCategories() {
    this.spendingService.getCategories().subscribe(x => {
      this.categories = x;
      this.categoryCtrl.setValue("");
    });
  }

  save() {
    let toSave = {
      amount: this.spending.amount,
      categoryFk: 0,
      date: this.spending.date,
      description: this.spending.description,
      scanId: this.spending.scanId
    }

    for (var category of this.categories) {
      if (category.name === this.spending.category.name) {
        toSave.categoryFk = category.id;
        this.spendingService.saveSpending(toSave.categoryFk, toSave.amount, toSave.date, toSave.description, toSave.scanId)
          .subscribe(x => {
            this.reset();
            this.messageService.sendMessage({ type: "success", short: "Created spending", long: "" })
          },
          e => {
            this.messageService.sendMessage({ type: "error", short: "Creating spending failed", long: e })
          });
        return;
      }
    }

    this.spendingService.saveCategory(this.spending.category.name)
      .subscribe(x => {
        this.spendingService.saveSpending(x.id, toSave.amount, toSave.date, toSave.description, toSave.scanId)
          .subscribe(x => {
            this.reset();
            this.loadCategories();
            this.messageService.sendMessage({ type: "success", short: "Created spending", long: "" })
          }, e => {
            this.messageService.sendMessage({ type: "error", short: "Creating spending failed", long: e })
          });
      });
  }

  setScanResults() {
    this.spending.scanId = Some(this.scan.scanId);
    this.spending.description = this.scan.description;

    if (this.scan.price.length >= 1)
      this.spending.amount = this.scan.price[0];

    if (this.scan.date.length >= 1)
      this.spending.date = this.scan.date[0];

    if (this.scan.category.length >= 1) {
      this.spending.category = this.scan.category[0];
      this.categoryCtrl.setValue(this.scan.category[0].name);
    }

    this.scanCategory = 0;
    this.scanDate = 0;
    this.scanPrice = 0;
  }

  scanImage(files: File[]): Subscription {
    const config = new HttpRequest('POST', this.postUrl, this.imageFormData, {
      reportProgress: true
    });

    return this.httpClient.request(config)
      .subscribe(event => {
        //this.httpEvent = event

        if (event instanceof HttpResponse) {
          this.messageService.sendMessage({ type: "success", short: "Image scanned", long: "" });
          this.scan = (event as HttpResponse<ScanResult>).body;
          this.setScanResults();
        }
      },
      error => {
        //TODO
      })
  }
}
