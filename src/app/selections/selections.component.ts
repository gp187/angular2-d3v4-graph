import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {log} from "util";

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // -->Selecting: same as css
      let div = d3.selectAll('div');
      console.log(div.nodes());

      let divLinks = div.selectAll('a');
      console.log(divLinks.nodes());

      console.log(d3.selectAll('div.title a').nodes());

      // -->Modifying: selected links
      let secondLink = d3.selectAll('a:nth-child(2)');
      secondLink.attr('href','http://google.com');
      console.log(secondLink.nodes());
      console.log(secondLink.attr('href'));

      secondLink.style('color','red'); // change style
      secondLink.classed('red',true); // change class
      secondLink.text('Inventory <b>SALE</b>'); // change text
      secondLink.html('Inventory <b>SALE</b>'); // change text


      // -->Create: DOM elements
      d3.select('.title').append('button').style('color','red').html('Inventory2')
      d3.select('.title').insert('button','a:first-child').html('Inventory3')

      d3.select('.action').remove();



  }

}
