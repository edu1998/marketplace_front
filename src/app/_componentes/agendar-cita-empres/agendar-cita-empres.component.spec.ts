import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaEmpresComponent } from './agendar-cita-empres.component';

describe('AgendarCitaEmpresComponent', () => {
  let component: AgendarCitaEmpresComponent;
  let fixture: ComponentFixture<AgendarCitaEmpresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarCitaEmpresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarCitaEmpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
