import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-axes',
  templateUrl: './axes.component.html',
  styleUrls: ['./axes.component.css']
})
export class AxesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      let data = [
        {score: 63, subject: "Math"},
        {score: 33, subject: "Geography"},
        {score: 91, subject: "Spelling"},
        {score: 21, subject: "Reading"},
        {score: 12, subject: "Science"},
        {score: 48, subject: "Doing"},
        {score: 88, subject: "Thinking"},
        {score: 92, subject: "Waling"},
      ]

      let margin = { top: 10, right: 20, left: 40, bottom: 50}
      let width = 425 - margin.left - margin.right;
      let height = 625 - margin.top - margin.bottom;

      let fullWidth = width + margin.left + margin.right;
      let fullHeight = height + margin.top + margin.bottom;


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
          // .attr('viewBox', `0 0 ${fullWidth * 2} ${fullHeight * 2}`) // automatic responsive svg
        .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)


      // svg.append('rect')
      //   .attr('width', width)
      //   // .attr('width', width/2)
      //   .attr('height', height)
      //   .style('fill', 'lightblue')
      //   .style('stroke','green')
      //
      // svg.append('rect')
      //   .attr('x', width /2 )
      //   .attr('width', width /2 )
      //   .attr('height', height)
      //   .style('fill', 'lightblue')
      //   .style('stroke','green')

      // -->Generate: scales [from,to] where you want
      let yScale = d3.scaleLinear()
        .domain([0,100])
        .range([height, 0]);
      let yAxes = d3.axisLeft(yScale)
        //.ticks(5)
        //.tickValues([8,19,25,77,100])
      svg.call(yAxes);

      // -->Generate: time scale for X
      // let xScale = d3.scaleTime()
      //   .domain([new Date(2016,0,1,6), new Date(2016,0,1,9)]).range([0, width])

      // -->ScaleBand: specially used for bar charts
      let xScale = d3.scaleBand()
        // .paddingInner(0.2)
        // .paddingOuter(0.5)
        .padding(0.2)
        // .align(0)
        .domain(data.map(d => d.subject)).range([0, width])



      let xAxis = d3.axisBottom(xScale)
        .ticks(5).tickSize(10).tickPadding(15)
        //.ticks(d3.timeMinute.every(45))

      svg
        .append('g')
          .attr('transform',`translate(0, ${height})`)
        .call(xAxis)
        .selectAll('text')
          .style('text-anchor','end')
          .style('transform', 'rotate(-45deg)')


      // ******************************************************
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
          .attr('x', d => xScale(d.subject))
          .attr('y', d => yScale(d.score))
          .attr('width', xScale.bandwidth())
          .attr('height', d => height - yScale(d.score))
        .style("fill","steelblue")

  }

}
