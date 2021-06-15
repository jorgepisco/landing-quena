import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor(private $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.$gaService.event('CargaExitosaThankyou','ThankYou');
  }

}
