import { Country } from './../interfaces/country';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//añadimos esto tambien en app.modeule.ts para que puedas ser accesible el modulo desde toda la aplicación
                                                  //este modulo podiamos a lo mejor añadirlo en countries.module.ts, supongo pero el profe lo puso en app
import {Observable, catchError, delay, map, of} from 'rxjs';                                                
import { Region, miSeleccion } from '../interfaces/region.type';
//'byCaptial'|'byRegion'|'byCountry';


@Injectable({  providedIn: 'root' })
export class CountriesService {
                 
  private ApiUrl = 'https://restcountries.com/v3.1';
  //private http3!: HttpClient;// no se si funcionaria
  //private http2: HttpClient = new HttpClient(necesita un parametro)); //no funciona, curioso
  public cacheStore :miSeleccion[] = [];

  constructor(private http: HttpClient){
    //console.log("contries Service INIT");
    this.loadFromLocalStorage();
  } 
  
  private saveToLocalStorage()
  {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    console.log("saving storage");
  }
  private loadFromLocalStorage()
  {
    const res = localStorage.getItem('cacheStore')
    if (res)
    {
      this.cacheStore = JSON.parse(res);
      console.log("loading from storage");
    }
  }
  //httpClient.get devuelve siempre un objeto tipo observable que una mieeeeerdaaaa porque no se importa autimaticamente de rxjs, hay que poner el import a mano
  //nuestra funcion debe devolver un array de Countrys definido en nuestra interfaz obetnida a través de postman
  //además en el return hay que indicarle a get que va a devolver un objeto de tipo <Country[]>, porque si no no sabe lo que va a devolver
  public savePaginaCache (origen:string,last_Busqueda: string | Region, lista_Paises:Country[])
  {
    //creo el objeto y le asigno sus propiedades
    const miItem:miSeleccion = {    
      indice : origen,
      lastBusqueda : last_Busqueda,
      listaPaises : lista_Paises
    }
    //antes compruebo mi array, si no existe lo añado, si existe lo modifico
    const indice:number = this.cacheStore.findIndex((item)=>item.indice===origen);//si encuentra el indice devuelve la posición en el array del elemento encontrado
    if (indice > -1 ) this.cacheStore[indice] = miItem;
    else this.cacheStore.push(miItem);
    this.saveToLocalStorage();
  }

  public loadPaginaCache(origen:string):miSeleccion | null
  {
    //console.log(this.cacheStore);
    const indice:number = this.cacheStore.findIndex((item)=>item.indice===origen);//si encuentra el indice devuelve la posición en el array del elemento encontrado
    if (indice>-1) return this.cacheStore[indice]; 
    else return null;
  }


  search(busqueda:string, byTipo:string,totalPaises: number = 100): Observable<Country[] | null>
  {    
      const url = this.ApiUrl +"/"+byTipo+"/"+busqueda;
      console.log("searching:"+url);
      return this.http.get<Country[]>(url)
      .pipe(
        map((paises) => {

          if (paises.length === 0) return null; //map devuelve null, y al final se devolvera un observable nulo
            if (paises.length > totalPaises){ 
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
        }),
        delay(100)//parametro que se pasa al pipe para que tarde 2 segundos en funcionar    
      ); 
  }
  
  
  searchConComentarios(busqueda:string, byTipo:string,totalPaises: number = 100): Observable<Country[] | null>
  {
      //todo este codigo sólo se lanzará cuando el subscribe tenga efecto
      const url = this.ApiUrl +"/"+byTipo+"/"+busqueda;
      console.log("searching:"+url);
      return this.http.get<Country[]>(url)
      .pipe(
        //con map modifico el array de paises que me llega por defecto
        //devuelvo tal cual, o null, o el listado original limitado
        //sino defino map siempre me devolveria el array original y nunca nulo
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
        }),
        delay(100)//parametro que se pasa al pipe para que tarde 2 segundos en funcionar    
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









