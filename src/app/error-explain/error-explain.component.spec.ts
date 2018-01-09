import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorExplainComponent } from './error-explain.component';

describe('ErrorExplainComponent', () => {
  let component: ErrorExplainComponent;
  let fixture: ComponentFixture<ErrorExplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorExplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
