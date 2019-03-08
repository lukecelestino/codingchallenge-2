import { MyAuctionsComponent } from './my-auctions.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const myAuctionsRoutes = [
    { path: 'my-auctions',  component: MyAuctionsComponent }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(myAuctionsRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class FeatureModule {}
