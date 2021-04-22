import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCarComponent } from './index.component';

describe('IndexCarComponent', () => {
  let component: IndexCarComponent;
  let fixture: ComponentFixture<IndexCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
