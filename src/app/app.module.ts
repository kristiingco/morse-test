import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ButtonComponent } from './button/button.component';
import { MainTitleComponent } from './main-title/main-title.component';
import { AboutComponent } from './about/about.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { InfoContentComponent } from './info-content/info-content.component';
import { InstructionsComponent } from './instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    ButtonComponent,
    MainTitleComponent,
    AboutComponent,
    HeaderTitleComponent,
    InfoContentComponent,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
