import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MyAuctionsComponent } from './auctions/my-auctions/my-auctions.component';
import { OpenAuctionsComponent } from './auctions/open-auctions/open-auctions.component';
import { AddAuctionComponent } from './auctions/add-auction/add-auction.component';

const homeRoutes = [
    {path: 'home', component: HomeComponent, children: [
        {path: 'my-auctions', component: MyAuctionsComponent},
        {path: 'add-auction', component: AddAuctionComponent},
        {path: 'open-auctions', component: OpenAuctionsComponent},
    ]},
    { path: '', component: HomeComponent}
];

@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forChild(homeRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class HomeRoutingModule {}
