import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trending-items-layout',
  templateUrl: './trending-items-layout.component.html',
  styleUrls: ['./trending-items-layout.component.scss']
})
export class TrendingItemsLayoutComponent implements OnInit {

  @Input() trendingItemsArray: [];
  @Input() trendingLayoutSpinner : boolean;

  constructor() { }

  ngOnInit() {
  }

}
