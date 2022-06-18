import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents:any = [];
  public data:any;
  public result:any;
  public productlist:any;
  public url:any;
  public output_image:any;
  public downloadURL!: Observable<string>;
  public display_flag=false;
  public path:any;
  public sucess_flag=false;
  public predictions: any;
  public inputwindow_flag=false;
  public outputwindow_flag=false;
  public fb!: string;
  public choice="0";
  constructor(private http:HttpClient,private domSanitizer: DomSanitizer,private storage: AngularFireStorage) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('useremail'));
  }
  public send(event:any){
	this.sucess_flag = false;
	this.inputwindow_flag = true;
	this.outputwindow_flag= false;
	this.display_flag=false;
    const file = event.target.files[0];
    this.data = file.name;
    console.log(this.data);
    const filePath = 'input_images/'+this.data;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`input_images/`+this.data, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          this.fb = downloadURL;
          console.log(this.fb);
          this.url=this.fb;
          //alert('file uploaded');
          this.sucess_flag=true;
        });
      })
    ).subscribe();
    
    
  }


  public display(){
	this.display_flag = false;
	this.outputwindow_flag = true;
    const payload=new FormData();
    payload.append('name',this.url);
    payload.append('filename',this.data);
	payload.append('model',this.choice);
	
    this.http.post('http://127.0.0.1:5000/detect',payload,{responseType:'text'}).subscribe(data=>{
      this.output_image = data.split(",")[0];
      ///let item=data.split(",");
      this.predictions=data.split(",").slice(1);
      console.log(this.predictions);

      //alert('data processed');
      this.path=this.output_image;
      this.display_flag=true;
    });
  }
  
  public selectmodel(event:any){
	  //this.sucess_flag = false;
	this.inputwindow_flag = true;
	this.outputwindow_flag= false;
	this.display_flag=false;
	  this.choice=event.target.value;
	  console.log(this.choice);
  }
  
  /*
  public results(event:any){
    let item=event.target.value;
    const headers = { 'X-RapidAPI-Host':'kohls.p.rapidapi.com', 'X-RapidAPI-Key':'49ecf82631msh4cac5e931f05d72p18ab4cjsn166508163000'}
    this.http.get(`https://kohls.p.rapidapi.com/products/list?keyword=${item}&limit=10&offset=1`,{headers}).subscribe(data=>{
      this.result = data;
      this.images = this.result.payload.products;
      //alert('data processed');
      console.log(this.result.payload.products);
      this.display_flag=false;
      this.inputwindow_flag = false;
	    this.outputwindow_flag= false;
    });
  } 
  */
  public results(event:any){
    let item=event.target.value;
    const headers = { 'X-RapidAPI-Host':'wolf-amazon-data-scraper.p.rapidapi.com', 'X-RapidAPI-Key':'49ecf82631msh4cac5e931f05d72p18ab4cjsn166508163000'}
    this.http.get(`https://wolf-amazon-data-scraper.p.rapidapi.com/search/${item}?api_key=59ef84be287bba26357f5519b0058332`,{headers}).subscribe(data=>{
      this.result = data;
      this.productlist = this.result.results;
	  this.productlist=this.productlist.slice(0,10);
	  
	  /*
	  for(let i=0;i<this.productlist.length;i++){
		  this.productlist[i].name=this.productlist[i].name.slice(0,10);
	  }
	  */
	 
      //alert('data processed');
      //console.log(this.result.payload.products);
      this.display_flag=false;
      this.inputwindow_flag = false;
	    this.outputwindow_flag= false;
    });
  } 
}
