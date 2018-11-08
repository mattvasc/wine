import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateUpdateComponent } from './client-create-update.component';

describe('ClientCreateUpdateComponent', () => {
  let component: ClientCreateUpdateComponent;
  let fixture: ComponentFixture<ClientCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
