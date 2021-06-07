import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpoubliComponent } from './mdpoubli.component';

describe('MdpoubliComponent', () => {
  let component: MdpoubliComponent;
  let fixture: ComponentFixture<MdpoubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdpoubliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpoubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
