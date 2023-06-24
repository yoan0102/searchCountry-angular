import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { Observer, tap } from 'rxjs';

import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private readonly countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }
  searchByPais(term: string): void {
    this.countriesService
      .searchCountry(term)
      .pipe(tap((country) => console.log(country)))
      .subscribe((countries) => {
        this.countries = countries;
      });
  }
}
