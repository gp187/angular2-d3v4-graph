import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css']
})
export class AnimateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      d3
        .select('#block')
          .transition()
          .duration(500)
          .delay(500)
          .ease(d3.easeElasticOut)
        .style('width', '400px')
          .transition()
          .duration(500)
          .ease(d3.easeElasticOut)
        .style('height', '400px')
          .transition()
          .duration(500)
          .ease(d3.easeQuadOut)
        .style('background-color', 'purple')
  }

}
