import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, AfterViewInit,Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, map } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: []
})
export class SearchBoxComponent implements OnInit, AfterViewInit, OnDestroy   {
   //debouncer servirá para detectar cuando el usuario deja de escribir
   //es un tipo de observable Subject, que tiene sus pipes, taps subscribes etc
   private EnterPulsado:boolean=false;
   private contadordebouncer: number = 0;
   private debouncer:Subject<string> = new Subject<string>;//yo le llamaria Stopper, o detector de parada

  //entra un dato devuelve un evento onValue
   @Input()
   public termBusqueda:string = '';
   @Input()
   public placeholder:string = '';

   @ViewChild("txtInput")
   public txtsb!: ElementRef<HTMLInputElement>;
 
   @Output()
   public onValue2: EventEmitter<string> = new EventEmitter();
 
   ngAfterViewInit(){
     this.txtsb.nativeElement.value=this.termBusqueda;
   }

   ngOnInit(): void {
     //console.log("valor del texto de busqueda: "+ this.termBusqueda);
     //this.txtsb.nativeElement.value=this.termBusqueda; //lanzo el subscribe al inciarse el componente y queda a la espera de que ocurra algo
     this.debouncer
     .pipe //antes del subscriber permite hacer cosas con la información, que en este caso es una cadena de texto
     ( 
        debounceTime(400) //hasta que no pasa al menos un segundo el observable no funciona, así que el usuario hasta que no deje de escribir durante más de un segundo por muchos next que ejecute el subscribe no se lanza
     )
     .subscribe
     (
        valor=>
        {
          console.log("init searchbox: " + valor);
          //this.EnviarValor();
          if (this.EnterPulsado === false)
            this.onValue2.emit(valor);//como tengo 2 eventos y este se ejecuta sólo, evito que emitamos el valor 2 veces si pulsamos enter
          else
            this.EnterPulsado = false;       
        }
     )
   }
   ngOnDestroy():void{
     //console.log("destruido");
     this.debouncer.unsubscribe();//liberamos los recursos para que no este escuchando el observable, esto no lo hacemos con el http.get
   }
   public EnviarValor():void
    {
       //const term: string  = this.txtsb.nativeElement.value;
       this.EnterPulsado = true;
       this.onValue2.emit(this.txtsb.nativeElement.value);
    }

    onKeyPress(term:string):void
    {
      //console.log(term);
      this.contadordebouncer++;
      console.log("contador: " + this.contadordebouncer + " Termino:"+term);
      this.debouncer.next(term);
    }

}
