import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-general-update-pattern',
  templateUrl: './general-update-pattern.component.html',
  styleUrls: ['./general-update-pattern.component.css']
})
export class GeneralUpdatePatternComponent implements OnInit {
  public svg;
  public data;
  public opts = {};
  public xScale;
  public yScale;
  constructor() { }

  ngOnInit() {
    this.data = [
      {name: 'Alice', math: 37,   science: 62,   language: 54},
      {name: 'Billy', math: null, science: 34,   language: 85},
      {name: 'Cindy', math: 86,   science: 48,   language: null},
      {name: 'David', math: 44,   science: null, language: 65},
      {name: 'Emily', math: 59,   science: 73,   language: 29}
    ];
    this.opts = {margin : { top: 10, right: 10, bottom: 30, left: 30 }}
    this.opts.width = 400 - this.opts.margin.left - this.opts.margin.right,
    this.opts.height = 535 - this.opts.margin.top - this.opts.margin.bottom



    function responsify(svg) {
      let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

      svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio","xMinYMid")
        .call(resize);

      d3.select(window).on("resize." + container.attr("id"), resize);

      function resize() {
        let targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
      }
    }


    this.svg = d3.select('.chart')
      .append('svg')
      .attr('width', this.opts.width + this.opts.margin.left + this.opts.margin.right)
      .attr('height', this.opts.height + this.opts.margin.top + this.opts.margin.bottom)
      .call(responsify)
      .append('g')
      .attr('transform', `translate(${this.opts.margin.left}, ${this.opts.margin.top})`);

    this.xScale = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([0, this.opts.width])
      .padding(0.2);
    this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.opts.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([this.opts.height, 0]);
    this.svg
      .append('g')
      .call(d3.axisLeft(this.yScale));


    // ******************************************************


  }

  render(subject='math'): void {
    let t = d3.transition().duration(1000);

    let update = this.svg.selectAll('rect')
      .data(this.data.filter(d => d[subject]), d => d.name);

    update
      .exit()
      .transition(t)
        .attr('y', this.opts.height)
        .attr('height', 0)
      .remove();

    update
      .transition(t)
      .delay(1000)
      .attr('y', d => this.yScale(d[subject]))
      .attr('height', d => this.opts.height - this.yScale(d[subject]))

    let enter = update
      .enter()
      .append('rect')
        .attr('y', this.opts.height)
        .attr('height', 0)
        .attr('x', d => this.xScale(d.name))
        .attr('width', d => this.xScale.bandwidth())
      .transition(t)
        .delay(2000)
        .attr('y', d => this.yScale(d[subject]))
        .attr('height', d => this.opts.height - this.yScale(d[subject]))
  }



}
