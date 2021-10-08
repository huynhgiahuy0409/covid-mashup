import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { covidDataValueGetterDict, getCountryCodeDict, getIsoDate, ICovidData, ISingleDateCovidData } from "./covid-viz.utils";

@Injectable({ providedIn: 'root' })
export class CovidVizService {
    private covidApiUrl = 'https://api.covid19tracking.narrativa.com/api'
    public countryCodeDict: { [key: string]: string } = {}
    public sltDataTypeSub = new BehaviorSubject<string | undefined>(undefined)
    public sltDataType$ = this.sltDataTypeSub.asObservable()

    constructor(private http: HttpClient) {
        this.countryCodeDict = getCountryCodeDict()
    }

    getCovidDataByDate(date: Date): Observable<ISingleDateCovidData> {
        const exceptCtryNameDict: { [key: string]: string } = {
            'US': 'United States of America',
            'Korea, South': 'South Korea',
            'Czechia': 'Czech Republic'
        }
        const isoDateStr = getIsoDate(date)
        const apiUrl = `${this.covidApiUrl}/${isoDateStr}`
        return this.http.get<ISingleDateCovidData>(apiUrl)
            .pipe(
                map((rawData: any) => {
                    const countriesData = rawData.dates[isoDateStr]?.countries || {}
                    const dataKeys = Object.keys(covidDataValueGetterDict)
                    const countryNames = Object.keys(countriesData)
                    const countryCovidDatas = countryNames.map(ctryName => {
                        const covidCtrData = countriesData[ctryName]
                        const ctryEntries = new Map(dataKeys.map(key => [key, covidCtrData[covidDataValueGetterDict[key]]]))
                        return {
                            countryName: ctryName,
                            countryCode: this.countryCodeDict[exceptCtryNameDict[ctryName] || ctryName],
                            ...Object.fromEntries(ctryEntries)
                        }
                    })
                    const totalEntries = new Map(dataKeys.map(key => [key, rawData.total[covidDataValueGetterDict[key]]]))
                    return {
                        date,
                        countries: countryCovidDatas,
                        total: Object.fromEntries(totalEntries) as ICovidData
                    } as ISingleDateCovidData
                })
            )
    }

}