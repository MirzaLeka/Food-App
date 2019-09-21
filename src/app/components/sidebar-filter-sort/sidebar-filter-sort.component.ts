import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-filter-sort',
  templateUrl: './sidebar-filter-sort.component.html',
  styleUrls: ['./sidebar-filter-sort.component.scss']
})
export class SidebarFilterSortComponent implements OnInit {

  @Input() categories : [];

  updateCategory(event: any) {
    const { name } = event.target;

    // ovaj name saljes parent komponenti
    // ako obj includes name, taj se element splice-a
    // ako nije, on se push-a u niz
    // ako je 'all categories', onda je obj.categories = [''] // override

    // if name = 'all categories', uncheck all other 

    if (name === 'All categories') {

      for (let i = 1; i < this.categories.length; i++) {
        console.log(this.categories[i]);
      }

      // event.target.checked = false;
    }


  }

  constructor() { }

  ngOnInit() { }

}
