import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProblemeData } from './probleme/probleme-data';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    //HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 }) TP23

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
