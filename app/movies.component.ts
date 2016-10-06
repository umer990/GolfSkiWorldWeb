import {Component} from '@angular/core'
import {movieService} from './movies.service'
import {ImageModalComponent} from './ImageModel.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { operator }     from 'rxjs/operator';
import { map }  from 'rxjs/add/operator/map';


@Component({
	selector:'movies',
 directives:[ImageModalComponent]
	template:`
			<div ng-if="slidesLoaded" class="col-lg-10 col-lg-offset-1">
			<div ng-if="images.length==0">
			<h4>No avaialable Movies</h4>
			</div>
                  <div *ngFor="let img of images; let i= index"> 
		        <div class="float-left" *ngIf="i <= 2" >
		          <a class="more" *ngIf="i==2" (click)="OpenImageModel(img.img,images)"> +{{images.length - 3}} more </a> 
		          <img class="list-img" src="{{img.thumb}}"(click)="OpenImageModel(img.img,images)" alt='Image' />
		        </div>
		      </div>
		    <div *ngIf="openModalWindow">
		        <ImageModal1 [modalImages]="images" [imagePointer] = "imagePointer" (cancelEvent) ="cancelImageModel()"></ImageModal1>
		    </div>
                    
            </div>


			
			`,
	providers:[movieService]
	
	
})

export class moviesComponent{ 


title="Movies loads here ";

movies;

openModalWindow:boolean=false;


    imagePointer:number;
    images=[];

addImages=function(data){
					console.log(data)
				for (var i = 0; i < data.length; i++)
				                        {
				                        var destination = data[i];
				                        	this.images.push({
				                        			'type': !destination.movie ? 'image' : 'video',   
				                                    'thumb':!destination.movie ? destination.thumbnail : destination.movie,                
				                                    'img':!destination.thumbnail ? destination.movie : destination.thumbnail                                  
				                                })
				                                }
				}




constructor(moviesService: movieService){
	
	moviesService.getMovies1()
			.subscribe(
					data=>this.addImages(data)),
					error=>alert(error),
				()=>console.log("Date get finished")


				

}

 OpenImageModel(imageSrc,images) {
     //alert('OpenImages');
     var imageModalPointer;
     for (var i = 0; i < images.length; i++) {
            if (imageSrc === images[i].img) {
              imageModalPointer = i;
              console.log('jhhl',i);
              break;
            }
       }
         this.openModalWindow = true;
     this.images = images;
     this.imagePointer  = imageModalPointer;
   }
   cancelImageModel() {
     this.openModalWindow = false;
   }
}