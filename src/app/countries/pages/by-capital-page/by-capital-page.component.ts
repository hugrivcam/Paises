//import { Observable } from 'rxjs';
import { Country } from './../../interfaces/country';
import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  
  public ListaPaises: Country[] = [];

  constructor(private cs: CountriesService) {}

  ManejaEnviarCapital(term:string){
      
     //alert("La capital seleccionada es: " + term + ".");
     //console.log("desde bycapitalpage obtengo: " + term + " desde el control importado.")
     //subscribe lanza la petición que esta preparada dentro de searchCapital
     console.log("1."+term);
     //this.ListaPaises=this.cs.searchCapital(term);//no pude hacer esto hasta que no maneje async await pipes
     this.cs.search(term,"capital").subscribe(paises => 
      {
        //hice un cambio por el que puede devolver nulo  
        if (paises != null)
          this.ListaPaises = paises;//aqui lo que ocurre es que la petción tarda un tiempo en ejecutarse
        else
          this.ListaPaises = [];
        //pero angular se asegura de actualizar los cambios en cuanto los detecta, así que cuando el
        //array cambia se ve reflejado en nuestra pagina sin necesidad de usar async await
      });
      //esto quiere decir que el console.log se ejecutará siempre antes de obtener un valor para ListaPaises
     //console.log(this.ListaPaises);
  }

}
