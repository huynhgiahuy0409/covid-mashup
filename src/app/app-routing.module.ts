import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidVizComponent } from './components/covid-viz/covid-viz.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';

const routes: Routes = [
  { path: '', redirectTo: 'covid-viz', pathMatch: 'full' },
  { path: 'covid-viz', component: CovidVizComponent },
  { path: 'vaccination-viz', component: VaccinationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
