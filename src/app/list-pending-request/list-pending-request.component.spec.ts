import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPendingRequestComponent } from './list-pending-request.component';

describe('ListPendingRequestComponent', () => {
  let component: ListPendingRequestComponent;
  let fixture: ComponentFixture<ListPendingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPendingRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
