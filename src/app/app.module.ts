import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScalesComponent } from './scales/scales.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing";
import { DataComponent } from './data/data.component';
import { SelectionsComponent } from './selections/selections.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { AxesComponent } from './axes/axes.component';
import { ScatterComponent } from './scatter/scatter.component';
import { LineComponent } from './line/line.component';
import { AreaComponent } from './area/area.component';
import { AnimateComponent } from './animate/animate.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { GeneralUpdatePatternComponent } from './general-update-pattern/general-update-pattern.component';

@NgModule({
  declarations: [
    AppComponent,
    ScalesComponent,
    DataComponent,
    SelectionsComponent,
    VisualizationComponent,
    AxesComponent,
    ScatterComponent,
    LineComponent,
    AreaComponent,
    AnimateComponent,
    TransitionsComponent,
    GeneralUpdatePatternComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
