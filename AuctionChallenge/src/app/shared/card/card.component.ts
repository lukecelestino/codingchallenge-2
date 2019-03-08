import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';

import * as countdown from 'countdown';

import { CardService } from './card.service';
import { LiteralsService } from './../../literals/literals.service';
import { ThfModalAction, ThfModalComponent, ThfNotificationService } from '@totvs/thf-ui';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input('auction-info') auctionInfo;
  @Output('a-screen') updateAuctionsScreen = new EventEmitter();

  @ViewChild('confirmBid') confirmBidModal: ThfModalComponent;

  public literals = {};

  public endAuctionDate = '';
  public currentUser = localStorage.getItem('user');

  public confirmBidAction: ThfModalAction;
  public cancelBidAction: ThfModalAction;
  public bidValue: number;

  public currentValue: string;
  public currentWinner: string;

  constructor(private cardService: CardService,
              private literalsService: LiteralsService,
              private thfNotification: ThfNotificationService,
              private router: Router) {
    this.literals = this.literalsService.getLiterals();
  }

  ngOnInit() {
    countdown.setLabels(
      ' milissegundo| segundo| minuto| hora| dia| semana| mês| ano| década| século| milênio',
      ' milissegundos| segundos| minutos| horas| dias| semanas| meses| anos| décadas| séculos| milênios',
      ' e ',
      ', ',
      'agora');

    this.confirmBidAction = {
      action: () => {
        this.makeABid();
      },
      label: 'Confirmar'
    };

    this.cancelBidAction = {
      action: () => {
        this.confirmBidModal.close();
      },
      label: 'Cancelar'
    };

    const bidsLength = this.auctionInfo.bids.length;
    this.bidValue = this.auctionInfo.bid_step + (bidsLength ? this.auctionInfo.bids[bidsLength - 1].value : 0);
}

  ngOnChanges() {
    if (this.auctionInfo) {
      const bidType = this.auctionInfo.bid_type === 1 ? 'Lance livre' : 'Lance fixado: ';
      const bidStep = this.auctionInfo.bid_type === 1 ? '' : `R$ ${this.auctionInfo.bid_step.toFixed(2)}`;
      this.auctionInfo.bid = `${bidType}${bidStep}`;

      if (this.auctionInfo.status === 1) {
        setInterval(() => {
          this.endAuctionDate = countdown(new Date(this.auctionInfo.expiration_date)).toString();

        }, 1000);
      }

      const bidsQuantity = this.auctionInfo.bids.length;

      this.auctionInfo.labelPrice = `R$ ${this.auctionInfo.base_price.toFixed(2)}`;
      this.currentValue = bidsQuantity ? this.auctionInfo.bids[bidsQuantity - 1].value.toFixed(2)  : '-';
      this.currentWinner = bidsQuantity ? this.auctionInfo.bids[bidsQuantity - 1].email : 'R$ 0,00';
    }
  }

  editAuction() {
    this.router.navigate(['/home/add-auction'], {queryParams: {id: this.auctionInfo._id}});
  }

  activateAuction(auctionId: string) {
    const statusPayLoad = {
      status: '1'
    };

    this.cardService.startAuction(auctionId, statusPayLoad)
      .subscribe(response => {
        console.log(response);
        this.thfNotification.success('COMEÇOU!!!!!!!!');
        this.updateAuctionsScreen.emit({update: true});
      });
  }

  deleteAuction(auctionId: string) {
    this.cardService.removeAuction(auctionId)
      .subscribe(response => {
        console.log(response);
        this.updateAuctionsScreen.emit({update: true});
      });
  }

  makeABid() {
    const bidsLength = this.auctionInfo.bids.length;
    const currentValue =  bidsLength ? this.auctionInfo.bids[bidsLength - 1].value : 0;
    if (this.bidValue <= currentValue) {
      this.thfNotification.error('Ta tirando?');
    } else {
      const bidPayload = {
        bid_value: this.bidValue
      };

      this.cardService.addBid(this.auctionInfo._id, bidPayload)
      .subscribe(response => {
        console.log(response);
        this.thfNotification.success('Deu boa, tá contigo');
        this.confirmBidModal.close();
        this.updateAuctionsScreen.emit({update: true});
      });
    }
  }
}
