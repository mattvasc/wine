import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCompanyListPageComponent } from './partner-company-list-page.component';

describe('PartnerCompanyListPageComponent', () => {
  let component: PartnerCompanyListPageComponent;
  let fixture: ComponentFixture<PartnerCompanyListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerCompanyListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCompanyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
