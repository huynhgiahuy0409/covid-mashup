import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapVizComponent } from './world-map-viz.component';

describe('WorldMapVizComponent', () => {
  let component: WorldMapVizComponent;
  let fixture: ComponentFixture<WorldMapVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldMapVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
