import { Component, OnInit } from '@angular/core';
import {log} from "util";
import * as d3 from 'd3';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // d3.csv('demo_data/names.csv', function (data) {
    //   log(data);
    // })
    // d3.tsv('demo_data/names.tsv', function (data) {
    //   log(data);
    // })
    d3.json('demo_data/names.json', function (data) {
        let min = d3.min(data,(d) => d.age);
        let max = d3.max(data,(d) => d.age);
        log(min+' >> '+max);

        let extent = d3.extent(data, (d) => d.age);
        log(extent.toString());

        // -->Scale: using min/max
        let scale = d3.scaleLinear().domain(extent).range([0,100])
        log(scale(24));

        // -->Unique: pull unique values
        let ages = d3.set(data, (d) => d.age);
        log(ages.values())
    })


  }

}
