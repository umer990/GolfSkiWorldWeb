import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable ,map}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'

@Injectable()



export class transportservice{

  constructor (private http: Http) {}



   // private this.base_url = "https://www.omdbapi.com/?t=%22Silicon%20Valley%22&Season=1"
private this.base_url ="../Flights.json" 

    getHotels(): string[]{ 
             return this.http.get(this.base_url)
                        .map(this.extractData)
                        .catch(this.handleError);

                       
         }
    




     private extractData(res: Response) {
        let body = res.json(); console.log(body)
        return body["Flights"] || { };
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