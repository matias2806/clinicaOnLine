import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHCComponent } from './detalle-hc.component';

describe('DetalleHCComponent', () => {
  let component: DetalleHCComponent;
  let fixture: ComponentFixture<DetalleHCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleHCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
