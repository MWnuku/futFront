import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  Campaign
} from "./models/campaign";
import {
  AppService
} from "./app.service";
import {
  HttpClient, HttpClientModule
} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css'],
  standalone: true,
  imports: [HttpClientModule],
  providers: [AppService]
})
export class AppComponent {
  title = 'futFront';
  campaigns: Campaign[] = [];

  constructor(private appService: AppService) {
    this.appService.getAllCampaigns().subscribe();
  }
}
