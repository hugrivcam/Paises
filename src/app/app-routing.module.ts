//import { CountriesModule } from './countries/countries.module';
import { Routes, RouterModule } from '@angular/router';
//import { AppRoutingModule } from './app-routing/app-routing.module';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
//las rutas about, home y contact
const routes: Routes = [
   // {
   //    path: '',
   //    component: HomePageComponent
   // },
   {
      path: 'about',
      component: AboutPageComponent
   },
   {
      path: 'contact',
      component: ContactPageComponent
   },
   {
      //carga perezosa con loadChildren, además añade la posibilidad de acceder a las rutas hijas de countries, que precisamente estan en countries.module
      path: 'countries',
      loadChildren: ()=> import('./countries/countries.module')
         .then(m => m.CountriesModule)
   },
   {
     path: '**',
     redirectTo: 'countries'
   }
];
//import { NameComponent } from './name.component';
//forRoot se usa cuando es el modulo de rutas principal, si son modulos de rutas secundarios se usar en lugar de forRoot Forchild
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
