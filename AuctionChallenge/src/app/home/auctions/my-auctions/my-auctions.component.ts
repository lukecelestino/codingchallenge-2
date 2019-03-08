import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ThfPageAction } from '@totvs/thf-ui';

import { LiteralsService } from './../../../literals/literals.service';
import { AuctionService } from '../../auctions/auction.service';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.css']
})
export class MyAuctionsComponent implements OnInit {

  public auctionLiterals = {};
  public literals = {};

  public sketchAuctions: Array<any>;
  public progressAuctions: Array<any>;
  public expiredAuctions: Array<any>;

  public myAuctionsActions: Array<ThfPageAction>;

  constructor(
    private literalsService: LiteralsService,
    private router: Router,
    private auctionService: AuctionService
    ) {
    this.auctionLiterals = this.literalsService.getLiterals('auctions');
    this.literals = this.literalsService.getLiterals();
  }

  ngOnInit() {
    this.myAuctionsActions = [
      {label: this.literals['add'], action: () => this.router.navigate(['/home/add-auction']), icon: 'thf-icon-plus'}
    ];

    this.getMyAuctions();
  }
  getMyAuctions() {
    this.auctionService.allAuctions()
      .subscribe(response => {
        response['auctions'] = response['auctions'].filter(r => r.owner === localStorage.getItem('user'));

        this.sketchAuctions = response['auctions'].filter(a => a.status === 0);

        this.progressAuctions =  response['auctions'].filter(a => a.status === 1);

        const today = new Date();
        this.expiredAuctions = response['auctions'].filter(a => a.expiration_date < today);
      });
  }

  updateScreen() {
    this.getMyAuctions();
  }

}
