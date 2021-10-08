export const vaccineTypeSltItems = [
    { label: 'All', value: '' },
    { label: 'Pfizer/BioNTech', value: 'Pfizer/BioNTech' },
    { label: 'Johnson&Johnson', value: 'Johnson&Johnson' },
    { label: 'Moderna', value: 'Moderna' },
    { label: 'Oxford/AstraZeneca', value: 'Oxford/AstraZeneca' },
    { label: 'Sinovac', value: 'Sinovac' }
]

export const vaccinationColMapDict = {
    location: 'location',
    iso_code: 'isoCode',
    date: 'date',
    total_vaccinations: 'totalVaccinations',
    people_vaccinated: 'peopleVaccinated',
    people_fully_vaccinated: 'peopleFullyVaccinated',
    total_boosters: 'totalBoosters',
    daily_vaccinations_raw: 'dailyVaccinationsRaw',
    daily_vaccinations: 'dailyVaccinations',
    total_vaccinations_per_hundred: 'totalVaccinationsPerHundred',
    people_vaccinated_per_hundred: 'peopleVaccinatedPerHundred',
    people_fully_vaccinated_per_hundred: 'peopleFullyVaccinatedPerHundred',
    total_boosters_per_hundred: 'totalBoostersPerHundred',
}

export interface VaccinationDataItem {
    location: string
    isoCode: string
    countryName?: string
    countryCode?: string
    date: string | Date
    totalVaccinations: number
    peopleVaccinated: number
    peopleFullyVaccinated: number
    totalBoosters: number
    dailyVaccinationsRaw: number
    dailyVaccinations: number
    totalVaccinationsPerHundred: number
    peopleVaccinatedPerHundred: number
    peopleFullyVaccinatedPerHundred: number
    totalBoostersPerHundred: number
}

export interface IVaccinationData {
    total?: VaccinationDataItem,
    countries: VaccinationDataItem[]
}