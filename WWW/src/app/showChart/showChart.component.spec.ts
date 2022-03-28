/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowChartComponent } from './showChart.component';

describe('ShowChartComponent', () => {
  let component: ShowChartComponent;
  let fixture: ComponentFixture<ShowChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
