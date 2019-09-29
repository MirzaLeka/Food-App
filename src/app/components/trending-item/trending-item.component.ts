import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trending-item',
  templateUrl: './trending-item.component.html',
  styleUrls: ['./trending-item.component.scss']
})
export class TrendingItemComponent implements OnInit {

  @Input() itemName;
  @Input() itemPrice;
  @Input() itemDescription;
  @Input() itemAvatar;
  @Input() companyName;
  @Input() companyPath;

  constructor() { }

  ngOnInit() {
  }

}
