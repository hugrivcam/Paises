import { Component, OnInit, OnDestroy } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
//import { miSeleccion } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit,OnDestroy {
  public ListaPaises: Country[] = [];
  //public ismyopinion: boolean = true;
  public isLoading: boolean = false;
  constructor(private cs: CountriesService) {}
  public miTermBusqueda:string="";

  ngOnInit() {
    //miSeleccion | null
    const miSel = this.cs.loadPaginaCache('byCountry');
    if (miSel !== null){
      //console.log("CARGAR BUSQUEDA PAIS: " + miSel.lastBusqueda);
      this.ListaPaises = miSel.listaPaises;
      this.miTermBusqueda = miSel.lastBusqueda;
    }
  }
  ngOnDestroy(): void {
    //console.log("GUARDAR BUSQUEDA PAIS: " + this.miTermBusqueda);
    this.cs.savePaginaCache('byCountry',this.miTermBusqueda,this.ListaPaises);
  }

  manejaEnviarPais(term:string){      
     this.miTermBusqueda = term;
     this.isLoading=true;
     this.cs.search(term,"name").subscribe((paises) => {
         if(paises != null) 
           this.ListaPaises = paises;
         else  
           this.ListaPaises=[]
         this.isLoading=false;
        });
     }
}
