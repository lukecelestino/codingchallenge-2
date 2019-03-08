import { LiteralsService } from './../../../literals/literals.service';
import { Component, OnInit } from '@angular/core';

import { AuctionService } from './../auction.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-open-auctions',
  templateUrl: './open-auctions.component.html',
  styleUrls: ['./open-auctions.component.css']
})
export class OpenAuctionsComponent implements OnInit {

  public auctionLiterals = {};

  public otherUsersAuctions;
  private myAuctions;

  public auctionParticipations: number = 0;
  public bidsMade: number = 0;
  public auctionsWon: number = 0;
  public cashOnBids: number = 0;
  public auctionBalance: number = 0;
  public labelAuctionBalance: number = 0;

  public balanceLabel: string;

  private user: string = localStorage.getItem('user');

  constructor(private auctionService: AuctionService,
              private literalsService: LiteralsService) { }

  ngOnInit() {
    this.auctionLiterals = this.literalsService.getLiterals('auctions');
    this.getAllAuctions();
  }

  getAllAuctions() {
    this.auctionService.allAuctions()
    .subscribe(response => {

      this.myAuctions = response['auctions'].filter(r => r.owner === localStorage.getItem('user'));

      this.otherUsersAuctions =  response['auctions'].filter(a => a.owner !== localStorage.getItem('user') && a.status === 1);

      this.getAuctionParticipations();
      this.getBidsMade();
      this.getAuctionsWon();
      this.getCashOnBids();
    });
  }

  getAuctionParticipations() {
    this.otherUsersAuctions.forEach(auction => {
      const isParticipation = auction.bids.findIndex(bid => this.user === bid.email);
      if (isParticipation !== -1) {
        this.auctionParticipations++;
      }
    });
  }

  getBidsMade() {
    this.otherUsersAuctions.forEach(auction => {
      auction.bids.forEach(bid => {
        if (this.user === bid.email) {
          this.bidsMade++;
        }
      });
    });
  }

  getAuctionsWon() {
    this.otherUsersAuctions.forEach(auction => {
      if (auction.bids[auction.bids.length - 1].email === this.user) {
        this.auctionsWon++;
        this.auctionBalance += auction.base_price - auction.bids[auction.bids.length - 1].value;
      }
    });
    this.labelAuctionBalance = Math.abs(this.auctionBalance);
  }

  getCashOnBids() {
    this.otherUsersAuctions.forEach(auction => {
      auction.bids.forEach(bid => {
        if (this.user === bid.email) {
          this.cashOnBids += bid.value;
        }
      });
    });
  }

  getBalanceStatus() {
    if (this.auctionBalance >= 0) {
      this.balanceLabel = this.auctionLiterals['moneyInProfit'];
      return 'success';
    } else {
      this.balanceLabel = this.auctionLiterals['moneyInLoss'];
      return 'danger';
    }
  }

  updateScreen() {
    this.getAllAuctions();
  }

}
