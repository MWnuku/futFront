import {
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {
  NgForOf,
  NgIf
} from "@angular/common";
import {
  CampaignDisplayComponent
} from "../campaign-display/campaign-display.component";
import {
  CampaignEditComponent
} from "../campaign-edit/campaign-edit.component";
import {
  Campaign
} from "../models/campaign";
import {Town} from "../models/town";
import { KeywordEnum } from '../models/keyword-enum';
import {
  AppService
} from "../app.service";


@Component({
  selector: 'app-campaign-wrapper',
  standalone: true,
  imports: [
    NgForOf,
    CampaignDisplayComponent,
    CampaignEditComponent,
    NgIf
  ],
  templateUrl: './campaign-wrapper.component.html',
  styleUrl: './campaign-wrapper.component.css'
})
export class CampaignWrapperComponent {
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
  @Output() removeItemEvent = new EventEmitter<number>();

  editable: boolean = false;

  constructor(private appService: AppService) {
  }
  handleEditClick(){
    this.editable = true;
  }

  handleSaveEdition(campaign: Campaign){
    this.editable = false;
    this.campaign = campaign;
  }

  removeItem(id: number){
    console.log(id)
  this.removeItemEvent.emit(id);
  }
}
