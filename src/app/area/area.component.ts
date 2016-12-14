import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let margin = { top: 10, right: 20, left: 40, bottom: 50}
    let width = 425 - margin.left - margin.right;
    let height = 625 - margin.top - margin.bottom;

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


    let svg = d3.select('.chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(responsify)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    d3.json('demo_data/stocks.json', function (err,data) {

      let parseTime = d3.timeParse('%Y/%m/%d');
      data.forEach(company => {
        company.values.forEach(d => {
          d.date = parseTime(d.date);
          d.close = +d.close;
        });
      });

      let xScale = d3.scaleTime()
        .domain([
          d3.min(data, co => d3.min(co.values, d => d.date)),
          d3.max(data, co => d3.max(co.values, d => d.date))
        ])
        .range([0, width]);
      svg
        .append('g')
          .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5));

      let yScale = d3.scaleLinear()
        .domain([
          d3.min(data, co => d3.min(co.values, d => d.close)),
          d3.max(data, co => d3.max(co.values, d => d.close))
        ])
        .range([height, 0])
      svg
        .append('g')
        .call(d3.axisLeft(yScale));

      // *******************
      // Until here is identical to line chart.
      // *******************

      let area = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0])) // pass the bottom of the scale, the 0 val
        .y1(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5))
      svg
        .selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class','area')
        .attr('d',d => area(d.values))
        .style('stroke', (d,i) => ['#FF9900','#3369E8'][i])
        .style('stroke-width', 2)
        .style('fill', (d,i) => ['#FF9900','#3369E8'][i])
        .style('fill-opacity',0.5)


    })
  }


}
