import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const margin = { top: 10, right: 20, left: 40, bottom: 50 }
    const width = 425 - margin.left - margin.right;
    const height = 625 - margin.top - margin.bottom;

    function responsify(chart) {
      const container = d3.select(chart.node().parentNode),
        w = parseInt(chart.style('width'), 10),
        h = parseInt(chart.style('height'), 10),
        aspect = w / h;

      chart.attr('viewBox', '0 0 ' + w + ' ' + h)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

      d3.select(window).on('resize.' + container.attr('id'), resize);

      function resize() {
        const targetWidth = parseInt(container.style('width'), 10);
        chart.attr('width', targetWidth);
        chart.attr('height', Math.round(targetWidth / aspect));
      }
    }

    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(responsify)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    d3.json('demo_data/stocks.json', function (err, data: any) {

      const parseTime = d3.timeParse('%Y/%m/%d');
      data.forEach(company => {
        company.values.forEach(d => {
          d.date = parseTime(d.date);
          d.close = +d.close;
        });
      });

      const xScale = d3.scaleTime()
        .domain([
          +d3.min(data, (co: any) => d3.min(co.values, (d: any) => d.date)),
          +d3.max(data, (co: any) => d3.max(co.values, (d: any) => d.date))
        ])
        .range([0, width]);
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5));

      const yScale = d3.scaleLinear()
        .domain([
          +d3.min(data, (co: any) => d3.min(co.values, (d: any) => d.close)),
          +d3.max(data, (co: any) => d3.max(co.values, (d: any) => d.close))
        ])
        .range([height, 0])
      svg
        .append('g')
        .call(d3.axisLeft(yScale));

      const line = d3.line()
        .x((d: any) => xScale(d.date))
        .y((d: any) => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.1));

      svg.selectAll('.line')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('d', (d: any) => line(d.values))
        .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('stroke-width', 2)
        .style('fill', 'none')

    })
  }

}
