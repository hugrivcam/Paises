import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
  ]
})
export class ContryTableComponent {
   @Input()
   public listaPaises: Country[] = [];

   public mensaje(mensaje:string):void
   {
       alert(mensaje);
   }

}
