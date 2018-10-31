import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTelefoneComponent } from './email-telefone.component';

describe('EmailTelefoneComponent', () => {
  let component: EmailTelefoneComponent;
  let fixture: ComponentFixture<EmailTelefoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTelefoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
