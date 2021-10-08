import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { dataTypeSltItems, ISingleDateCovidData } from '../covid-viz.utils';
import Highcharts from "highcharts/highmaps";
import { CovidVizService } from '../covid-viz.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-bar-chart-viz',
  templateUrl: './bar-chart-viz.component.html',
  styleUrls: ['./bar-chart-viz.component.scss']
})
export class BarChartVizComponent implements OnInit {
  public chartOptions$ = new Observable<any>()
  Highcharts: typeof Highcharts = Highcharts;

  private singleDateCovidDataSub = new BehaviorSubject<ISingleDateCovidData | undefined>(undefined)
  private singleDateCovidData$ = this.singleDateCovidDataSub.asObservable()
  private _singleDateCovidData!: ISingleDateCovidData
  @Input() get singleDateCovidData() { return this._singleDateCovidData }
  set singleDateCovidData(value: ISingleDateCovidData) {
    this._singleDateCovidData = value
    this.singleDateCovidDataSub.next(value)
  }

  constructor(
    private covidVizService: CovidVizService
  ) { }

  ngOnInit(): void {
    this.chartOptions$ = combineLatest([
      this.singleDateCovidData$,
      this.covidVizService.sltDataType$
    ]).pipe(
      map(([singleDateCovidData, sltDataType]) => {
        const dataTypeItem = dataTypeSltItems.find(item => item.value === sltDataType)
        const chartData: { countryName: string, value: number }[] = (singleDateCovidData?.countries || [])
          .map(ctryDataItem => {
            return {
              countryName: ctryDataItem.countryName,
              value: dataTypeItem ? ctryDataItem[dataTypeItem.value] : 0
            }
          })
        const sortedChartData = _.orderBy(chartData, 'value', 'desc').slice(10)
        return this.getBarChartOptions(sortedChartData, dataTypeItem?.label)
      })
    )
  }

  getBarChartOptions(chartData: { countryName: string, value: number }[], legendLabel: string | undefined) {
    return {
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: chartData.map(item => item.countryName),
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: legendLabel,
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: legendLabel,
          data: chartData.map(item => item.value)
        }
      ]
    }
  }
}
