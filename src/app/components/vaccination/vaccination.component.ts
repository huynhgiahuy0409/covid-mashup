import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { VaccinationService } from './vacinnation.service';
import { IVaccinationData, vaccineTypeSltItems } from './vacinnation.utils';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {
  public vaccinationData$!: Observable<IVaccinationData>

  vaccineTypeSltItems = vaccineTypeSltItems
  vaccineTypeForm!: FormGroup
  defaultFilter = { vaccineType: '' }

  constructor(
    private fb: FormBuilder,
    private vaccinationService: VaccinationService
  ) { }

  ngOnInit(): void {
    this.vaccineTypeForm = this.fb.group(this.defaultFilter)

    this.vaccineTypeForm.valueChanges
      .pipe(
        startWith(this.defaultFilter),
        map(value => value['vaccineType'])
      )
      .subscribe(sltVaccineType => {
        this.vaccinationService.sltVaccineTypeSub.next(sltVaccineType)
      })

    this.vaccinationData$ = this.vaccinationService
      .getVaccinationData()
      .pipe(tap(data => console.log(data)))
  }

}
