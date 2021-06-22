import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGraficosComponent } from './page-graficos.component';

describe('PageGraficosComponent', () => {
  let component: PageGraficosComponent;
  let fixture: ComponentFixture<PageGraficosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGraficosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
