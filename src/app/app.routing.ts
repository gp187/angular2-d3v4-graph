import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { ScalesComponent }              from "./scales/scales.component";
import { DataComponent }                from "./data/data.component";
import { SelectionsComponent }          from "./selections/selections.component";
import { VisualizationComponent }       from "./visualization/visualization.component";
import { AxesComponent }                from "./axes/axes.component";
import { ScatterComponent }             from "./scatter/scatter.component";
import { LineComponent }                from "./line/line.component";
import {AreaComponent}                  from "./area/area.component";
import {AnimateComponent}               from "./animate/animate.component";
import {TransitionsComponent}           from "./transitions/transitions.component";
import {GeneralUpdatePatternComponent}  from "./general-update-pattern/general-update-pattern.component";
import {DashboardComponent} from "./Dashboard/dashboard.component";

export const routes: Routes = [
    {

        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
      path: 'dashboard',
      pathMatch: 'full',
      component: DashboardComponent
    },
    {
      path: 'scales',
      component: ScalesComponent
    },
    {
      path: 'data',
      component: DataComponent
    },
    {
      path: 'selections',
      component: SelectionsComponent
    },
    {
      path: 'visualization',
      component: VisualizationComponent
    },
    {
      path: 'axes',
      component: AxesComponent
    },
    {
      path: 'scatter',
      component: ScatterComponent
    },
    {
      path: 'line',
      component: LineComponent
    },
    {
      path: 'area',
      component: AreaComponent
    },
    {
      path: 'animate',
      component: AnimateComponent
    },
    {
      path: 'transitions',
      component: TransitionsComponent
    },
    {
      path: 'general',
      component: GeneralUpdatePatternComponent
    }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
