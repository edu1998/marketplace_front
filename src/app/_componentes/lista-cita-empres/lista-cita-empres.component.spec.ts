import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCitaEmpresComponent } from './lista-cita-empres.component';

describe('ListaCitaEmpresComponent', () => {
  let component: ListaCitaEmpresComponent;
  let fixture: ComponentFixture<ListaCitaEmpresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCitaEmpresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCitaEmpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
