import { Component, Input, OnInit } from '@angular/core';
import Highcharts from "highcharts/highmaps";
import { combineLatest } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CovidVizService } from '../covid-viz.service';
import { dataTypeSltItems, ISingleDateCovidData } from '../covid-viz.utils';
const worldMap = require("@highcharts/map-collection/custom/world.geo.json");

@Component({
  selector: 'app-world-map-viz',
  templateUrl: './world-map-viz.component.html',
  styleUrls: ['./world-map-viz.component.scss']
})
export class WorldMapVizComponent implements OnInit {
  public chartOptions$ = new Observable<Highcharts.Options>()

  private singleDateCovidDataSub = new BehaviorSubject<ISingleDateCovidData | undefined>(undefined)
  private singleDateCovidData$ = this.singleDateCovidDataSub.asObservable()
  private _singleDateCovidData!: ISingleDateCovidData
  @Input() get singleDateCovidData() { return this._singleDateCovidData }
  set singleDateCovidData(value: ISingleDateCovidData) {
    this._singleDateCovidData = value
    this.singleDateCovidDataSub.next(value)
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions!: Highcharts.Options

  constructor(
    private covidVizService: CovidVizService
    ) { }

  ngOnInit(): void {
    this.chartOptions$ = combineLatest([
      this.singleDateCovidData$, 
      this.covidVizService.sltDataType$
    ])
      .pipe(
        map(([singleDateCovidData, sltDataType]) => {
          const dataTypeItem = dataTypeSltItems.find(item => item.value === sltDataType)
          const chartData: [string, number][] = (singleDateCovidData?.countries || [])
            .map(ctryDataItem => {
              const value = dataTypeItem ? ctryDataItem[dataTypeItem.value] : 0
              return [ctryDataItem.countryCode, value]
            })
          return this.getWorlmapChartOptions(chartData, dataTypeItem?.label)
        }))
  }
  getWorlmapChartOptions(chartData: [string, number][], legendTitle: string | undefined): Highcharts.Options {
    return {
      chart: {
        map: worldMap
      },
      title: {
        text: ""
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        enabled: true
      },
      colorAxis: {
        min: 0
      },
      series: [
        {
          type: "map",
          name: legendTitle,
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          allAreas: false,
          data: chartData
        }
      ]
    }
  }

}
