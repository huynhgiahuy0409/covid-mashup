import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovidVizComponent } from './components/covid-viz/covid-viz.component';
import { MaterialModules } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { WorldMapVizComponent } from './components/covid-viz/world-map-viz/world-map-viz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartVizComponent } from './components/covid-viz/bar-chart-viz/bar-chart-viz.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { WorldMapVacineVizComponent } from './components/vaccination/world-map-vacine-viz/world-map-vacine-viz.component';
import { PieChartVacineVizComponent } from './components/vaccination/pie-chart-vacine-viz/pie-chart-vacine-viz.component';

@NgModule({
  declarations: [
    AppComponent,
    CovidVizComponent,
    HeaderComponent,
    WorldMapVizComponent,
    BarChartVizComponent,
    VaccinationComponent,
    WorldMapVacineVizComponent,
    PieChartVacineVizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModules,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
