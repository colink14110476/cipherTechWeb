import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAccountComponent } from './signin-account.component';

describe('SigninAccountComponent', () => {
  let component: SigninAccountComponent;
  let fixture: ComponentFixture<SigninAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
