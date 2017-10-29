import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

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

    d3.json('../demo_data/country.json', function (err, data: any) {
      // -->Generate: scales [from,to] where you want
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, (d: any) => +d.expectancy))
        .range([height, 0])
        .nice();
      const yAxes = d3.axisLeft(yScale)
      svg.call(yAxes);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, (d: any) => +d.cost))
        .range([0, width])
        .nice();
      const xAxes = d3
        .axisBottom(xScale)
        .ticks(5)

      svg.append('g')
        .attr('transform', `translate(0, ${height})`) // set to bottom
        .call(xAxes)

      const rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, (d: any) => +d.population)])
        .range([0, 40]);

      // svg.selectAll("circle")
      //   .data(data)
      //   .enter()
      //   .append('circle')
      //     .attr('cx', d => xScale(d.cost))
      //     .attr('cy', d => yScale(d.expectancy))
      //     .attr('r', d => rScale(d.population))
      //   .style('fill-opacity', 0.5)
      //   .style('fill', 'steelblue')

      // -->G: make all the circle containors within graphic containors to separate
      const circles = svg.selectAll('.ball')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'ball')
        .attr('transform', (d: any) => {
          return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`
        });

      circles
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', (d: any) => rScale(d.population))
        .style('fill-opacity', 0.5)
        .style('fill', 'steelblue')

      circles
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('y', 4)
        .text((d: any) => d.code)
    })

  }

}
