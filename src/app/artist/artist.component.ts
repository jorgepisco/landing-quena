import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
const apigClientFactory = require('aws-api-gateway-client').default;

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.artistId = this.route.snapshot.params.id;
    console.log('artistId ===> ', this.artistId);
    this.getArtist(this.artistId);
    this.getProductsByArtistId(this.artistId);
  }

  getProductsByArtistId = async(artistId: any) => {
    console.log('start products by id artist(): ', artistId);
    let result: any;
    this.products = [];
    const apigClient = apigClientFactory.newClient({
      invokeUrl: 'https://8wyy91tan5.execute-api.us-east-2.amazonaws.com',
      accessKey: 'AKIAY2QDANANYJ5S6LHH',
      secretKey: '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',
      region: 'us-east-2'
    });


      const pathParams = {};
      const pathTemplate = '/test/api-quena/product/getByArtistId';
      const method = 'POST';
      const additionalParams = {
          headers: {},
          queryParams: {},
      };
      const request = {
        "request": {
          "payload": {
            "artist": artistId
          }
        }
      };
      try {
        // console.log('request: ', request);
          result = await apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, request);
          if(result.data.response.status){
            let data = result.data.response.payload;
            console.log('data.::: ', data);
            this.products = data[0].products;
          }
          // console.log('product by artis id ===> ', JSON.stringify(this.products));
      } catch (error) {
          console.log('ocurrió un error: ', error);
      }


  }

  getArtist = async(id: any) => {
    console.log('start products by id artist(): ', id);
    let result: any;
    this.artist = [];
    const apigClient = apigClientFactory.newClient({
      invokeUrl: 'https://8wyy91tan5.execute-api.us-east-2.amazonaws.com',
      accessKey: 'AKIAY2QDANANYJ5S6LHH',
      secretKey: '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',
      region: 'us-east-2'
    });


      const pathParams = {};
      const pathTemplate = '/test/api-quena/artist/get';
      const method = 'POST';
      const additionalParams = {
          headers: {},
          queryParams: {},
      };
      const request = {
        "request": {
          "payload": {
            "id": id
          }
        }
      };
      try {
        // console.log('request: ', request);
          result = await apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, request);
          if(result.data.response.status){
            let data = result.data.response.payload;
            this.artist = data;
            // console.log('data.::: ', data);
            // this.products = data[0].products;
            this.imageArtistUrl = data.imageLogo.url;
            console.log('imageArtistUrl: ', this.imageArtistUrl);
          }
          console.log('artist ===> ', this.artist);
          // console.log('url artist photo: ', this.artist[0].imageLogo);
      } catch (error) {
          console.log('ocurrió un error: ', error);
      }


  }

}
