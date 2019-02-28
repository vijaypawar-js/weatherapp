import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { WeathermaterialModule } from "../weathermaterial/weathermaterial.module";
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { WeatherService } from "../weather.service";

import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    HttpClientModule,
    WeathermaterialModule,
    LayoutModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
