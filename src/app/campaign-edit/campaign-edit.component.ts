import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators
} from '@angular/forms';
import {
  KeywordEnum
} from '../models/keyword-enum';
import {
  AppService
} from '../app.service';
import {
  Campaign
} from '../models/campaign';
import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import {
  MatInputModule
} from "@angular/material/input";
import {
  MatSelectModule
} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {
  AppComponent
} from "../app.component";

@Component({
  selector: 'app-campaign-edit',
  standalone: true,
  templateUrl: './campaign-edit.component.html',
  imports: [
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgForOf
  ],
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: FormGroup;
  @Input() campaign: Campaign;
  @Output() editDataEvent = new EventEmitter();
  tag: KeywordEnum;
  filteredTags: KeywordEnum[];
  availableTags: KeywordEnum[] = Object.values(KeywordEnum);

  constructor(private formBuilder: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    // Initialize the form with default values
    this.editForm = this.formBuilder.group({
      name: [this.campaign.name, Validators.required],
      tags: [this.tag],
      // Add other form controls here and initialize them with default values
      status: [this.campaign.status],
      town: [this.campaign.town],
      radius: [this.campaign.radius],
      bidAmount: [this.campaign.bidAmount],
      // Add more form controls as needed
    });

    this.tag = this.campaign.tags[0].keyword;
    this.filteredTags = this.availableTags.slice();
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    // Retrieve form values
    const formValues = this.editForm.value;

    // Update campaign object with form values
    this.campaign.name = formValues.name;
    this.campaign.tags[0].keyword = formValues.tags;
    this.campaign.status = formValues.status;
    this.campaign.town = formValues.town;
    this.campaign.radius = formValues.radius;
    this.campaign.bidAmount = formValues.bidAmount;

    // Update the rest of the form fields as needed

    this.appService.updateCampaignById(this.campaign.id, this.campaign).subscribe(
      (addedCampaign) => {
        console.log('Campaign updated:', addedCampaign);
        this.editDataEvent.emit(addedCampaign);
        this.editForm.reset(); // Reset the form
      },
      (error) => {
        console.error('Error updating campaign:', error);
      }
    );
  }

  displayTag(keyword: KeywordEnum): string {
    return keyword ? keyword : '';
  }

  private _filter(value: string): KeywordEnum[] {
    const filterValue = value.toLowerCase();
    return this.availableTags.filter(keyword => keyword.toLowerCase().includes(filterValue));
  }
}
