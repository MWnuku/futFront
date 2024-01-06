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
  }

  ngOnInit() {}

  metoda(){
    this.appService.getAllCampaigns().subscribe({
      next: campaign => {
        console.log('The next value is: ', campaign);
        this.campaigns = campaign;
      },
      error: err => console.error('An error occurred :', err),
      complete: () => console.log('There are no more action happen.')
    });
  }
}
