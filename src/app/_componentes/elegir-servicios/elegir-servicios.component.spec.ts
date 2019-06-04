import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirServiciosComponent } from './elegir-servicios.component';

describe('ElegirServiciosComponent', () => {
  let component: ElegirServiciosComponent;
  let fixture: ComponentFixture<ElegirServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
