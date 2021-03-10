import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRunningExamsPage } from './new-running-exams.page';

describe('NewRunningExamsPage', () => {
  let component: NewRunningExamsPage;
  let fixture: ComponentFixture<NewRunningExamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRunningExamsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRunningExamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
