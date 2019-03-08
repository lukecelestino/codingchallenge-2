import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ThfModule } from '@totvs/thf-ui';
import { ThfPageLoginModule } from '@totvs/thf-templates/components/thf-page-login';
import { ThfI18nModule, ThfI18nConfig } from '@totvs/thf-ui/services/thf-i18n';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { InterceptorModule } from './interceptor/interceptor/interceptor.module';

import { LoginComponent } from './login/login.component';

import { LiteralsService } from './literals/literals.service';
import { generalPt } from './literals/general-pt';
import { generalEn } from './literals/general-en';
import { auctionsPt } from './literals/auctions.pt';
import { auctionsEn } from './literals/auctions-en';

const i18nConfig: ThfI18nConfig = {
  default: {
    language: 'pt-BR',
    context: 'general',
    cache: true
  },
  contexts: {
    general: {
      'pt-BR': generalPt,
      'en-US': generalEn,
    },
    auctions: {
      'pt-BR': auctionsPt,
      'en-US': auctionsEn,
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ThfModule,
    ThfI18nModule.config(i18nConfig),
    InterceptorModule,
    ThfPageLoginModule,
    HomeModule,
    SharedModule
  ],
  providers: [
    LiteralsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
