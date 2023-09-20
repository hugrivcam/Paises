import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  public ListaPaises: Country[] = [];

  constructor(private cs: CountriesService) {}

  manejaEnviarPais(term:string){      
     //la peticion nos envia paises y lo guardamos bajo nuestro array por ¿referencia?
     this.cs.search(term,"name").subscribe((paises) => {
         if(paises != null) 
           this.ListaPaises = paises;
         else  
           this.ListaPaises=[]});
     }
}
