import {Injectable} from '@angular/core';
import {Observable}from 'rxjs/Observable';
import {Http,Response,Headers}from '@angular/http';
import 'rxjs/Rx';
import { Airport,AirportInfo} from '../resort/Airport';
import {LowFareSearch,ItineraryWithPrice} from '../resort/LowFareSearch';

@Injectable()
export class TransportationService {


    constructor(private http: Http) {}
    

findAirport(latitude: number, longitude: number):Observable < Airport[]>{

    let httpRequest:string="https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&latitude="+latitude+"&longitude="+longitude;
    return this.http.get(httpRequest).map(res=>res.json());
}

 private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

showSuggestions(search:string): Observable < AirportInfo[] > {
 let httpRequest:string="https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&term="+search;

       
        return this.http.get(httpRequest).map(res => res.json()).catch(this.handleError);

    }

    convertToISOFormatter(date: Date): string {
        if (date == null) return null;
        var month: string;
        var day: string;
        if (date.getMonth() < 9) {
            month = "0" + (date.getMonth() + 1);
        } else month = String(date.getMonth() + 1);
        if (date.getDate() < 9) {
            day = "0" + (date.getDate());
        } else day = String(date.getDate());
        return date.getFullYear() + "-" + month + "-" + day;
    }

onSearch(origin:string,destination:string,departure_date:Date,return_date:Date,selectClass:string,adults:number,children:number,infants:number,currency:string):Observable<LowFareSearch>{
     let httpRequest:string="https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C";
     httpRequest +="&origin="+origin+"&destination="+destination+"&departure_date="+this.convertToISOFormatter(departure_date);

     if(return_date!=null){
         httpRequest +="&return_date="+this.convertToISOFormatter(return_date)
     }

     if(adults>0){
        httpRequest+="&adults="+adults;
       }
        if(children>0){
            httpRequest+="&children="+children;
        }
        if(infants>0){
            httpRequest+="&infants="+infants;
        }
        if(selectClass!=null ||selectClass!=" "){
            httpRequest+="&travel_class="+selectClass;
        }
        return this.http.get(httpRequest).map((res: Response) => res.json()).catch(this.handleError);

}




    
}
