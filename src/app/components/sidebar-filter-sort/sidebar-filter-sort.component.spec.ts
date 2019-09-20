import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFilterSortComponent } from './sidebar-filter-sort.component';

describe('SidebarFilterSortComponent', () => {
  let component: SidebarFilterSortComponent;
  let fixture: ComponentFixture<SidebarFilterSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarFilterSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarFilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
