import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//añadimos esto tambien en app.modeule.ts para que puedas ser accesible el modulo desde toda la aplicación
                                                  //este modulo podiamos a lo mejor añadirlo en countries.module.ts, supongo pero el profe lo puso en app
import {Observable, catchError, map, of} from 'rxjs';                                                
import { Country } from '../interfaces/country';

@Injectable({  providedIn: 'root' })
export class CountriesService {
                 
  private ApiUrl = 'https://restcountries.com/v3.1';
  //private http3!: HttpClient;// no se si funcionaria
  //private http2: HttpClient = new HttpClient(necesita un parametro)); //no funciona, curioso
  constructor(private http: HttpClient){} 
  
  //httpClient.get devuelve siempre un objeto tipo observable que una mieeeeerdaaaa porque no se importa autimaticamente de rxjs, hay que poner el import a mano
  //nuestra funcion debe devolver un array de Countrys definido en nuestra interfaz obetnida a través de postman
  //además en el return hay que indicarle a get que va a devolver un objeto de tipo <Country[]>, porque si no no sabe lo que va a devolver

  search(busqueda:string, byTipo:string,totalPaises: number = 100): Observable<Country[] | null>
  {
      //todo este codigo sólo se lanzará cuando el subscribe tenga efecto
      const url = this.ApiUrl +"/"+byTipo+"/"+busqueda;
      console.log(url);
      return this.http.get<Country[]>(url)
      .pipe(
        map((paises) => {
          //console.log("0.Paises recibidos: "+ paises.length + " MaxPaises: " + totalPaises);
          if (paises.length === 0) return null; //map devuelve null, y al final se devolvera un observable nulo
          //if (totalPaises > 0)
          //  return paises;
          //console.log("1.Paises recibidos: "+ paises.length + " MaxPaises: " + totalPaises);
            if (paises.length > totalPaises){ 
              //console.log("2.Paises recibidos: "+ paises.length + " MaxPaises: " + totalPaises);
              return paises.slice(0,totalPaises);//map devuelve todos los paises hasta el máximo indicado en totalPaises
            }
            else
              return paises;//si el tamaño de paises es menor o igual que el tam max, map devuelve todos los paises tal y como llegaron            
        }),
        catchError( (error)  =>
        {
          console.log("ocurrio un error en search");
          console.log(error);
          return of(null);//devuelve un observable vacio, recordemos que esta funcion devuelve lo que nos devuelve nuestro get
          //nuestro get devuvelve lo que esta definido en la interfaz, que es lo que obtenemos de la url con postman
        })    
      ); //todo lo que se escriba dentro del pipe se ejecuta sólo en el momento que alguien haga subscribe
      //con el pipe podemos usar diferentes subfunciones =>, MAP TAP catchError ()
      //esto así como está guarda la petición pero no la ejecujta, necesitamos usar el metodo subscribe,pffff
  }




/*  searchCapital(busqueda:string): Country[]
  {
      let miListaPaises:Country[] = [];
      const url = this.ApiUrl +"/capital/"+busqueda;
      console.log(url);
      this.http.get<Country[]>(url)
        .subscribe(paises => {
          console.log("2."+ paises.length);
          miListaPaises = paises
        });
      //aquí ocurre que el console.log 3 se ejecuta antes que el 2     
      console.log("3."+miListaPaises);
      return miListaPaises;
  }
*/
}









