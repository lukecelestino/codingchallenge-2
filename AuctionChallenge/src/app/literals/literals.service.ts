import { Injectable } from '@angular/core';
import { ThfI18nService } from '@totvs/thf-ui';

@Injectable()
export class LiteralsService {

    private language = navigator.language;
    private literals = {};
    private auctionLiterals = {};

    constructor(private thfI18nService: ThfI18nService) {
        thfI18nService.getLiterals({language: this.language})
            .subscribe(literals => this.literals = literals);

        thfI18nService.getLiterals({language: this.language, context: 'auctions'})
            .subscribe(auctionLiterals => this.auctionLiterals = auctionLiterals);
    }

    getLiterals(context?: string) {
        return context === 'auctions' ? this.auctionLiterals : this.literals;
    }
}
