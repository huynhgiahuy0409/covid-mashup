import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartVizComponent } from './bar-chart-viz.component';

describe('BarChartVizComponent', () => {
  let component: BarChartVizComponent;
  let fixture: ComponentFixture<BarChartVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
