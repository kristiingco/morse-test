import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { InputInstructionsComponent } from './input-instructions/input-instructions.component';


const routes: Routes = [
  { path: '', component: StartScreenComponent},
  { path: 'about', component: AboutComponent },
  { path: 'input-instructions', component: InputInstructionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
