import { Component, OnInit } from '@angular/core';
const apigClientFactory = require('aws-api-gateway-client').default;
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { QuenaService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public artists: any = [];
  artistSelected: any;

  constructor(private router: Router, private quenaService: QuenaService,private $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {

    this.getArtists();
    this.$gaService.event('CargaExitosaInicio', 'Inicio', 'CargaExitosa');
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

  getArtist = async(id: any) => {
    


  }

  public goArtist() {
    console.log('artistSelected::: ', this.artistSelected);

    //Devuelve el nombre del Artista y envía la etiqueta personalizada
      const request = {
        "request": {
          "payload": {
            "id": this.artistSelected
          }
        }
      };
      let pathUrl = environment.getArtist;
      this.quenaService.invokePostService(apigClientFactory, request, pathUrl).then((res) =>{
        let data = res.data.response.payload;
        if(res.data.response.status){          
          this.$gaService.event('SeleccionInicio'+data.name, 'inicio', '');
        }else{
          this.$gaService.event('ErrorSeleccionInicio'+data.name, 'inicio', '');
        }
      });


    this.getArtist(this.artistSelected);
    this.router.navigate([`/artist/${this.artistSelected}`]);
  }

  public selectArtist() {
    console.log('artistSelected::: ', this.artistSelected);
  }


  



}
