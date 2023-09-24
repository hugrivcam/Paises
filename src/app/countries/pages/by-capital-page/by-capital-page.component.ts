//import { Observable } from 'rxjs';
import { Country } from './../../interfaces/country';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { miSeleccion } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit ,OnDestroy{
  
  public ListaPaises: Country[] = [];
  public isLoading: boolean = false;//esta cargando sólo cuando está cargando la lista
  public miTermBusqueda:string="";
  constructor(private cs: CountriesService) {}
 
  ngOnInit() {
    const miSel:miSeleccion | null = this.cs.loadPaginaCache('byCapital');
    if (miSel !== null){
      this.ListaPaises = miSel.listaPaises;
      this.miTermBusqueda = miSel.lastBusqueda;
    }
  }
  ngOnDestroy(): void {
    this.cs.savePaginaCache('byCapital',this.miTermBusqueda,this.ListaPaises);
  }

  ManejaEnviarCapital(term:string){
     this.isLoading = true; 
     this.miTermBusqueda = term;
     //alert("La capital seleccionada es: " + term + ".");
     //console.log("desde bycapitalpage obtengo: " + term + " desde el control importado.")
     //subscribe lanza la petición que esta preparada dentro de searchCapital
     //console.log("1."+term);
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
        this.isLoading = false;
      });
      //esto quiere decir que el console.log se ejecutará siempre antes de obtener un valor para ListaPaises
     //console.log(this.ListaPaises);
  }

}
