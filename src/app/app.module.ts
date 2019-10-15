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
import { InputInstructionsComponent } from './input-instructions/input-instructions.component';
import { TestInputComponent } from './test-input/test-input.component';
import { InputItemComponent } from './input-item/input-item.component';
import { VisualInstructionsComponent } from './visual-instructions/visual-instructions.component';
import { TestVisualComponent } from './test-visual/test-visual.component';
import { VisualItemComponent } from './visual-item/visual-item.component';
import { AudioInstructionsComponent } from './audio-instructions/audio-instructions.component';
import { TestAudioComponent } from './test-audio/test-audio.component';
import { AudioItemComponent } from './audio-item/audio-item.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    InputInstructionsComponent,
    TestInputComponent,
    InputItemComponent,
    VisualInstructionsComponent,
    TestVisualComponent,
    VisualItemComponent,
    AudioInstructionsComponent,
    TestAudioComponent,
    AudioItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
