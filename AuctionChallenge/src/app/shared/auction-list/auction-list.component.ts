import { Component, OnInit, Input } from '@angular/core';

import { LiteralsService } from './../../literals/literals.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  @Input('ended-list') endedAuctionList: Array<any>;

  public literals = {};

  constructor(private literalsService: LiteralsService) {
    this.literals = this.literalsService.getLiterals();
   }

  ngOnInit() {
  }

}
