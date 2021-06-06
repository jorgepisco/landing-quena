import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const apigClientFactory = require('aws-api-gateway-client').default;

import { QuenaService } from '../shared';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  private artistId: any;
  public spotify: any;
  public products: any[] = [];
  public artist: any[] = [];
  public imageArtistUrl: '';
  public blurb:any;
  public name:any;
  frmDelivery: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private quenaService: QuenaService,
    private router: Router,
    private _sanitizer: DomSanitizer) { 

      // this.spotify=  this._sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed/track/7MoZgM6AsQaZw14WnKopuy");
    }

  ngOnInit(): void {

    this.artistId = this.route.snapshot.params.id;
    console.log('artistId ===> ', this.artistId);
    this.getArtist(this.artistId);
    this.getProductsByArtistId(this.artistId);
    this.initForm();
  }

  initForm() {
    this.frmDelivery = this.fb.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      products: new FormControl([], Validators.required),
    });
  }

  getProductsByArtistId = async(artistId: any) => {
    console.log('start products by id artist(): ', artistId);
    
      const request = {
        "request": {
          "payload": {
            "artist": artistId
          }
        }
      };
        let pathUrl = environment.getProductsByArtistId;
        await this.quenaService.invokePostService(apigClientFactory, request, pathUrl).then((res) =>{
            if(res.data.response.status){
            let data = res.data.response.payload;
            this.products = data[0].products;
            console.log('products: ', this.products);
          }
        });


  }

  getArtist = async(id: any) => {
    console.log('start products by id artist(): ', id);
      const request = {
        "request": {
          "payload": {
            "id": id
          }
        }
      };
      let pathUrl = environment.getArtist;
      await this.quenaService.invokePostService(apigClientFactory, request, pathUrl).then((res) =>{
        if(res.data.response.status){
          let data = res.data.response.payload;
          this.artist = data;
          this.imageArtistUrl = data.imageLogo.url;
          this.spotify = this._sanitizer.bypassSecurityTrustResourceUrl(data.spotify);
          this.name  = data.name;
          this.blurb  = data.blurb;
          console.log('artist ===> ', this.artist);
        }
      });


  }

  public async save() {
    let form = this.frmDelivery.value;
    const request = {
      "request": {
        "payload": {
          "name": form.name,
          "phone": form.phone,
          "email": form.email,
          "products": form.products
        }
      }
    };
    console.log('request delivery: ', JSON.stringify(request));
    let pathUrl = environment.saveDelivery;
    await this.quenaService.invokePostService(apigClientFactory, request, pathUrl).then((res) =>{
      console.log('response save delivery: ', res)
      if(res.data.response.status){
        this.router.navigate(['/thankyou']);
      }
    });
  }

  public async selectProduct(item: any, index: any) {
    console.log('item ===> ', item);
    let element = document.getElementById("product"+index);
    console.log('element::: ', element);
    let form = this.frmDelivery.value;
    let products = [];
    products = form.products;
    let exist = false;
    if(products.length > 0){
      const updated = products.map(async(product, index) => {
        if(item.id == product.id){
          exist = true;
          products.splice(index, 1);
          element.innerHTML = "Seleccionar";
        }
      });
      await Promise.all(updated);
      if(!exist){
        products.push(item);    
        element.innerHTML = "Eliminar";
      }
    }else{
      products.push(item);
      element.innerHTML = "Eliminar";
    }
    this.frmDelivery.controls.products.setValue([]);
    this.frmDelivery.controls.products.setValue(products);
  }

}
