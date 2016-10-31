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
			<div  class="col-lg-10 col-lg-offset-1" >
			
				<div *ngIf="slidesLoaded">
					<div  *ngFor="let img of images; let i= index"> 
									<div class="float-left"*ngIf="i <= 2" >
										<a class="more" *ngIf="i==2" (click)="OpenImageModel(img.img,images)"> +{{images.length - 3}} more </a> 
									<div class="list-img"  style="width:250px; background: black;" >
										<img *ngIf='img.type=="image"' style="width:100% !important;height:100% !important" src="{{img.thumb}}" (click)="OpenImageModel(img.img,images)" alt='Image' />
										<video *ngIf='img.type=="video"'style="height:100% !important;width:100% !important"  class="" src="{{img.img}}" id='{{img.mediatype_id}}'  (click)="OpenImageModel(img.img,images)" alt='Image' ></video>
									</div>
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

//dataUri:any;
createThumbnail(vdoURL){
	
	//console.log("video Url:"+ vdoURL)
	var video=document.createElement("video")
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	
	canvas.width =20;
	canvas.height =20;
	
	video.setAttribute("scr",vdoURL)
	video.play();
	setTimeout(function() {  	
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
	},3000)	
	var dataURI = canvas.toDataURL('image/jpeg');
		
	//console.log(dataURI)
	return dataURI;
}

constructor(moviesService: movieService,private _elRef:ElementRef){
	
	moviesService.getMovies()
			.subscribe(
					data=>this.addImages(data)),
					error=>alert(error),
				()=>console.log("Movies Loaded")
}

ngOnInit():any{}

addImages=function(data){
				//	console.log("Raw Movies:" + JSON.stringify(data))
				for (var i = 0; i < data.length; i++)
				                        {
				                        var destination = data[i];
				                        	this.images.push({
				                        			'type': !destination.movie ? 'image' : 'video',   
				                                    'thumb':!destination.movie ? destination.thumbnail: this.createThumbnail(destination.movie)  ,                
				                                    'img':!destination.thumbnail ? destination.movie : destination.thumbnail,                                  
				                                })
				                                }
																			//	console.log("slides loaded:" + JSON.stringify(this.images))
																				
																				this.slidesLoaded=true;
				}



OpenImageModel(imageSrc,images) {
     //alert('OpenImages');
     var imageModalPointer;
		 
     for (var i = 0; i < images.length; i++) {
            if (imageSrc === images[i].img) {
              imageModalPointer = i;
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