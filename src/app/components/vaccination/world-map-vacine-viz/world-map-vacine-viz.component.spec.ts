import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapVacineVizComponent } from './world-map-vacine-viz.component';

describe('WorldMapVacineVizComponent', () => {
  let component: WorldMapVacineVizComponent;
  let fixture: ComponentFixture<WorldMapVacineVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldMapVacineVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapVacineVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
