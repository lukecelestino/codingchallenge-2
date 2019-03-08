import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThfModule } from '@totvs/thf-ui';

import { CardComponent } from './card/card.component';
import { AuctionListComponent } from './auction-list/auction-list.component';

import { CardService } from './card/card.service';

@NgModule({
  declarations: [
    CardComponent,
    AuctionListComponent
  ],
  imports: [
    CommonModule,
    ThfModule,
    FormsModule
  ],
  exports: [
    CardComponent,
    AuctionListComponent
  ],
  providers : [
    CardService
  ]
})
export class SharedModule { }
