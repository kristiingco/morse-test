import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ButtonComponent } from './button/button.component';
import { MainTitleComponent } from './main-title/main-title.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    ButtonComponent,
    MainTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
