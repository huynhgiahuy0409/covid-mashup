import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, delay } from "rxjs/operators";
import { getCountryCodeDict, getIsoDate } from "../covid-viz/covid-viz.utils";
import { IVaccinationData, vaccinationColMapDict, VaccinationDataItem } from "./vacinnation.utils";
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class VaccinationService {
    private vaccinationApiUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv'
    public countryCodeDict: { [key: string]: string } = {}
    public sltVaccineTypeSub = new BehaviorSubject<string | undefined>(undefined)
    public sltVaccineType$ = this.sltVaccineTypeSub.asObservable()

    constructor(private http: HttpClient) {
        this.countryCodeDict = getCountryCodeDict()
    }

    getVaccinationData(): Observable<IVaccinationData> {
        const options = {
            responseType: 'text' as any
        }
        const exceptCtryNameDict: { [key: string]: string } = {
            'US': 'United States of America',
            'Korea, South': 'South Korea',
            'Czechia': 'Czech Republic'
        }
        return this.http.get(this.vaccinationApiUrl, options)
            .pipe(
                map((result: any) => {
                    const allData = this.parseCSV2Json(result, vaccinationColMapDict) as VaccinationDataItem[]

                    const groupByLocationData = _.groupBy(allData, 'location')
                    const lastestData = Object.keys(groupByLocationData)
                        .map(location => groupByLocationData[location].slice(-1)[0])
                    return {
                        countries: lastestData.map(item => ({
                            ...item,
                            countryName: item.location,
                            countryCode: this.countryCodeDict[exceptCtryNameDict[item.location] || item.location],
                        }))
                    } as IVaccinationData
                })
            )
    }

    parseCSV2Json(csvResult: any, colMapDict: { [key: string]: string }) {
        const allLines = csvResult.split('\n')
        const header = allLines[0]
        const cols = header.split(',')
        const rowLines = allLines.slice(1)
        return rowLines.map((rowLine: string) => {
            const colValues = rowLine.split(',')
            const entries = new Map(cols.map((col: string, colIdx: number) => {
                return [colMapDict[col], colValues[colIdx]]
            }))
            return Object.fromEntries(entries)
        })
    }

}