import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      let scores: Array<any> = [
        {name: "Alice", score: 96},
        {name: "Billy", score: 88},
        {name: "Cindy", score: 21},
        {name: "Emily", score: 91},
        {name: "David", score: 33},
        {name: "Trump", score: 65},
      ];
      // *************************
      // USING CSS
      // *************************

      // // -->Match: DOM elements with data and correlate
      // let update = d3.select('.chart').selectAll('div').data(scores, (d) => d ? d.name : this.innerText).style('color','blue');
      // // -->Update: this method handles the matching process
      // let enter = update.enter().append('div').text((d) => d.name).style('color','green')
      // // -->Exist: this method handles the exit stage of matching
      // let exit = update.exit().remove();
      //
      // // -->Merge: 2 selections
      // update.merge(enter)
      //   .style('width', (d) => d.score+'px')
      //   .style('height','50px')
      //   .style('background','black')

      // *************************
      // USING SVG
      // *************************
      // -->Do: all in a single step (same thing)
      let bar = d3.select('.chart')
        .append('svg')
          .attr("width", 225)
          .attr("height", 300)
        .selectAll('g')
        .data(scores)
        .enter()
          .append('g')
          .attr('transform', (d,i) => 'translate(0, '+i * 33+')')


      function scaleBar(selection, scale) {
        selection.style('transform','scaleX('+scale+')');
      }
      function setFill(selection, color) {
        selection.style('fill', color)
      }
      function fade(selection, opacity) {
        selection.style('fill-opacity', 0.5)
      }


      bar.append('rect')
          .style('width',(d) => d.score)
          .style('height',30)
          .style('fill',"lightgreen")
          .attr('class','bar')
  // -->Simple: class attribution
        // .on('mouseover', function(){
        //     d3.select(this).classed("barOn",true)
        // })
        // .on('mouseout', function(){
        //   d3.select(this).classed("barOn",false)
        // })
  // -->Simple: sexy scale and hover
  //       .on('mouseover', function(d,i,elements){
  //         d3.select(this).style('transform','scaleX(2)')
  //         d3.selectAll(elements)
  //           .filter(':not(:hover)')
  //           .style('fill-opacity', 0.5)
  //       })
  //       .on('mouseout', function(d,i, elements){
  //         d3.select(this).style('transform','scaleX(1)')
  //         d3.selectAll(elements)
  //           .style('fill-opacity', 1)
  //       })
  // -->Code: better code structure
        .on('mouseover', function(d,i,elements){
          d3.select(this).call(scaleBar, 2).call(setFill, 'teal')
          d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 0.5)
        })
        .on('mouseout', function(d,i, elements){
          d3.select(this).call(scaleBar, 1).call(setFill, 'lightgreen')
          d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 1)
        })


      bar.append('text')
        .attr('y', 20)
        .text((d) => d.name)
  }

}
