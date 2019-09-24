import { Component, Input, ElementRef, ViewChild, AfterViewInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-filter-sort',
  templateUrl: './sidebar-filter-sort.component.html',
  styleUrls: ['./sidebar-filter-sort.component.scss']
})
export class SidebarFilterSortComponent implements AfterViewInit {
  
  @Input() categories : [];

  @Output() categoryEvent = new EventEmitter();

  @ViewChild ('categoriesBlock') DOMElementRef: ElementRef;

  categoriesDiv;

  ngAfterViewInit() {
    this.categoriesDiv = this.DOMElementRef.nativeElement;
  }

  updateCategory(event: any) {
    const { name : selectedCategory } : { name : string } = event.target;

    if ( selectedCategory === 'All categories') {
      for (let i = 1; i < this.categoriesDiv.children.length; i++) {
        this.categoriesDiv.children[i].firstChild.checked = false;
      }
    } else {
      this.categoriesDiv.children[0].firstChild.checked = false;
    }

    this.categoryEvent.emit(selectedCategory);
  }  

  constructor() { }
    
}
