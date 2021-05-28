import { Component, OnInit } from '@angular/core';
const apigClientFactory = require('aws-api-gateway-client').default;
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { QuenaService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  public artists: any = [];
  artistSelected: any;

  constructor(private router: Router, private quenaService: QuenaService) { }

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists = async() => {
    console.log('start getArtists()');
    const request = {
      "request": {
          "payload": {
        }
      }
    };
    let pathUrl = environment.getAllArtists;
    this.quenaService.invokePostService(apigClientFactory, request, pathUrl).then((res) => {
      if(res.data.response.status){
        this.artists = res.data.response.payload;
      }
      console.log('new response::: ', this.artists);
    });

    // let result: any;
    // const apigClient = apigClientFactory.newClient({
    //   invokeUrl: 'https://8wyy91tan5.execute-api.us-east-2.amazonaws.com',
    //   accessKey: 'AKIAY2QDANANYJ5S6LHH',
    //   secretKey: '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',
    //   region: 'us-east-2'
    // });


    //   const pathParams = {};
    //   const pathTemplate = '/test/api-quena/artist/getAll';
    //   const method = 'POST';
    //   const additionalParams = {
    //       headers: {},
    //       queryParams: {},
    //   };
    //   const request = {
    //     "request": {
    //       "payload": {
    //       }
    //     }
    //   };
    //   try {
    //     console.log('request: ', request);
    //       result = await apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, request);
    //       if(result.data.response.status){
    //         this.artists = result.data.response.payload;
    //       }
    //       console.log('Artists: ', JSON.stringify(this.artists));
    //   } catch (error) {
    //       console.log('ocurrió un error: ', error);
    //   }


  }

  public goArtist() {
    console.log('artistSelected::: ', this.artistSelected);
    this.router.navigate([`/artist/${this.artistSelected}`]);
  }

  public selectArtist() {
    console.log('artistSelected::: ', this.artistSelected);
  }

}
