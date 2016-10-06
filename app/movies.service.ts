import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable ,map}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'

@Injectable()



export class movieService{

  constructor (private http: Http) {}



    private this.base_url = "http://test.golfskiworld.com/admin/api/adventure/destination"
    getMovies1(): string[]{ 
             return this.http.get(this.base_url)
                        .map(this.extractData)
                        .catch(this.handleError);

                       
         }
	getMovies(): string[]{
	var images = [{
        'type': 'video',
        'url': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg',
        'thumbUrl': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg'
    }, {
        'type': 'video',
        'url': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg',
        'thumbUrl': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg'
    }, {
        'type': 'video',
        'url': 'https://www.youtube.com/watch?v=khrAhOrSZQc',
        'thumbUrl': 'https://i.ytimg.com/vi/khrAhOrSZQc/1.jpg'
    }, {
        'type': 'video',
        'url': 'https://www.youtube.com/watch?v=N7TkK2joi4I',
        'thumbUrl': 'https://i.ytimg.com/vi/N7TkK2joi4I/1.jpg'
    }, {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Kamp_Alexisdorf_3.jpg',
        'thumbUrl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kamp_Alexisdorf_3.jpg/120px-Kamp_Alexisdorf_3.jpg'
    }, {
        'type': 'video',
        'url': 'https://www.youtube.com/watch?v=khrAhOrSZQc',
        'thumbUrl': 'https://i.ytimg.com/vi/khrAhOrSZQc/1.jpg'
    }];



			 return images;//rest call or call something
	}

     private extractData(res: Response) {
        let body = res.json(); console.log(body)
        return body["destinations"] || { };
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