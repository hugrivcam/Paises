import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public ListaPaises: Country[] = [];

  constructor(private cs: CountriesService) {}

  manejaEnviarRegion(term:string){      
     this.cs.search(term,"region").subscribe(paises => paises != null ? this.ListaPaises= paises: this.ListaPaises=[]);
  }
}
