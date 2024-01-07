import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Campaign } from "../models/campaign";
import { AppService } from "../app.service";
import { Town } from "../models/town";
import { KeywordEnum } from '../models/keyword-enum';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-campaign-input',
  standalone: true,
  imports: [HttpClientModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './campaign-input.component.html',
  styleUrls: ['./campaign-input.component.css']
})
export class CampaignInputComponent {
  @ViewChild("campaignForm") campaignForm!: NgForm;
  @Output() newDataEvent = new EventEmitter();
  campaign: Campaign = {
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

  constructor(private appService: AppService) {}

  onSubmit(): void {
    if (this.campaignForm.invalid) {
      return;
    }

    this.campaign.name = this.campaignForm.value.name;
    this.campaign.tags = this.campaignForm.value.tags.map((tagValue: string) => ({ keyword: tagValue }));
    this.campaign.status = this.campaignForm.value.status;
    this.campaign.town = this.campaignForm.value.town;
    this.campaign.radius = this.campaignForm.value.radius;
    this.campaign.bidAmount = this.campaignForm.value.bidAmount;
    this.campaign.seller.name = this.campaignForm.value.sellerName;
    this.campaign.seller.lastName = this.campaignForm.value.sellerLastName;
    this.campaign.seller.companyName = this.campaignForm.value.companyName;

    this.appService.addCampaign(this.campaign).subscribe(
      (addedCampaign) => {
        console.log('Campaign added:', addedCampaign);
        this.newDataEvent.emit(addedCampaign);
        this.campaignForm.resetForm();
      },
      (error) => {
        console.error('Error adding campaign:', error);
      }
    );
  }
}
