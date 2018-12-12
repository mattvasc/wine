import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioMainComponent } from './relatorio-main.component';

describe('RelatorioMainComponent', () => {
  let component: RelatorioMainComponent;
  let fixture: ComponentFixture<RelatorioMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
