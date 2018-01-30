import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { log } from 'util';

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
    d3.json('../demo_data/names.json', function (data) {
      const min = d3.min(data, (d: any) => d.age);
      const max = d3.max(data, (d: any) => d.age);
      log(min + ' >> ' + max);

      const extent = d3.extent(data, (d: any) => +d.age);
      log(extent.toString());

      // -->Scale: using min/max
      const scale = d3.scaleLinear().domain(extent).range([0, 100])
      log(scale(24));

      // -->Unique: pull unique values
      const ages = d3.set(data, (d: any) => d.age);
      log(ages.values())
    })

  }

}
