import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign } from './models/campaign';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly url = 'http://localhost:8080/campaign'

  constructor(private http: HttpClient) { }


  getAllCampaigns(){
    return this.http.get<Campaign[]>(this.url);
  }

  getCampaignById(id: number){
    const campaignUrl = `${this.url}/%{id}`;
    return this.http.get<Campaign>(campaignUrl);
  }

  addCampaign(campaign: Campaign) {
    const campaignUrl = `${this.url}/add`;
    return this.http.post<Campaign>(campaignUrl, campaign);
  }
}
