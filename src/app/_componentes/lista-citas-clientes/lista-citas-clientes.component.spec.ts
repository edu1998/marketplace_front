import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCitasClientesComponent } from './lista-citas-clientes.component';

describe('ListaCitasClientesComponent', () => {
  let component: ListaCitasClientesComponent;
  let fixture: ComponentFixture<ListaCitasClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCitasClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCitasClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
