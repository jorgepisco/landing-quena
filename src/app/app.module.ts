import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-MLXPVKL'
    }),
    NgxGoogleAnalyticsModule.forRoot('G-5EPQXEZ27Y')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
