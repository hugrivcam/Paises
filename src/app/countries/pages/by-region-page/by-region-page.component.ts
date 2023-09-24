import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
 
//type region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit ,OnDestroy{
  regionesValidas: Region[] = ['Africa','Americas','Asia','Europe','Oceania']; //array de regiones, que son string, pero no pueden ser otras regiones distintas a las descritas en type
  public selectedRegion?: Region;
  public ListaPaises: Country[] = [];
  public isLoading: boolean = false;
  constructor(private cs: CountriesService) {}
  //public miTermBusqueda:Region ="";
  ngOnInit() {
    const miSel = this.cs.loadPaginaCache('byRegion');
    //console.log("comprobando datos carga region...");
    //console.log(miSel);
    if (miSel !== null){
      this.ListaPaises = miSel.listaPaises;
      //this.miTermBusqueda = miSel.lastBusqueda as Region;//le indico a TS que en este caso lastBusqueda siempre es de tipo Region
      //console.log("region cargada: " + this.miTermBusqueda);
      this.selectedRegion = miSel.lastBusqueda as Region;
    }
  }
  ngOnDestroy(): void {
    //console.log("region guardada: " + this.miTermBusqueda);
    this.cs.savePaginaCache('byRegion',this.selectedRegion as string,this.ListaPaises);
  }

  manejaEnviarRegion(term:Region){      
     this.selectedRegion = term;
     //this.miTermBusqueda = term;
     this.isLoading = true;
     this.cs.search(term,"region").subscribe(paises => {paises != null ? this.ListaPaises= paises: this.ListaPaises=[];this.isLoading=false;});
     //this.isLoading = false;
  }
}
