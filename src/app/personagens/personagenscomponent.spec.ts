import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTestMarvelComponent } from './personagens.component';

describe('FormTestMarvelComponent', () => {
  let component: FormTestMarvelComponent;
  let fixture: ComponentFixture<FormTestMarvelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTestMarvelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestMarvelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
