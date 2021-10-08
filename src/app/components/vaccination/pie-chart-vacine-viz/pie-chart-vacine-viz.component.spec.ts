import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartVacineVizComponent } from './pie-chart-vacine-viz.component';

describe('PieChartVacineVizComponent', () => {
  let component: PieChartVacineVizComponent;
  let fixture: ComponentFixture<PieChartVacineVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartVacineVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartVacineVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
