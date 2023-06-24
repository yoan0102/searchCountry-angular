import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };
  constructor(private httpClient: HttpClient) {}

  private getCountrypRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => {
        return of([]);
      })
    );
  }

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`)
      .pipe(
        map((countries) => (countries.length > 0 ? countries[0] : null)),
        catchError((error) => {
          return of(null);
        })
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountrypRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries }))
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountrypRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries }))
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountrypRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }
}
