import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeadComponent } from './user-head.component';

describe('UserHeadComponent', () => {
  let component: UserHeadComponent;
  let fixture: ComponentFixture<UserHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
