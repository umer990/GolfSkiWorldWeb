import {Injectable} from '@angular/core';

import {ItineraryWithPrice} from '../resort/LowFareSearch';

@Injectable()
export class FlightCheckoutService {
    selectItem:ItineraryWithPrice;
    adults:number;
    children:number;
    infants:number;
setItineraryInfo(item:ItineraryWithPrice,adults:number,children:number,infants:number){
  this.selectItem=item; 
  this.adults= adults;
  this.children=   children;
  this.infants=infants;
   }

   
}