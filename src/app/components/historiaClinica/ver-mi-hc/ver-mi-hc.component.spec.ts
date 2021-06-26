import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiHCComponent } from './ver-mi-hc.component';

describe('VerMiHCComponent', () => {
  let component: VerMiHCComponent;
  let fixture: ComponentFixture<VerMiHCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMiHCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
