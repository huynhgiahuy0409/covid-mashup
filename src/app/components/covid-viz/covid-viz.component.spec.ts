import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidVizComponent } from './covid-viz.component';

describe('CovidVizComponent', () => {
  let component: CovidVizComponent;
  let fixture: ComponentFixture<CovidVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
