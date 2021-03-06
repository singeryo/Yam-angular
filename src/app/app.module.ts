import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { DiceComponent } from './main/dice/dice/dice.component';
import {DiceService} from './main/services/dice.service'
import { GameComponent } from './main/game/game.component';
import {GameService} from './main/services/game.service';
import {RulesService} from './main/services/rules.service';
import {TurnService} from './main/services/turn.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    DiceComponent,
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DiceService, GameService, RulesService, TurnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
