import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCompanyFormPageComponent } from './partner-company-form-page.component';

describe('PartnerCompanyFormPageComponent', () => {
  let component: PartnerCompanyFormPageComponent;
  let fixture: ComponentFixture<PartnerCompanyFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerCompanyFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCompanyFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
