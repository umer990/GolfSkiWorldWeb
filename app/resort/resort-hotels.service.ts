import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable ,map}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'
import myGlobals = require('../constants');
import { Airport,AirportInfo} from '../resort/Airport';

@Injectable()

export class hotelService{

  constructor (private http: Http) {}






private hotelsApi="https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&location=BOS&check_in=2017-03-14&check_out=2017-03-16&amenity=RESTAURANT&amenity=PARKING&number_of_results=2"

   // private this.base_url = "https://www.omdbapi.com/?t=%22Silicon%20Valley%22&Season=1"
private base_url ="../Hotels.json" 
//v1.2/hotels/search-circle?apikey=log%20in%20to%20retrieve%20API%20key&latitude=36.0857&longitude=-115.1541&radius=42&check_in=2016-11-15&check_out=2016-11-16
//http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude=43.6&longitude=7.2&radius=50&check_in=2015-09-01&check_out=2015-09-03&chain=RT¤cy=EUR&number_of_results=50&apikey=<your API key>

getHotels1(): Observable < any > {
    return this.http.get(this.hotelsApi)
      .map(this.extractData1)
      .catch(this.handleError);
  }

onSearch(latitude: number, longitude: number,radius: number,checkIn_date:Date,checkOut_date:Date,currency:string,noOfResults:number):Observable<any>{
"https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&latitude=13.01225&longitude=53.339772&radius=2042&check_in=2016-11-25&check_out=2016-11-30"   
     let httpRequest:string="http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C";
     httpRequest +="&latitude="+latitude+"&longitude="+longitude+"&radius=2042&check_in="+this.convertToISOFormatter(checkIn_date);

     if(checkOut_date!=null){
         httpRequest +="&check_out="+this.convertToISOFormatter(checkOut_date)
     }
/*
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
        */
        console.log("httpRequestUrl:"+httpRequest)
        return this.http.get(httpRequest)
        .map(this.extractData1)
        .catch(this.handleError);
      //  return this.http.get(httpRequest).map((res: Response) => res.json()).catch(this.handleError);

}

findAirport(latitude: number, longitude: number):Observable < Airport[]>{

    let httpRequest:string="https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&latitude="+latitude+"&longitude="+longitude;
    return this.http.get(httpRequest).map(res=>res.json());
}
     private extractData1(res: Response) {
        let body = res.json(); console.log(body)
        return body["results"] || { };
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


    getHotels(): string[]{ 
             return this.http.get(this.base_url)
                        .map(this.extractData)
                        .catch(this.handleError);

                       
         }
    




     private extractData(res: Response) {
        let body = res.json(); console.log(body)
        return body["hotels"] || { };
     }

     private handleError (error: any) {
            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error("Error:"+errMsg); // log to console instead
            return Observable.throw(errMsg);
  }
}