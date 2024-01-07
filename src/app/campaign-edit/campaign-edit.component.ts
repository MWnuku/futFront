import {
  Component, ElementRef,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule
} from "@angular/forms";
import {
  MatButtonModule
} from "@angular/material/button";
import {
  MatFormFieldModule
} from "@angular/material/form-field";
import {
  MatInputModule
} from "@angular/material/input";
import {
  MatOptionModule
} from "@angular/material/core";
import {
  MatSelectChange,
  MatSelectModule
} from "@angular/material/select";
import {
  Campaign
} from "../models/campaign";
import {Town} from "../models/town";
import {
  AppService
} from "../app.service";
import { KeywordEnum } from '../models/keyword-enum';
import {
  CommonModule
} from "@angular/common";
import {Tag} from "../models/tag";
import {
  MatAutocompleteModule
} from "@angular/material/autocomplete";

@Component({
  selector: 'app-campaign-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  templateUrl: './campaign-edit.component.html',
  styleUrl: './campaign-edit.component.css'
})
export class CampaignEditComponent implements OnInit {
  @ViewChild("editForm") editForm!: NgForm;
  @Input() campaign: Campaign;

  @Output() editDataEvent = new EventEmitter();
  tag: KeywordEnum;
  constructor(private appService: AppService) {}

  ngOnInit()
  {
    this.tag = this.campaign.tags[0].keyword
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }


    this.appService.updateCampaignById(this.campaign.id, this.campaign).subscribe(
      (addedCampaign) => {
        console.log('Campaign updated:', addedCampaign);
        this.editDataEvent.emit(addedCampaign);
        this.editForm.resetForm();
      },
      (error) => {
        console.error('Error adding campaign:', error);
      }
    );
  }

  protected readonly KeywordEnum = KeywordEnum;
  protected readonly Object = Object;
}
