import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '04-CountryApp';

  constructor(private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    //alert("hola");
    // console.log("on init 1" + this.activatedRoute.toString);
    // this.activatedRoute.data.subscribe( data => 
    //   {
    //     //alert("hola");
    //     console.log("on init:" + {data});
    //   });
    // /*this.activatedRoute.params.subscribe(({id}) => {
      // console.log("on init:" + {params:id}); //me perdí
    // })*/
  }


// en script de angula.json deberia funcionar el boot strap pero no funciona "node_modules/bootstrap/dist/css/bootstrap.min.css",
  mensaje():void
  {
    alert("Hola");

  }
}
