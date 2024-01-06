import {
  Component,
  Input
} from '@angular/core';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatCardModule
} from '@angular/material/card';
import {
  Campaign
} from "../models/campaign";
import {Town} from "../models/town";
import {Tag} from "../models/tag";
import {KeywordEnum} from "../models/keyword-enum";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-campaign-display',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgIf],
  templateUrl: './campaign-display.component.html',
  styleUrl: './campaign-display.component.css'
})
export class CampaignDisplayComponent {
  @Input() campaign: Campaign = {
    bidAmount: 10000,
    name: "nazwa",
    radius: 110,
    seller: {
      companyName: "asd",
      name: 'imie',
      lastName: 'nazwisko',
      balance: 100000
    },
    status: "On",
    tags: [
      {keyword: KeywordEnum.Electronics},
      {keyword: KeywordEnum.PCs}
    ],
    town: Town.Krakow
  }
}
