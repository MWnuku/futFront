import {Component} from '@angular/core';
import {
  Campaign
} from "./models/campaign";
import {
  AppService
} from "./app.service";
import {
  HttpClientModule
} from "@angular/common/http";
import {
  CampaignDisplayComponent
} from "./campaign-display/campaign-display.component";
import {
  CommonModule,
  NgForOf
} from "@angular/common";
import {
  CampaignInputComponent
} from "./campaign-input/campaign-input.component";
import {
  BrowserAnimationsModule
} from "@angular/platform-browser/animations";
import {
  CampaignWrapperComponent
} from "./campaign-wrapper/campaign-wrapper.component";
import {
  CampaignEditComponent
} from "./campaign-edit/campaign-edit.component";
import {Town} from "./models/town";
import { KeywordEnum } from './models/keyword-enum';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css'],
  standalone: true,
  imports: [HttpClientModule,
    CampaignDisplayComponent, NgForOf,
    CampaignInputComponent, CommonModule, CampaignWrapperComponent, CampaignEditComponent],
  providers: [AppService]
})
export class AppComponent {
  title = 'futFront';
  campaigns: Campaign[] = [];

  newCampaign: Campaign = {
    bidAmount: 10000,
    name: "aa",
    radius: 110,
    seller: {
      companyName: "aaa",
      name: 'imie',
      lastName: 'nazwisko',
      balance: 100000,
      campaigns: []
    },
    status: "On",
    tags: [
      { keyword: KeywordEnum.Electronics },
      { keyword: KeywordEnum.PCs }
    ],
    town: Town.Krakow
  };

  constructor(private appService: AppService) {
  }

  ngOnInit() {this.appService.getAllCampaigns().subscribe({
    next: campaign => {
      this.campaigns = campaign;
    },
  });
  }

  appendData(newCampaign: Campaign){
    this.campaigns.push(newCampaign);
  }
  onNewDataEvent(newCampaign: Campaign) {

    this.appendData(newCampaign);
  }

  removeItem(id: number) {
    this.appService.deleteCampaign(id).subscribe({
      next: response => {
        this.campaigns = this.campaigns.filter((campaign: Campaign) => campaign.id !== id);
        console.log(response)
      },
      error: err => {console.log(err)}
  })
  }
}

