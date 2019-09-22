import { Component, Input, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-sidebar-filter-sort',
  templateUrl: './sidebar-filter-sort.component.html',
  styleUrls: ['./sidebar-filter-sort.component.scss']
})
export class SidebarFilterSortComponent implements AfterViewInit {
  
  @Input() categories : [];
  @Input() searchCompanyForm : Boolean;

  @ViewChild ('categoriesBlock') DOMElementRef: ElementRef;

  categoriesDiv;

  ngAfterViewInit() {
    this.categoriesDiv = this.DOMElementRef.nativeElement;
  }

  updateCategory(event: any) {
    const { name } = event.target;

    if ( name === 'All categories') {
      for (let i = 2; i < this.categoriesDiv.children.length; i++) {
        this.categoriesDiv.children[i].firstChild.checked = false;
      }
    } else {
      this.categoriesDiv.children[1].firstChild.checked = false;
    }

  }  

    // ovaj name saljes parent komponenti
    // ako obj includes name, taj se element splice-a
    // ako nije, on se push-a u niz
    // ako je 'all categories', onda je obj.categories = [''] // override


  constructor() { }

    
}
