import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFooterComponent } from './seller-footer.component';

describe('SellerFooterComponent', () => {
  let component: SellerFooterComponent;
  let fixture: ComponentFixture<SellerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
