import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public products: any[] = [];
  public artist: any[] = [];
  public imageArtistUrl: '';

  constructor(private route: ActivatedRoute,
    private quenaService: QuenaService) { }

  ngOnInit(): void {

    this.artistId = this.route.snapshot.params.id;
    console.log('artistId ===> ', this.artistId);
    this.getArtist(this.artistId);
    this.getProductsByArtistId(this.artistId);
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
          console.log('imageArtistUrl: ', this.imageArtistUrl);
          console.log('artist ===> ', this.artist);
        }
      });


  }

}
