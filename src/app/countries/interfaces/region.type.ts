import { Country } from "./country";

export type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania'|'';
export type miSeleccion = 
{
  indice: string;
  lastBusqueda: string | Region,
  listaPaises: Country[] 
}