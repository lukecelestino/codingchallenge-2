import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private urlAuctions: string = 'http://10.171.67.175:17114/api/v1/auctions/';

  constructor(private http: HttpClient) { }

  createHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
  }

  startAuction(auctionId: string, statusLoad) {
    const httpOptions = this.createHeader();
    return this.http.put(`${this.urlAuctions}${auctionId}/status`, statusLoad, httpOptions);
  }

  removeAuction(auctionId: string) {
    const httpOptions = this.createHeader();
    return this.http.delete(`${this.urlAuctions}${auctionId}`, httpOptions);
  }

  addBid(auctionId: string, bidLoad) {
    const httpOptions = this.createHeader();
    return this.http.post(`${this.urlAuctions}${auctionId}/bids`, bidLoad, httpOptions);
  }
}
