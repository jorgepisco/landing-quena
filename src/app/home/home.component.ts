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


  }

  public goArtist() {
    console.log('artistSelected::: ', this.artistSelected);
    this.router.navigate([`/artist/${this.artistSelected}`]);
  }

  public selectArtist() {
    console.log('artistSelected::: ', this.artistSelected);
  }

}
