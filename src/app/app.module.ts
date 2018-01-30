import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AnimateComponent } from './animate/animate.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { AreaComponent } from './area/area.component';
import { AxesComponent } from './axes/axes.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { GeneralUpdatePatternComponent } from './general-update-pattern/general-update-pattern.component';
import { HeaderComponent } from './header/header.component';
import { LineComponent } from './line/line.component';
import { ScalesComponent } from './scales/scales.component';
import { ScatterComponent } from './scatter/scatter.component';
import { SelectionsComponent } from './selections/selections.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { VisualizationComponent } from './visualization/visualization.component';

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
    GeneralUpdatePatternComponent,
    HeaderComponent,
    DashboardComponent
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
