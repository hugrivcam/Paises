import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: []
})
export class SearchBoxComponent {
  //entra un dato devuelve un evento onValue
   @Input()
   public placeholder:string = '';

   @ViewChild("txtInput")
   public txtsb!: ElementRef<HTMLInputElement>;
 
   @Output()
   public onValue2: EventEmitter<string> = new EventEmitter();
 
   public EnviarValor():void
    {
       const term: string  = this.txtsb.nativeElement.value;
       //console.log("desde el search box " + term);
       this.onValue2.emit(term);
    }

}
