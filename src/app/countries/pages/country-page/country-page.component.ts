import { CountriesService } from './../../services/countries.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})

//en resumen al iniciar se comprueba la ruta, el param id, que hemos definido en nuestra routes2
//se usa un pipe dentro de route.params para observar esa ruta y cuando se ejecuta el subscribe
//de la ruta automaticamente con swich map lanazamos el parmatro leido en params
//
export class CountryPageComponent implements OnInit
 {

    public miPais?: Country; //? pues puede ser nulo
    constructor(
      private route: ActivatedRoute,
      private router:Router, //
      private cs:CountriesService
    ){}
    ngOnInit(): void {
      this.route.params
      .pipe(
        //switchMap recibe el parametro anterior params y en vez de lanzar otro subscribe lanzo uno solo
        //que afecta a los 2, esta es la diferencia entre este codigo y el de abajo
        switchMap((p:Params) => this.cs.search(p['id'],"alpha",1))
      ).subscribe((pais) => {
       if (!pais) //return this.router.navigateByUrl('');
            return;//alert("no pais");
       //alert("si pais");
      return this.miPais = pais[0];  // si no es nulo guardamos el pais recibido en los datos obtenido por el observable del servicio
      // return;
    })
    }
 
      //el profe substituye el hell de abajo, mucho más sencillo por la mierda de arriba switchMap que está deprected
    ngOnInit33(): void {
      //aquí se desestructura id, obtengo el id que cae como parametro en la ruta, definida en nuetros routes2
      //permite al cargar la pagina ver la ruta y obtener los datos del pais
      //el problema es que tenemos un observable dentro de otro y eso no debe ocurrir
      this.route.params
      //.pipe(
        //tap(console.log)
      //switchMap((p:Params) => this.cs.search(p['id'],"alpha",1)),
      // )
      .subscribe(({id}) => {
        //console.log("1-->"+id);
        this.searchCountry(id);
        // this.cs.search(id,"alpha")
        //   .subscribe( pais => {
        //     console.log("2-->");
        //     console.log({pais});
        //   })
      })
      //forma entendible de hacerlo
      // this.route.params.subscribe((params) => {
      //   let a: string = params['id']; //el id sale del path: 'by/:id' creado en routes2
      //   console.log(a);
      // })
      //otra forma de hacerlo 
      // this.route.params.subscribe((p) => {
      //    console.log({parametros: p['id']); 
      // })

    }
  //solucion? al observable HELL, pfff , sigue estando uno dentro de otro pero bueno
    searchCountry( pais:string)
    {
      this.cs.search(pais,"alpha",1)
      .subscribe( pais => {
        //console.log("2-->");
        //console.log({pais});
      })
    }  
}


