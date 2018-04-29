import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { DiceComponent } from './main/dice/dice/dice.component';
import {DiceService} from './main/dice/dice.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    DiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
