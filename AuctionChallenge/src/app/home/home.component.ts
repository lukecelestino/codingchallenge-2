import { LiteralsService } from './../literals/literals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public auctionLiterals = {};
  public literals = {};

  public auctionMenus = [];

  constructor(private literalsService: LiteralsService) {
    this.literals = this.literalsService.getLiterals();
    this.auctionLiterals =  this.literalsService.getLiterals('auctions');
   }

  ngOnInit() {
    this.auctionMenus = [
      { label: this.auctionLiterals['myAuctions'], link: '/home/my-auctions', icon: 'thf-icon-wallet' },
      { label: this.auctionLiterals['addAuction'], link: '/home/add-auction', icon: 'thf-icon-like' },
      { label: this.auctionLiterals['openAuctions'], link: '/home/open-auctions', icon: 'thf-icon-cart' }
    ];
  }
}
