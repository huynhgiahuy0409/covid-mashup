import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navItems = [
    { label: 'Covid19-viz',  link: 'covid-viz' },
    { label: 'Vaccination',  link: 'vaccination-viz' },
    { label: 'Info',  link: 'info' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
