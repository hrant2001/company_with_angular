import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsTabsComponent } from './records-tabs.component';

describe('RecordsTabsComponent', () => {
  let component: RecordsTabsComponent;
  let fixture: ComponentFixture<RecordsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
