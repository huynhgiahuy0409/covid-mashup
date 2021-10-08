
const worldMap = require("@highcharts/map-collection/custom/world.geo.json");

export const dataTypeSltItems: { label: string, value: string }[] = [
    { label: 'Nb confirmed', value: 'nbConfirmed' },
    { label: 'Nb deaths ', value: 'nbDeaths' },
    { label: 'Nb new confirmed', value: 'nbNewConfirmed' },
    { label: 'Nb new open cases', value: 'nbNewOpenCases' },
    { label: 'Nb new recovered', value: 'nbNewRecovered' },
    { label: 'Nb open cases', value: 'nbOpenCases' },
    { label: 'Nb recovered ', value: 'nbRecovered' },
    { label: 'Nb confirmed yesterday', value: 'nbConfirmedYesterday' },
    { label: 'Nb deaths yesterday ', value: 'nbDeathsYesterday' },
    { label: 'Nb open cases yesterday', value: 'nbOpenCasesYesterday' },
    { label: 'Nb recovered yesterday', value: 'nbRecoveredYesterday ' }
  ]

  export const covidDataValueGetterDict: { [key: string]: string } = {
    nbConfirmed: 'today_confirmed',
    nbDeaths: 'today_deaths',
    nbNewConfirmed: 'today_new_confirmed',
    nbNewDeaths: 'today_new_deaths',
    nbNewOpenCases: 'today_new_open_cases',
    nbNewRecovered: 'today_new_recovered',
    nbOpenCases: 'today_open_cases',
    nbRecovered: 'today_recovered',
    nbConfirmedYesterday: 'yesterday_confirmed',
    nbDeathsYesterday: 'yesterday_deaths',
    nbOpenCasesYesterday: 'yesterday_open_cases',
    nbRecoveredYesterday: 'yesterday_recovered'
}

export interface ICovidData {
    nbConfirmed: number,
    nbDeaths: number,
    nbNewConfirmed: number,
    nbNewOpenCases: number,
    nbNewRecovered: number,
    nbOpenCases: number,
    nbRecovered: number,
    nbConfirmedYesterday: number,
    nbDeathsYesterday: number,
    nbOpenCasesYesterday: number,
    nbRecoveredYesterday: number,
}

export interface ICountryCovidData extends ICovidData {
    countryName: string,
    countryCode: string,
    [key: string]: any
}

export interface ISingleDateCovidData {
    date: string | Date,
    total: ICovidData,
    countries: ICountryCovidData[]
}

export function getIsoDate(date: Date) {
    return date.toISOString().split('T')[0]
}

export function getCountryCodeDict() {
    const ctryCodeEntries = new Map(
        worldMap.features.map((item: any) => (
            [
                item.properties.name,
                item.properties['hc-key']
            ]
        ))
    )
    return Object.fromEntries(ctryCodeEntries)
}