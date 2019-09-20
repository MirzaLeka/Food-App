import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSearchCompanyComponent } from './sidebar-search-company.component';

describe('SidebarSearchCompanyComponent', () => {
  let component: SidebarSearchCompanyComponent;
  let fixture: ComponentFixture<SidebarSearchCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSearchCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSearchCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
