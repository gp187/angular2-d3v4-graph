import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-transitions',
  templateUrl: './transitions.component.html',
  styleUrls: ['./transitions.component.css']
})
export class TransitionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  go(): void {
    const t = d3.transition(null)
      .delay(1000)
      .duration(1000)
    d3.selectAll('.block')
      .transition(t)
      .style('width', '400px')

    d3.select('.a')
      .transition(t)
      .style('background-color', 'blue')

    d3.select('.b')
      .transition(t)
      .style('background-color', 'red')
  }

  configure(t: any, delay: number, duration: number): any {
    return t.delay(delay).duration(duration);
  }

  goNow(): void {
    d3.selectAll('.block')
      .transition()
      .call(this.configure, 1000, 1000)
      .style('height', '300px')
  }

}
