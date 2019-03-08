import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private urlAuctions: string = 'http://10.171.67.175:17114/api/v1/auctions';

  constructor(private http: HttpClient) { }

  createHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
    };
  }

  allAuctions() {
    const httpOptions = this.createHeader();
    const httpParams = { pageSize: 1000 };
    return this.http.get(`${this.urlAuctions}?pageSize=100`, httpOptions);
  }

  createAuction(auctionBody) {
    const httpOptions = this.createHeader();
    return this.http.post(this.urlAuctions, auctionBody, httpOptions);
  }

  editAuction(auctionId, auctionBody) {
    const httpOptions = this.createHeader();
    return this.http.put(`${this.urlAuctions}/${auctionId}`, auctionBody, httpOptions);
  }
}
