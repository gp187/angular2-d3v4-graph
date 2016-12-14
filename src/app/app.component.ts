import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {log} from "util";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  directives: [HeaderComponent]
})
export class AppComponent implements OnInit{
  title = 'Loaded D3 v'+d3.version;

  ngOnInit() {

  }
}
