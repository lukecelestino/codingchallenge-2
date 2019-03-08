import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThfModule } from '@totvs/thf-ui';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { MyAuctionsComponent } from './auctions/my-auctions/my-auctions.component';
import { AddAuctionComponent } from './auctions/add-auction/add-auction.component';
import { OpenAuctionsComponent } from './auctions/open-auctions/open-auctions.component';

import { AuctionService } from './auctions/auction.service';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ThfModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        AddAuctionComponent,
        MyAuctionsComponent,
        OpenAuctionsComponent,
    ],
    providers: [
        AuctionService
    ],
})
export class HomeModule {}
