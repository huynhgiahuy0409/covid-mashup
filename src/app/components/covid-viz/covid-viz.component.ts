import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { CovidVizService } from './covid-viz.service';
import { dataTypeSltItems, ISingleDateCovidData } from './covid-viz.utils';

@Component({
  selector: 'app-covid-viz',
  templateUrl: './covid-viz.component.html',
  styleUrls: ['./covid-viz.component.scss']
})
export class CovidVizComponent implements OnInit {
  public singleDateCovidData$!: Observable<ISingleDateCovidData>

  dataTypeSltItems = dataTypeSltItems
  dataTypeForm!: FormGroup
  defaultFilter = { dataType: 'nbOpenCases' }

  constructor(
    private fb: FormBuilder,
    private covidVizService: CovidVizService
  ) { }

  ngOnInit(): void {
    this.dataTypeForm = this.fb.group(this.defaultFilter)
    this.dataTypeForm.valueChanges
      .pipe(
        startWith(this.defaultFilter),
        map(value => value['dataType'])
      )
      .subscribe(sltDataType => {
        this.covidVizService.sltDataTypeSub.next(sltDataType)
      })

    this.singleDateCovidData$ = this.covidVizService
      .getCovidDataByDate(new Date())
      .pipe(tap(data => console.log(data)))
  }

}
