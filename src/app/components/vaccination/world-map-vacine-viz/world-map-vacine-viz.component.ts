import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import Highcharts from "highcharts/highmaps";
import { IVaccinationData, vaccineTypeSltItems } from '../vacinnation.utils';
import { VaccinationService } from '../vacinnation.service';
import { map } from 'rxjs/operators';
const worldMap = require("@highcharts/map-collection/custom/world.geo.json");

@Component({
  selector: 'app-world-map-vacine-viz',
  templateUrl: './world-map-vacine-viz.component.html',
  styleUrls: ['./world-map-vacine-viz.component.scss']
})
export class WorldMapVacineVizComponent implements OnInit {
  vacineTypeSltItems = []
  public chartOptions$ = new Observable<Highcharts.Options>()

  private vaccinationDataSub = new BehaviorSubject<IVaccinationData | undefined>(undefined)
  private vaccinationData$ = this.vaccinationDataSub.asObservable()
  private _vaccinationData!: IVaccinationData
  @Input() get vaccinationData() { return this._vaccinationData }
  set vaccinationData(value: IVaccinationData) {
    this._vaccinationData = value
    this.vaccinationDataSub.next(value)
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions!: Highcharts.Options


  constructor(
    private vaccinationService: VaccinationService
  ) { }

  ngOnInit(): void {
    this.chartOptions$ = combineLatest([
      this.vaccinationData$,
      this.vaccinationService.sltVaccineType$
    ])
      .pipe(
        map(([vaccinationData, sltVaccineType]) => {
          const vaccineType = vaccineTypeSltItems.find(item => item.value === sltVaccineType)
          const chartData: [string, number][] = (vaccinationData?.countries || [])
            .map(ctryDataItem => {
              return [ctryDataItem.countryCode || '', ctryDataItem.peopleVaccinatedPerHundred]
            })
          console.log('chartData', chartData)
          return this.getWorlmapVChartOptions(chartData, vaccineType?.label)
        }))
  }

  getWorlmapVChartOptions(chartData: [string, number][], legendTitle: string | undefined): Highcharts.Options {
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
