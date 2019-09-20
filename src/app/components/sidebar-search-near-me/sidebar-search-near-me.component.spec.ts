import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSearchNearMeComponent } from './sidebar-search-near-me.component';

describe('SidebarSearchNearMeComponent', () => {
  let component: SidebarSearchNearMeComponent;
  let fixture: ComponentFixture<SidebarSearchNearMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSearchNearMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSearchNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
