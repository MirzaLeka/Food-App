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

  defaultItemsImages = [
    '../../../assets/img/breakfast.jpg',
    '../../../assets/img/burger.jpg',
    '../../../assets/img/chicken.jpg',
    '../../../assets/img/fish.jpg',
    '../../../assets/img/grill.jpg',
    '../../../assets/img/pancakes.jpg',
    '../../../assets/img/pizza.jpg',
    '../../../assets/img/salad.jpg',
  ];

  randomImg;

  constructor() { }

  ngOnInit() {
    this.randomImg = this.defaultItemsImages[Math.floor(Math.random()*this.defaultItemsImages.length)];
  }

}
