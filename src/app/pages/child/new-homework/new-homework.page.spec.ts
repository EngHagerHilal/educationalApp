import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewHomeworkPage } from './new-homework.page';

describe('NewHomeworkPage', () => {
  let component: NewHomeworkPage;
  let fixture: ComponentFixture<NewHomeworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeworkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
