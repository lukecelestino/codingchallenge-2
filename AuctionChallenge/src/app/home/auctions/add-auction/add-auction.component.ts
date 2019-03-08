import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ThfSelectOption, ThfNotificationService } from '@totvs/thf-ui';

import { LiteralsService } from './../../../literals/literals.service';
import { AuctionService } from './../auction.service';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent implements OnInit {

  public auctionForm: FormGroup;

  public auctionLiterals = {};
  public literals = {};

  public pageLabel: string;

  public bidOptions: Array<ThfSelectOption>;

  constructor(private auctionService: AuctionService,
              private literalsService: LiteralsService,
              private thfNotification: ThfNotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
                this.auctionLiterals = this.literalsService.getLiterals('auctions');
                this.literals = this.literalsService.getLiterals();
                this.createAuctionForm();
                this.pageLabel = this.auctionLiterals['addAuction'];
              }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.pageLabel = this.auctionLiterals['editAuction'];
      const auctionId = this.activatedRoute.snapshot.queryParams['id'];
      this.auctionService.allAuctions()
        .subscribe(response => {
          const auctionToEdit = response['auctions'].find(a => a._id === auctionId);
          this.auctionForm.setValue({
            name: auctionToEdit['name'],
            base_price: auctionToEdit['base_price'],
            bid_type: auctionToEdit['bid_type'],
            bid_step: auctionToEdit['bid_step'],
            photo: auctionToEdit['photo'],
          });
        });
    }

    this.bidOptions = [
      { value: 1, label: this.auctionLiterals['freeBid']},
      { value: 2, label: this.auctionLiterals['fixedBid']}
    ];
  }

  createAuctionForm() {
    this.auctionForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      base_price: ['', Validators.compose([Validators.required, Validators.min(0)])],
      bid_type: ['', Validators.compose([Validators.required])],
      bid_step: ['', Validators.compose([Validators.required, Validators.min(0)])],
      photo: ['', Validators.compose([Validators.required])]
    });
  }

  setBidStepValidator() {
    const bidStep = this.auctionForm.get('auctionBidStep');

    this.auctionForm.get('auctionBidType').valueChanges
      .subscribe(bidType => {
        if (bidType === '1') {
          bidStep.setValidators([Validators.required]);
        } else {
          bidStep.setValidators(null);
        }
      });
  }

  save() {
    if (this.auctionForm.valid) {
      const id = this.activatedRoute.snapshot.queryParams['id'];
      if (id) {
        this.auctionService.editAuction(id, this.auctionForm.value)
          .subscribe(response => {
            this.thfNotification.success('Editou com sucesso irmão');
            this.router.navigate(['/home/my-auctions']);
          });
      } else {
        this.auctionService.createAuction(this.auctionForm.value)
          .subscribe(response => {
            this.thfNotification.success('It´s tetra');
            this.router.navigate(['/home/my-auctions']);
          });
      }
    }
  }

  cancel() {
    this.auctionForm.reset();
  }
}
