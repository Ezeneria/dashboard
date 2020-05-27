import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as d3 from 'd3';

import {Subject} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() public id;
  @Input() dataChart: Subject<{}>;

  width = 150;
  height = 150;
  margin = 20;
  radius = Math.min(this.width, this.height) / 2 - this.margin;
  //не указал типы, потому что придётся ещё дольше писать(т.к. на ts с d3 я не работал)
  pieSections;
  color;
  path;
  arc;
  svg;
  firstLoad = false;
  ngOnInit() {
    this.svg = d3.select(`#${this.id}`)
      .append('svg')
      .attr('transform', 'translateY(-100%)')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${ this.width / 2 }, ${ this.height / 2 })`);
    this.pieSections = d3.pie().value((d) => d.value);
    this.color = d3.scaleOrdinal()
      .range(['#c50b2a', '#00ff49']);
    this.arc =  d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius);
    this.dataChart.subscribe(val => {
      this.color.domain(val);
      this.pieSections.value((d) => d.value);
      const dataReady = this.pieSections(d3.entries(val));

      if (!this.firstLoad) {
        this.svg.selectAll('path').remove();
      }

      this.path = this.svg
        .selectAll('line')
        .data(dataReady)
        .enter()
        .append('path')
        .attr('d', this.arc
        )
        .attr('fill', d => this.color(d.data.key))
        .attr('stroke', 'black')
        .style('opacity', 0.7);
    });
  }

  ngOnDestroy(): void {
    this.dataChart.unsubscribe();
  }
}
