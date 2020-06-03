import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';

import {Subject} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public id;
  @Input() dataChart: Subject<{}>;
  private localData: {};
  private width = 150;
  private height = 150;
  private margin = 20;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private pieSections;
  private color;
  private path;
  private arc;
  private svg;
  private firstLoad = false;

  ngOnInit() {
    this.svg = d3.select(`#${this.id}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${ this.width / 2 }, ${ this.height / 2 })`);
    this.pieSections = d3.pie().value((d) => d.value);
    this.color = d3.scaleOrdinal()
      .range(['#620B1C', '#A40B29', '#c50b2a', '#008834', '#00ff49', '#00BC3E']);
    this.arc =  d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataChart) {
      this.localData = { ...this.localData, ...changes.dataChart.currentValue};
      this.color.domain(this.localData);
      this.pieSections.value((d) => d.value);
      const dataReady = this.pieSections(d3.entries(this.localData));

      if (!this.firstLoad) {
        this.svg.selectAll('path').remove();
      }

      this.path = this.svg
        .selectAll('line')
        .data(dataReady)
        .enter()
        .append('path')
        .transition(2000)
        .attr('d', this.arc
        )
        .attr('fill', d => this.color(d.data.key))
        .attr('stroke', 'black')
        .style('opacity', 0.7);
    }
  }

  ngOnDestroy(): void {
    this.dataChart.unsubscribe();
  }
}
