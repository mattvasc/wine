import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageTemplateComponent } from './full-page-template.component';

describe('FullPageTemplateComponent', () => {
  let component: FullPageTemplateComponent;
  let fixture: ComponentFixture<FullPageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPageTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
