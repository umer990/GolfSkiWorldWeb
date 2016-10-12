import {Component,Injectable,ElementRef,OnInit,Renderer} from '@angular/core'
import {movieService} from './movies.service'
import {ImageModalComponent} from './ImageModel.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { operator }     from 'rxjs/operator';
import { map }  from 'rxjs/add/operator/map';

declare var jQuery:any; 

@Component({
	selector:'movies',
 directives:[ImageModalComponent],
 
	template:`
			<div  class="col-lg-10 col-lg-offset-1">
			
				<div *ngIf="slidesLoaded">
					<div  *ngFor="let img of images; let i= index"> 
									<div class="float-left" *ngIf="i <= 2" >
										<a class="more" *ngIf="i==2" (click)="OpenImageModel(img.img,images)"> +{{images.length - 3}} more </a> 
										<img class="list-img" [src]="dataURI" (click)="OpenImageModel(img.img,images)" alt='Image' />
									</div>
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

slidesLoaded=false;
movies;
openModalWindow:boolean=false;
imagePointer:number;
images=[];

dataURI:any;


constructor(moviesService: movieService,private _elRef:ElementRef){
	
	moviesService.getMovies()
			.subscribe(
					data=>this.addImages(data)),
					error=>alert(error),
				()=>console.log("Date get finished")
}

ngOnInit():any{
var video=document.createElement("video")
video.setAttribute("scr","https://s3.amazonaws.com/golfskiworld/movies/destination/2016-10-12.08-37-46.340603.mp4")	 
var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
var context = canvas.getContext('2d');
context.drawImage(video, 0, 0, canvas.width, canvas.height);
this.dataURI = canvas.toDataURL('image/jpeg');
console.log(this.dataURI)
/*	var video="https://s3.amazonaws.com/golfskiworld/movies/destination/2016-10-12.08-37-46.340603.mp4"	 
    var can=this.renderer.createElement(this._elRef.nativeElement, "canvas");
	var ctx=can.getContext("2d");
	can.width="50px"
  can.height="50px"
  ctx.drawImage(video, 0, 0, '50px', '50px');
  */
		console.log(jQuery(this._elRef.nativeElement).find('.list-img'));
						//alert("jQuery works")
			}

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
																				this.slidesLoaded=true;
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