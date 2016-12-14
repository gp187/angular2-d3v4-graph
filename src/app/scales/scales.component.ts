import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {log} from "util";


@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.css']
})
export class ScalesComponent implements OnInit {


  title = 'app works! D3 v'+d3.version;

  ngOnInit() {
    // -->Find: linear scale between 2 numbers
    let linearScale = d3.scaleLinear().domain([0,100]).range([0,1]).clamp(true);
    log(linearScale(50).toString())

    // -->Find: time scale between 2 dates
    let timeScale = d3.scaleTime().domain([new Date(2016,0,1), new Date()]).range([0,100]);
    log(timeScale(new Date(2016,3, 15)).toString())
    log(timeScale.invert(50).toString());
    log('------');

    // -->Map: scale to colors
    let quantizeScale = d3.scaleQuantize().domain([0,100]).range(["red","white","green"]);
    log(quantizeScale(22));
    log(quantizeScale(50));
    log(quantizeScale(88));
    log(quantizeScale.invertExtent("white"));

    // -->Map: scale to colors
    let ordinalScale = d3.scaleOrdinal().domain(["poor","good","great"]).range(["red","white","green"]);
    log(ordinalScale("poor").toString());

  }

}
