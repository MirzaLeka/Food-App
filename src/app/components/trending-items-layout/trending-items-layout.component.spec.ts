import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingItemsLayoutComponent } from './trending-items-layout.component';

describe('TrendingItemsLayoutComponent', () => {
  let component: TrendingItemsLayoutComponent;
  let fixture: ComponentFixture<TrendingItemsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingItemsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
