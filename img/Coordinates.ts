import { InfoWindow } from './InfoWindow';
export class Coordinates{
constructor( 
	   public lat:number,
       public lng:number, 
       public zoomMin:number, 
       public zoomMax:number, 
       public count:string,
       public country:string,
       public city:string,
       public type:string,
       public infoWindow:InfoWindow
       public iconUrl:string) {

    }



}