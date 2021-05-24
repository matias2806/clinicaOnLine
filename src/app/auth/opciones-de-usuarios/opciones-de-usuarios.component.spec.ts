import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesDeUsuariosComponent } from './opciones-de-usuarios.component';

describe('OpcionesDeUsuariosComponent', () => {
  let component: OpcionesDeUsuariosComponent;
  let fixture: ComponentFixture<OpcionesDeUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesDeUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
